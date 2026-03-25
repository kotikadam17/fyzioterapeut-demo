import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct || password !== correct) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = Response.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    `admin_auth=${correct}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
  );
  return response;
}
