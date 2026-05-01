import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) return new Response("Unauthorized", { status: 401 });

  await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { ids, category_id } = await request.json();

  if (!ids || !Array.isArray(ids)) return new Response("IDs required", { status: 400 });

  const { error } = await supabase
    .from("transactions")
    .update({ category_id: category_id || null })
    .in("id", ids)
    .eq("user_id", user.id);

  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
