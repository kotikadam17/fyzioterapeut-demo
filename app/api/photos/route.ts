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

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const clientId = formData.get("client_id") as string;
  const label = (formData.get("label") as string) || null;

  if (!file || !clientId) {
    return NextResponse.json({ error: "Chybí soubor nebo client_id" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${clientId}/${Date.now()}.${ext}`;

  const bytes = await file.arrayBuffer();
  const { error: uploadError } = await sb.storage
    .from("client-photos")
    .upload(path, bytes, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: { publicUrl } } = sb.storage
    .from("client-photos")
    .getPublicUrl(path);

  const { error: dbError } = await sb.from("photos").insert({
    client_id: clientId,
    url: publicUrl,
    label,
  });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ url: publicUrl, message: "Fotka nahrána" });
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId || !isAdmin(userId)) {
    return NextResponse.json({ error: "Neautorizováno" }, { status: 403 });
  }

  const { id, url } = await req.json();
  if (!id) return NextResponse.json({ error: "Chybí id" }, { status: 400 });

  const sb = getSupabaseAdmin();

  // Smaž z Storage pokud máme URL
  if (url) {
    const path = url.split("/client-photos/")[1];
    if (path) await sb.storage.from("client-photos").remove([path]);
  }

  const { error } = await sb.from("photos").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Fotka smazána" });
}
