import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) return new Response("Unauthorized", { status: 401 });

  await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = await request.json();
  const { name, type, data } = body;

  const { error } = await supabase
    .from("calculator_scenarios")
    .insert([{ 
        user_id: user.id, 
        name, 
        type, 
        data 
    }]);

  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

export const GET: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) return new Response("Unauthorized", { status: 401 });

  await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  let query = supabase
    .from("calculator_scenarios")
    .select("*")
    .eq("user_id", user.id);
  
  if (type) query = query.eq("type", type);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};
