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
  const name = formData.get("name")?.toString();
  const limit = parseFloat(formData.get("limit")?.toString() || "0");
  const classification = formData.get("classification")?.toString();
  const rollover = formData.get("rollover") === "true";
  const id = formData.get("id")?.toString();

  if (id) {
    // Update
    const { error } = await supabase
      .from("budget_categories")
      .update({ name, monthly_limit: limit, classification, rollover })
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) return new Response(error.message, { status: 500 });
  } else {
    // Create
    const { error } = await supabase
      .from("budget_categories")
      .insert({ name, monthly_limit: limit, classification, rollover, user_id: user.id });
    if (error) return new Response(error.message, { status: 500 });
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
    .from("budget_categories")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return new Response(error.message, { status: 500 });
  return new Response(null, { status: 204 });
};
