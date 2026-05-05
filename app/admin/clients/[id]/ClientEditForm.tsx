"use client";

import { useState, useTransition, useRef } from "react";
import type { Client, Consultation, Photo, Purchase } from "@/lib/supabase";

type Tab = "karta" | "konzultace" | "nakupy" | "fotky";

export default function ClientEditForm({
  client,
  consultations,
  photos,
  purchases,
}: {
  client: Client;
  consultations: Consultation[];
  photos: Photo[];
  purchases: Purchase[];
}) {
  const [tab, setTab] = useState<Tab>("karta");
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState("");

  const tabs: { id: Tab; label: string }[] = [
    { id: "karta", label: "Karta" },
    { id: "konzultace", label: "Konzultace" },
    { id: "nakupy", label: "Nákupy" },
    { id: "fotky", label: "Fotky" },
  ];

  async function submitWithFeedback(url: string, body: object, onSuccess?: () => void) {
    setMsg("");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (res.ok) {
      setMsg(json.message ?? "Uloženo");
      onSuccess?.();
      setTimeout(() => { setMsg(""); window.location.reload(); }, 1200);
    } else {
      setMsg(json.error ?? "Chyba");
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 bg-[#F5F5F0] rounded-2xl p-1 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              "flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all",
              tab === t.id
                ? "bg-white text-[#1C1C1C] shadow-sm"
                : "text-[#9CA3AF] hover:text-[#4B5563]",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {msg && (
        <div className={`text-center text-sm mb-4 py-2 px-4 rounded-xl ${msg.includes("Chyba") || msg.includes("error") ? "bg-red-50 text-red-600" : "bg-[#EAF1EC] text-[#4A7A5A]"}`}>
          {msg}
        </div>
      )}

      {/* Karta */}
      {tab === "karta" && (
        <KartaForm client={client} onSubmit={(data) => submitWithFeedback(`/api/clients/${client.id}`, data)} isPending={isPending} startTransition={startTransition} />
      )}

      {/* Konzultace */}
      {tab === "konzultace" && (
        <KonzultaceTab
          consultations={consultations}
          onAdd={(data) => submitWithFeedback("/api/consultations", { ...data, client_id: client.id })}
          isPending={isPending}
          startTransition={startTransition}
        />
      )}

      {/* Nákupy */}
      {tab === "nakupy" && (
        <NakupyTab
          purchases={purchases}
          onAdd={(data) => submitWithFeedback("/api/purchases", { ...data, client_id: client.id })}
          isPending={isPending}
          startTransition={startTransition}
        />
      )}

      {/* Fotky */}
      {tab === "fotky" && (
        <FotkyTab
          photos={photos}
          clientId={client.id}
          onMsg={setMsg}
        />
      )}
    </div>
  );
}

function KartaForm({ client, onSubmit, isPending, startTransition }: {
  client: Client;
  onSubmit: (data: object) => void;
  isPending: boolean;
  startTransition: (fn: () => void) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => onSubmit({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          bio: fd.get("bio"),
        }));
      }}
      className="space-y-4"
    >
      {[
        { name: "name", label: "Jméno", defaultValue: client.name, type: "text" },
        { name: "email", label: "E-mail", defaultValue: client.email, type: "email" },
        { name: "phone", label: "Telefon", defaultValue: client.phone, type: "tel" },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-xs font-medium text-[#6B7280] mb-1">{f.label}</label>
          <input
            name={f.name}
            type={f.type}
            defaultValue={f.defaultValue}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87] bg-white"
          />
        </div>
      ))}
      <div>
        <label className="block text-xs font-medium text-[#6B7280] mb-1">Poznámky</label>
        <textarea
          name="bio"
          defaultValue={client.bio ?? ""}
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87] bg-white resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-[#1C1C1C] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
      >
        {isPending ? "Ukládám…" : "Uložit změny"}
      </button>
    </form>
  );
}

function KonzultaceTab({ consultations, onAdd, isPending, startTransition }: {
  consultations: Consultation[];
  onAdd: (data: object) => void;
  isPending: boolean;
  startTransition: (fn: () => void) => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-4">
      {consultations.map((c) => (
        <div key={c.id} className="border border-[#E8EEE9] rounded-2xl p-4">
          <div className="text-xs font-bold text-[#7B9E87] mb-1.5">
            {new Date(c.date).toLocaleDateString("cs-CZ")}
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">{c.notes}</p>
        </div>
      ))}
      {!consultations.length && (
        <div className="text-center py-6 text-[#9CA3AF] text-sm">Zatím žádné konzultace</div>
      )}

      {show ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(() => onAdd({ date: fd.get("date"), notes: fd.get("notes") }));
            setShow(false);
          }}
          className="border border-[#E8EEE9] rounded-2xl p-4 space-y-3"
        >
          <input
            name="date"
            type="date"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87]"
          />
          <textarea
            name="notes"
            rows={3}
            required
            placeholder="Poznámky z konzultace…"
            className="w-full px-4 py-2 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87] resize-none"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={isPending} className="flex-1 py-2 bg-[#1C1C1C] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50">
              Přidat
            </button>
            <button type="button" onClick={() => setShow(false)} className="flex-1 py-2 border border-[#E8EEE9] rounded-xl text-sm text-[#9CA3AF] hover:bg-[#F5F5F0] transition-colors">
              Zrušit
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="w-full py-2.5 border-2 border-dashed border-[#E8EEE9] rounded-xl text-sm text-[#9CA3AF] hover:border-[#7B9E87] hover:text-[#7B9E87] transition-colors"
        >
          + Přidat konzultaci
        </button>
      )}
    </div>
  );
}

