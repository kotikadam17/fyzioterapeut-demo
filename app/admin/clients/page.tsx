import { getSupabaseAdmin, type Client } from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

async function checkAdmin() {
  const { userId } = await auth();
  const adminId = process.env.ADMIN_CLERK_USER_ID;
  if (!userId || (adminId && userId !== adminId)) redirect("/");
}

export default async function AdminClientsPage() {
  await checkAdmin();
  const sb = getSupabaseAdmin();
  const { data: clients } = await sb
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Client[]>();

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Header */}
      <div className="bg-[#1C1C1C] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#7B9E87] flex items-center justify-center">
            <span className="font-serif text-white font-bold text-xs">PM</span>
          </div>
          <div>
            <span className="text-white font-semibold text-sm">Klienti</span>
            <span className="text-white/40 text-xs ml-2">— správa klientů</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-white/40 hover:text-white/80 transition-colors text-xs">
            ← Rezervace
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-bold text-[#1C1C1C]">Seznam klientů</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#9CA3AF]">{clients?.length ?? 0} klientů</span>
            <Link
              href="/admin/clients/new"
              className="px-4 py-2 bg-[#1C1C1C] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors"
            >
              + Přidat klienta
            </Link>
          </div>
        </div>

        {!clients?.length ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-12 text-center">
            <div className="text-[#C9D5CB] text-4xl mb-3">—</div>
            <div className="text-[#9CA3AF] text-sm">Zatím žádní klienti</div>
            <p className="text-[#C0C0BA] text-xs mt-2">Klienti se přidají po první registraci</p>
          </div>
        ) : (
          <div className="space-y-2">
            {clients.map((client) => (
              <Link
                key={client.id}
                href={`/admin/clients/${client.id}`}
                className="block bg-white rounded-2xl shadow-sm border border-[#E8EEE9] px-6 py-4 hover:border-[#7B9E87]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF1EC] flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-[#4A7A5A] font-bold text-sm">
                        {client.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1C1C1C] text-sm">{client.name}</div>
                      <div className="text-xs text-[#9CA3AF] mt-0.5">{client.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div className="text-xs text-[#9CA3AF]">
                      {new Date(client.created_at).toLocaleDateString("cs-CZ")}
                    </div>
                    <svg className="w-4 h-4 text-[#C9D5CB]" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
