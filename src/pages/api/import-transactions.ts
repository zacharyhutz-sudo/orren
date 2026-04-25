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

  const transactionsWithUser = transactions.map(t => ({
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
