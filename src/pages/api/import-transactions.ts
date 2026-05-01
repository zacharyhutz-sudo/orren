import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) return new Response("Unauthorized", { status: 401 });

  await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { transactions } = await request.json();

  if (!transactions || !Array.isArray(transactions)) {
    return new Response("Invalid transactions data", { status: 400 });
  }

  // 1. Fetch existing transactions to check for duplicates
  // We'll check for matches in merchant, amount, and date for this user
  const { data: existing } = await supabase
    .from("transactions")
    .select("merchant, amount, date")
    .eq("user_id", user.id);

  const existingMap = new Set(
    (existing || []).map(t => `${t.date}|${t.merchant}|${Number(t.amount).toFixed(2)}`)
  );

  // 2. Filter out duplicates
  const newTransactions = transactions.filter(t => {
    const key = `${t.date}|${t.merchant}|${Number(t.amount).toFixed(2)}`;
    return !existingMap.has(key);
  });

  if (newTransactions.length === 0) {
    return new Response(JSON.stringify({ success: true, count: 0 }), { status: 200 });
  }

  const transactionsWithUser = newTransactions.map(t => ({
    ...t,
    user_id: user.id,
    category_id: t.category_id || null,
    type: t.type || 'expense'
  }));

  const { error } = await supabase
    .from("transactions")
    .insert(transactionsWithUser);

  if (error) return new Response(error.message, { status: 500 });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
