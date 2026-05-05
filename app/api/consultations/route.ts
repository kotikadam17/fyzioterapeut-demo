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

  const { error } = await getSupabaseAdmin()
    .from("consultations")
    .insert({
      client_id: body.client_id,
      notes: body.notes,
      date: body.date,
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Konzultace přidána" });
}
