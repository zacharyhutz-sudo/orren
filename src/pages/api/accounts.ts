import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) {
    return redirect("/signin");
  }

  // Auth check and get user - Updated: 2026-04-24 14:08
  const { data: { user }, error: authError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (authError || !user) {
    return redirect("/signin");
  }

  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const type = formData.get("type")?.toString();
  const initialBalance = parseFloat(formData.get("balance")?.toString() || "0");

  if (!name || !type) {
    return new Response("Name and type are required", { status: 400 });
  }

  // 1. Create the account
  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .insert([{ name, type, user_id: user.id }])
    .select()
    .single();

  if (accountError) {
    return new Response(accountError.message, { status: 500 });
  }

  // 2. Create the initial snapshot
  if (account) {
    const { error: snapshotError } = await supabase
      .from("account_snapshots")
      .insert([{ 
        account_id: account.id, 
        user_id: user.id, 
        balance: initialBalance,
        snapshot_date: new Date().toISOString().split('T')[0]
      }]);

    if (snapshotError) {
      return new Response(snapshotError.message, { status: 500 });
    }
  }

  return redirect("/net-worth");
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
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

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("ID required", { status: 400 });
  }

  const { error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(null, { status: 204 });
};
