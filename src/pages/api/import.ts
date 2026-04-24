import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: { user }, error: authError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (authError || !user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) return new Response("No file uploaded", { status: 400 });

    const text = await file.text();
    const rows = text.split(/\r?\n/).map(row => row.split(','));
    
    // Header detection & mapping
    const headers = rows[0].map(h => h.trim().toLowerCase());
    const colMap = {
      date: headers.indexOf("date"),
      account: headers.indexOf("account"),
      balance: headers.findIndex(h => ["balance", "amount", "value", "price"].includes(h)),
      type: headers.indexOf("type"),
      category: headers.indexOf("category")
    };

    if (colMap.date === -1 || colMap.account === -1 || colMap.balance === -1) {
      return new Response("Invalid CSV: Missing required columns (Date, Account, Balance)", { status: 400 });
    }

    // Get existing accounts to map names to IDs
    const { data: existingAccounts } = await supabase
      .from("accounts")
      .select("id, name")
      .eq("user_id", user.id);

    const accountMap = new Map(existingAccounts?.map(a => [a.name.toLowerCase(), a.id]));
    const snapshotsToInsert = [];
    
    // Process rows (skip header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 3 || !row[colMap.date]) continue;

      const rawDate = row[colMap.date].trim();
      const accountName = row[colMap.account].trim();
      const balance = parseFloat(row[colMap.balance].replace(/[$,]/g, ''));
      const type = colMap.type !== -1 ? row[colMap.type]?.trim().toLowerCase() : 'asset';
      const category = colMap.category !== -1 ? row[colMap.category]?.trim() : 'General';

      // Format date to YYYY-MM-DD
      let date;
      try {
        date = new Date(rawDate).toISOString().split('T')[0];
      } catch (e) { continue; }

      // Get or create account ID
      let accountId = accountMap.get(accountName.toLowerCase());
      
      if (!accountId) {
        const { data: newAcc, error: accErr } = await supabase
          .from("accounts")
          .insert([{ 
            name: accountName, 
            type: type === 'liability' ? 'liability' : 'asset', 
            category: category,
            user_id: user.id 
          }])
          .select()
          .single();
        
        if (accErr || !newAcc) continue;
        accountId = newAcc.id;
        accountMap.set(accountName.toLowerCase(), accountId);
      }

      snapshotsToInsert.push({
        account_id: accountId,
        user_id: user.id,
        balance: balance,
        snapshot_date: date
      });
    }

    // Batch upsert snapshots
    if (snapshotsToInsert.length > 0) {
      const { error: batchErr } = await supabase
        .from("account_snapshots")
        .upsert(snapshotsToInsert, { onConflict: 'account_id,snapshot_date' });

      if (batchErr) return new Response(batchErr.message, { status: 500 });
    }

    return new Response(JSON.stringify({ count: snapshotsToInsert.length }), { status: 200 });

  } catch (err) {
    return new Response(err instanceof Error ? err.message : "Import failed", { status: 500 });
  }
};
