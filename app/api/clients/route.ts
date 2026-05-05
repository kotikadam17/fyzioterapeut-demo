import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function isAdmin(userId: string) {
  const adminId = process.env.ADMIN_CLERK_USER_ID;
  return !adminId || userId === adminId;
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId || !isAdmin(userId)) {
    return NextResponse.json({ error: "Neautorizováno" }, { status: 403 });
  }

  const body = await req.json();

  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Jméno a e-mail jsou povinné" }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("clients")
    .insert({
      user_id: body.user_id ?? crypto.randomUUID(),
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      bio: body.bio ?? null,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
