import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseAdmin, type Client, type Consultation, type Photo, type Purchase } from "@/lib/supabase";
import ClientEditForm from "./ClientEditForm";

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sb = getSupabaseAdmin();

  const { data: client } = await sb
    .from("clients")
    .select("*")
    .eq("id", id)
    .single<Client>();

  if (!client) notFound();

  const [{ data: consultations }, { data: photos }, { data: purchases }] = await Promise.all([
    sb.from("consultations").select("*").eq("client_id", id).order("date", { ascending: false }).returns<Consultation[]>(),
    sb.from("photos").select("*").eq("client_id", id).order("created_at", { ascending: false }).returns<Photo[]>(),
    sb.from("purchases").select("*").eq("client_id", id).order("date", { ascending: false }).returns<Purchase[]>(),
  ]);

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Header */}
      <div className="bg-[#1C1C1C] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#7B9E87] flex items-center justify-center">
            <span className="font-serif text-white font-bold text-xs">PM</span>
          </div>
          <div>
            <span className="text-white font-semibold text-sm">{client.name}</span>
            <span className="text-white/40 text-xs ml-2">— detail klienta</span>
          </div>
        </div>
        <Link href="/admin/clients" className="text-white/40 hover:text-white/80 transition-colors text-xs">
          ← Klienti
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-7">
          <ClientEditForm
            client={client}
            consultations={consultations ?? []}
            photos={photos ?? []}
            purchases={purchases ?? []}
          />
        </div>
      </div>
    </div>
  );
}
