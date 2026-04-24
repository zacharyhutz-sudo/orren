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

  const formData = await request.formData();
  const accountId = formData.get("accountId")?.toString();
  const balance = parseFloat(formData.get("balance")?.toString() || "0");
  const date = new Date().toISOString().split('T')[0];

  if (!accountId) {
    return new Response("Account ID required", { status: 400 });
  }

  // Upsert snapshot for today
  const { error } = await supabase
    .from("account_snapshots")
    .upsert({ 
      account_id: accountId, 
      user_id: user.id, 
      balance: balance,
      snapshot_date: date
    }, { onConflict: 'account_id,snapshot_date' });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(null, { status: 204 });
};
