"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIME_SLOTS = ["9:00", "10:00", "11:00", "13:00", "14:00"];

const MONTH_NAMES = [
  "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
  "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec",
];
const DAY_NAMES = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

function isWeekday(date: Date) {
  const d = date.getDay();
  return d !== 0 && d !== 6;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateCz(date: Date) {
  return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Fetch taken slots when date changes
  useEffect(() => {
    if (!selectedDate) return;
    fetch(`/api/bookings?date=${formatDate(selectedDate)}`)
      .then((r) => r.json())
      .then((data) => setTakenSlots(data.taken ?? []));
  }, [selectedDate]);

  // Calendar grid
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  }
  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSelectedDate(null);
      setSelectedTime(null);
      setForm({ name: "", phone: "", email: "", note: "" });
      setStatus("idle");
      setErrorMsg("");
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: formatDate(selectedDate),
          time: selectedTime,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Nastala chyba.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Nastala chyba. Zkuste to prosím znovu.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-2 sm:inset-x-4 top-[2vh] sm:top-[4vh] bottom-[2vh] sm:bottom-[4vh] max-w-4xl mx-auto bg-[#1C1C1C] rounded-2xl sm:rounded-3xl z-50 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-white/10 flex-shrink-0">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">Rezervovat termín</h2>
                <p className="text-white/40 text-xs sm:text-sm mt-0.5">Vyberte den, čas a vyplňte kontaktní údaje</p>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#7B9E87]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#7B9E87]" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">Rezervace odeslána!</h3>
                  <p className="text-white/50 text-sm max-w-xs">Ozvu se vám co nejdříve pro potvrzení termínu.</p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-2 bg-[#7B9E87] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#6B8E77] transition-colors"
                >
                  Zavřít
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="grid lg:grid-cols-2 min-h-full">

                  {/* ── LEFT: Calendar ── */}
                  <div className="p-4 sm:p-7 border-b lg:border-b-0 lg:border-r border-white/10">
                    {/* Month navigation */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={prevMonth}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4 text-white/60" viewBox="0 0 16 16" fill="none">
                          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <span className="text-white font-semibold text-sm">
                        {MONTH_NAMES[month]} {year}
                      </span>
                      <button
                        onClick={nextMonth}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4 text-white/60" viewBox="0 0 16 16" fill="none">
                          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAY_NAMES.map((d) => (
                        <div
                          key={d}
                          className={`text-center text-[10px] font-bold tracking-wider py-1.5 ${
                            d === "So" || d === "Ne" ? "text-white/20" : "text-white/35"
                          }`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-0.5">
                      {cells.map((day, i) => {
                        if (!day) return <div key={i} />;
                        const disabled = !isWeekday(day) || day < today;
                        const isSelected = selectedDate !== null && isSameDay(day, selectedDate);
                        const isToday = isSameDay(day, today);
                        return (
                          <button
                            key={i}
                            disabled={disabled}
                            onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                            className={[
                              "aspect-square rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-center min-h-[36px]",
                              disabled ? "text-white/15 cursor-not-allowed" : "cursor-pointer",
                              isSelected
                                ? "bg-[#7B9E87] text-white"
                                : isToday
                                ? "text-[#7B9E87] ring-1 ring-[#7B9E87]/50 hover:bg-white/10"
                                : !disabled
                                ? "text-white/75 hover:bg-white/10"
                                : "",
                            ].join(" ")}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time slots */}
                    {selectedDate && (
                      <div className="mt-6">
                        <div className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-3">
                          Dostupné časy — {formatDateCz(selectedDate)}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const taken = takenSlots.includes(slot);
                            const active = selectedTime === slot;
                            return (
                              <button
                                key={slot}
                                disabled={taken}
                                onClick={() => setSelectedTime(slot)}
                                className={[
                                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                                  taken
                                    ? "bg-white/5 text-white/20 cursor-not-allowed line-through"
                                    : active
                                    ? "bg-[#7B9E87] text-white"
                                    : "bg-white/10 text-white/70 hover:bg-white/20",
                                ].join(" ")}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── RIGHT: Form ── */}
                  <form onSubmit={handleSubmit} className="p-4 sm:p-7 flex flex-col gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-white/35 mb-1.5">
                        Jméno a příjmení *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Jana Nováková"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7B9E87] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-white/35 mb-1.5">
                        Telefon *
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+420 777 123 456"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7B9E87] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-white/35 mb-1.5">
                        E-mail *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="jana@email.cz"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7B9E87] transition-colors"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-white/35 mb-1.5">
                        Poznámka
                      </label>
                      <textarea
                        rows={4}
                        value={form.note}
                        onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                        placeholder="Stručně popište váš problém nebo co vás přivádí..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7B9E87] transition-colors resize-none"
                      />
                    </div>

                    {/* Selected summary */}
                    {selectedDate && selectedTime && (
                      <div className="bg-[#7B9E87]/15 border border-[#7B9E87]/30 rounded-xl px-4 py-3 text-sm text-[#A8C2B0]">
                        Termín: <strong>{formatDateCz(selectedDate)}</strong> v <strong>{selectedTime}</strong>
                      </div>
                    )}

                    {status === "error" && (
                      <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!selectedDate || !selectedTime || status === "loading"}
                      className="w-full bg-[#7B9E87] disabled:bg-white/8 disabled:text-white/25 text-white py-4 rounded-xl text-sm font-semibold hover:bg-[#6B8E77] transition-colors duration-200 mt-auto"
                    >
                      {status === "loading" ? "Odesílám…" : "Potvrdit rezervaci"}
                    </button>
                  </form>

                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
