"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewClientPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone") || null,
          bio: fd.get("bio") || null,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Chyba při vytváření klienta");
        return;
      }
      router.push(`/admin/clients/${json.id}`);
    });
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <div className="bg-[#1C1C1C] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#7B9E87] flex items-center justify-center">
            <span className="font-serif text-white font-bold text-xs">PM</span>
          </div>
          <span className="text-white font-semibold text-sm">Nový klient</span>
        </div>
        <Link href="/admin/clients" className="text-white/40 hover:text-white/80 transition-colors text-xs">
          ← Zpět na seznam
        </Link>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10">
        <h1 className="font-serif text-2xl font-bold text-[#1C1C1C] mb-6">Přidat klienta</h1>

        <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1">Jméno *</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Jana Nováková"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1">E-mail *</label>
              <input
                name="email"
                type="email"
                required
                placeholder="jana@example.cz"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1">Telefon</label>
              <input
                name="phone"
                type="tel"
                placeholder="+420 123 456 789"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1">Poznámky</label>
              <textarea
                name="bio"
                rows={4}
                placeholder="Diagnóza, anamnéza, poznámky…"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87] bg-white resize-none"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl">{error}</div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 bg-[#1C1C1C] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {isPending ? "Vytváření…" : "Vytvořit klienta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
