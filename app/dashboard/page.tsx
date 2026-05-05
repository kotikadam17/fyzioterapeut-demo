import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSupabaseAdmin, type Client, type Consultation, type Photo, type Purchase } from "@/lib/supabase";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const sb = getSupabaseAdmin();

  const { data: client } = await sb
    .from("clients")
    .select("*")
    .eq("user_id", userId)
    .single<Client>();

  if (!client) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-10 text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF1EC] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#7B9E87]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="font-serif text-xl font-bold text-[#1C1C1C] mb-2">Účet čeká na aktivaci</h2>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            Vaše klientská karta ještě není nastavena. Fyzioterapeut ji aktivuje po první návštěvě.
          </p>
        </div>
      </div>
    );
  }

  const [{ data: consultations }, { data: photos }, { data: purchases }] = await Promise.all([
    sb.from("consultations").select("*").eq("client_id", client.id).order("date", { ascending: false }).returns<Consultation[]>(),
    sb.from("photos").select("*").eq("client_id", client.id).order("created_at", { ascending: false }).returns<Photo[]>(),
    sb.from("purchases").select("*").eq("client_id", client.id).order("date", { ascending: false }).returns<Purchase[]>(),
  ]);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("cs-CZ");

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Header */}
      <div className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#7B9E87] flex items-center justify-center">
            <span className="font-serif text-white font-bold text-xs">PM</span>
          </div>
          <div>
            <span className="text-white font-semibold text-sm">Moje karta</span>
            <span className="text-white/40 text-xs ml-2">— fyzioterapie Petra Marková</span>
          </div>
        </div>
        <UserButton />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Osobní karta */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-7">
          <div className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF] mb-4">Osobní karta</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#9CA3AF] mb-1">Jméno</div>
              <div className="font-semibold text-[#1C1C1C]">{client.name}</div>
            </div>
            <div>
              <div className="text-xs text-[#9CA3AF] mb-1">E-mail</div>
              <div className="text-[#4B5563]">{client.email}</div>
            </div>
            <div>
              <div className="text-xs text-[#9CA3AF] mb-1">Telefon</div>
              <div className="text-[#4B5563]">{client.phone || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-[#9CA3AF] mb-1">Klient od</div>
              <div className="text-[#4B5563]">{formatDate(client.created_at)}</div>
            </div>
            {client.bio && (
              <div className="sm:col-span-2">
                <div className="text-xs text-[#9CA3AF] mb-1">Poznámky fyzioterapeuta</div>
                <div className="text-[#4B5563] leading-relaxed text-sm">{client.bio}</div>
              </div>
            )}
          </div>
        </div>

        {/* Konzultace */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-7">
          <div className="flex items-center justify-between mb-5">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF]">Konzultace</div>
            <span className="text-xs text-[#9CA3AF]">{consultations?.length ?? 0} záznamy</span>
          </div>
          {!consultations?.length ? (
            <div className="text-center py-6 text-[#9CA3AF] text-sm">Zatím žádné konzultace</div>
          ) : (
            <div className="space-y-3">
              {consultations.map((c) => (
                <div key={c.id} className="border border-[#F0F0EE] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#7B9E87]">{formatDate(c.date)}</span>
                  </div>
                  <p className="text-sm text-[#4B5563] leading-relaxed">{c.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fotky */}
        {!!photos?.length && (
          <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-7">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF] mb-5">Fotodokumentace</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((p) => (
                <div key={p.id} className="rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.label ?? "foto"} className="w-full aspect-square object-cover" />
                  {p.label && (
                    <div className="bg-[#F5F5F0] px-3 py-1.5 text-xs text-[#6B7280]">{p.label}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nákupy */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-7">
          <div className="flex items-center justify-between mb-5">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF]">Zakoupené služby</div>
            <span className="text-xs text-[#9CA3AF]">{purchases?.length ?? 0} položky</span>
          </div>
          {!purchases?.length ? (
            <div className="text-center py-6 text-[#9CA3AF] text-sm">Zatím žádné nákupy</div>
          ) : (
            <div className="space-y-2">
              {purchases.map((p) => (
                <div key={p.id} className="flex items-center justify-between border border-[#F0F0EE] rounded-2xl px-4 py-3">
                  <div>
                    <div className="font-medium text-[#1C1C1C] text-sm">{p.product_name}</div>
                    <div className="text-xs text-[#9CA3AF] mt-0.5">{formatDate(p.date)} · {p.type}</div>
                  </div>
                  <div className="font-bold text-[#1C1C1C]">{Number(p.price).toLocaleString("cs-CZ")} Kč</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
