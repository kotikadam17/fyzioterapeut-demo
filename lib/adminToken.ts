/**
 * Returns a deterministic hex token derived from the admin password.
 * The cookie stores this token — never the raw password.
 * Works in both Node.js (≥20) and Edge runtimes via Web Crypto API.
 */
export async function createAdminToken(password: string): Promise<string> {
  const data = new TextEncoder().encode("admin_session:" + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