function NakupyTab({ purchases, onAdd, isPending, startTransition }: {
  purchases: Purchase[];
  onAdd: (data: object) => void;
  isPending: boolean;
  startTransition: (fn: () => void) => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-3">
      {purchases.map((p) => (
        <div key={p.id} className="flex items-center justify-between border border-[#E8EEE9] rounded-2xl px-4 py-3">
          <div>
            <div className="font-medium text-[#1C1C1C] text-sm">{p.product_name}</div>
            <div className="text-xs text-[#9CA3AF] mt-0.5">
              {new Date(p.date).toLocaleDateString("cs-CZ")} · {p.type}
            </div>
          </div>
          <div className="font-bold text-[#1C1C1C]">{Number(p.price).toLocaleString("cs-CZ")} Kč</div>
        </div>
      ))}
      {!purchases.length && (
        <div className="text-center py-6 text-[#9CA3AF] text-sm">Zatím žádné nákupy</div>
      )}

      {show ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(() => onAdd({
              product_name: fd.get("product_name"),
              type: fd.get("type"),
              price: fd.get("price"),
              date: fd.get("date"),
            }));
            setShow(false);
          }}
          className="border border-[#E8EEE9] rounded-2xl p-4 space-y-3"
        >
          <input
            name="product_name"
            type="text"
            required
            placeholder="Název produktu / služby"
            className="w-full px-4 py-2 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87]"
          />
          <select
            name="type"
            required
            className="w-full px-4 py-2 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87] bg-white"
          >
            <option value="fyzioterapie">Fyzioterapie</option>
            <option value="rehab">Rehabilitace</option>
            <option value="program">Program</option>
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input
              name="price"
              type="number"
              required
              placeholder="Cena (Kč)"
              min="0"
              step="0.01"
              className="px-4 py-2 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87]"
            />
            <input
              name="date"
              type="date"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              className="px-4 py-2 rounded-xl border border-[#E8EEE9] text-sm focus:outline-none focus:border-[#7B9E87]"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={isPending} className="flex-1 py-2 bg-[#1C1C1C] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50">
              Přidat
            </button>
            <button type="button" onClick={() => setShow(false)} className="flex-1 py-2 border border-[#E8EEE9] rounded-xl text-sm text-[#9CA3AF] hover:bg-[#F5F5F0] transition-colors">
              Zrušit
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="w-full py-2.5 border-2 border-dashed border-[#E8EEE9] rounded-xl text-sm text-[#9CA3AF] hover:border-[#7B9E87] hover:text-[#7B9E87] transition-colors"
        >
          + Přidat nákup
        </button>
      )}
    </div>
  );
}

function FotkyTab({ photos, clientId, onMsg }: {
  photos: Photo[];
  clientId: string;
  onMsg: (msg: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    onMsg("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("client_id", clientId);
    fd.append("label", file.name.replace(/\.[^.]+$/, ""));
    const res = await fetch("/api/photos", { method: "POST", body: fd });
    const json = await res.json();
    if (res.ok) {
      onMsg("Fotka nahrána");
      setTimeout(() => { onMsg(""); window.location.reload(); }, 1200);
    } else {
      onMsg(json.error ?? "Chyba nahrávání");
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(photo: Photo) {
    if (!confirm(`Smazat fotku "${photo.label ?? "bez názvu"}"?`)) return;
    onMsg("");
    const res = await fetch("/api/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photo.id, url: photo.url }),
    });
    const json = await res.json();
    if (res.ok) {
      onMsg("Fotka smazána");
      setTimeout(() => { onMsg(""); window.location.reload(); }, 1000);
    } else {
      onMsg(json.error ?? "Chyba při mazání");
    }
  }

  return (
    <div className="space-y-4">
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden border border-[#E8EEE9] relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.label ?? "foto"} className="w-full aspect-square object-cover" />
              <button
                onClick={() => handleDelete(p)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-red-600 text-white rounded-lg text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Smazat fotku"
              >
                ✕
              </button>
              {p.label && (
                <div className="bg-[#F5F5F0] px-3 py-1.5 text-xs text-[#6B7280] truncate">{p.label}</div>
              )}
            </div>
          ))}
        </div>
      )}
      {!photos.length && (
        <div className="text-center py-6 text-[#9CA3AF] text-sm">Zatím žádné fotky</div>
      )}

      <label className={[
        "flex flex-col items-center justify-center w-full py-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors",
        uploading ? "opacity-50 cursor-not-allowed" : "border-[#E8EEE9] hover:border-[#7B9E87] hover:bg-[#F0F7F2]",
      ].join(" ")}>
        <svg className="w-8 h-8 text-[#C9D5CB] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <span className="text-sm text-[#9CA3AF]">{uploading ? "Nahrávám…" : "Klikněte nebo přetáhněte fotku"}</span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
