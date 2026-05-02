import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) return new Response("Unauthorized", { status: 401 });

  await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const date = formData.get("date")?.toString();
  const merchant = formData.get("merchant")?.toString();
  const amount = parseFloat(formData.get("amount")?.toString() || "0");
  const category_id = formData.get("category_id")?.toString() || null;
  const type = formData.get("type")?.toString() || "expense";
  const notes = formData.get("notes")?.toString();
  const frequency = formData.get("frequency")?.toString();
  const client_tx_id = formData.get("client_tx_id")?.toString();

  const data = {
    date,
    merchant,
    amount,
    category_id: category_id === "" ? null : category_id,
    type,
    notes,
    user_id: user.id,
    client_tx_id
  };

  if (id) {
    const { error } = await supabase
      .from("transactions")
      .update(data)
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) return new Response(error.message, { status: 500 });
  } else {
    // If monthly, insert for next 12 months
    if (frequency === 'monthly') {
        const transactions = [];
        const baseDate = new Date(date + 'T12:00:00');
        for (let i = 0; i < 12; i++) {
            const nextDate = new Date(baseDate);
            nextDate.setMonth(baseDate.getMonth() + i);
            transactions.push({
                ...data,
                date: nextDate.toISOString().split('T')[0],
                client_tx_id: client_tx_id ? `${client_tx_id}-${i}` : null
            });
        }
        const { error } = await supabase.from("transactions").insert(transactions);
        if (error) return new Response(error.message, { status: 500 });
    } else {
        const { error } = await supabase.from("transactions").insert(data);
        if (error) return new Response(error.message, { status: 500 });
    }
  }

  return redirect("/budget");
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) return new Response("Unauthorized", { status: 401 });

  await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) return new Response("Missing ID", { status: 400 });

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return new Response(error.message, { status: 500 });
  return new Response(null, { status: 204 });
};
