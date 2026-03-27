export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    "admin_auth=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
  );
  return response;
}
