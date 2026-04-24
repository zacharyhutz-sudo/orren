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
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const category = formData.get("category")?.toString();
  const type = formData.get("type")?.toString();

  if (!id) return new Response("ID required", { status: 400 });

  const updateData: any = {};
  if (name) updateData.name = name;
  if (category) updateData.category = category;
  if (type) updateData.type = type;

  const { error } = await supabase
    .from("accounts")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return new Response(error.message, { status: 500 });

  return new Response(null, { status: 204 });
};
