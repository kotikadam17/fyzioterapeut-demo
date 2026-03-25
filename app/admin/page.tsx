"use client";

import { useState, useEffect } from "react";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  date: string;
  time: string;
  createdAt: string;
}

const MONTH_NAMES = [
  "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
  "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec",
];
const DAY_NAMES = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateCz(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)}. ${parseInt(m)}. ${y}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

const TIME_SLOTS = ["9:00", "10:00", "11:00", "13:00", "14:00"];

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => { setBookings(data); setLoading(false); });
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Map date string → bookings
  const byDate: Record<string, Booking[]> = {};
  for (const b of bookings) {
    if (!byDate[b.date]) byDate[b.date] = [];
    byDate[b.date].push(b);
  }

  const selectedKey = selectedDate ? formatDate(selectedDate) : null;
  const selectedBookings = selectedKey
    ? (byDate[selectedKey] ?? []).sort((a, b) =>
        TIME_SLOTS.indexOf(a.time) - TIME_SLOTS.indexOf(b.time)
      )
    : [];

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      {/* Header */}
      <div className="bg-[#1C1C1C] px-8 py-5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#7B9E87] flex items-center justify-center">
            <span className="font-serif text-white font-bold text-xs">PM</span>
          </div>
          <div>
            <span className="text-white font-semibold text-sm">Petra Marková</span>
            <span className="text-white/40 text-xs ml-2">— Přehled rezervací</span>
          </div>
        </div>
        <span className="text-white/30 text-xs">{bookings.length} rezervací celkem</span>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full px-6 py-8 gap-6">

        {/* ── LEFT: Calendar ── */}
        <div className="lg:w-[60%] bg-white rounded-3xl shadow-sm border border-[#E8EEE9] p-7 flex flex-col">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-7">
            <button
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="w-9 h-9 rounded-full bg-[#F5F5F0] hover:bg-[#EAF1EC] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-[#4B5563]" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h2 className="font-serif text-xl font-bold text-[#1C1C1C]">
              {MONTH_NAMES[month]} {year}
            </h2>
            <button
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="w-9 h-9 rounded-full bg-[#F5F5F0] hover:bg-[#EAF1EC] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-[#4B5563]" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className={`text-center text-[10px] font-bold tracking-wider pb-3 ${
                  d === "So" || d === "Ne" ? "text-[#D1D5DB]" : "text-[#9CA3AF]"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1 flex-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;

              const key = formatDate(day);
              const dayBookings = byDate[key] ?? [];
              const count = dayBookings.length;
              const isSelected = selectedDate !== null && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  className={[
                    "relative flex flex-col items-center justify-start pt-2 pb-1.5 rounded-2xl transition-all duration-150 min-h-[56px]",
                    isSelected
                      ? "bg-[#1C1C1C]"
                      : isToday
                      ? "bg-[#EAF1EC] hover:bg-[#D8EBE0]"
                      : count > 0
                      ? "hover:bg-[#F0F7F2] cursor-pointer"
                      : isWeekend
                      ? "cursor-default"
                      : "hover:bg-[#F5F5F0] cursor-pointer",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "text-sm font-semibold leading-none mb-1.5",
                      isSelected
                        ? "text-white"
                        : isToday
                        ? "text-[#4A7A5A]"
                        : isWeekend
                        ? "text-[#D1D5DB]"
                        : "text-[#1C1C1C]",
                    ].join(" ")}
                  >
                    {day.getDate()}
                  </span>

                  {/* Booking dots */}
                  {count > 0 && (
                    <div className="flex gap-0.5">
                      {Array.from({ length: Math.min(count, 5) }).map((_, j) => (
                        <div
                          key={j}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-[#7B9E87]" : "bg-[#7B9E87]"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-5 border-t border-[#F0F0EE] flex items-center gap-5 text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#7B9E87]" />
              rezervace
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#EAF1EC] border border-[#7B9E87]/40" />
              dnes
            </div>
          </div>
        </div>

        {/* ── RIGHT: Day detail ── */}
        <div className="lg:w-[40%] flex flex-col gap-4">

          {/* Day heading */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#E8EEE9] px-6 py-5">
            {selectedDate ? (
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF] mb-1">
                  Vybraný den
                </div>
                <div className="font-serif text-2xl font-bold text-[#1C1C1C]">
                  {formatDateCz(formatDate(selectedDate))}
                </div>
                <div className="text-sm text-[#9CA3AF] mt-0.5">
                  {selectedBookings.length === 0
                    ? "Žádné rezervace"
                    : `${selectedBookings.length} rezervace`}
                </div>
              </div>
            ) : (
              <div className="text-[#9CA3AF] text-sm">Klikněte na den v kalendáři</div>
            )}
          </div>

          {/* Time slots for the day */}
          {selectedDate && (
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {loading ? (
                <div className="bg-white rounded-2xl p-8 text-center text-[#9CA3AF] text-sm">
                  Načítám…
                </div>
              ) : selectedBookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-[#E8EEE9]">
                  <div className="text-[#C9D5CB] text-4xl mb-3">—</div>
                  <div className="text-[#9CA3AF] text-sm">Tento den je volný</div>
                </div>
              ) : (
                selectedBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8EEE9] shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-[#1C1C1C] text-sm">{b.name}</div>
                        <div className="text-[#9CA3AF] text-xs mt-0.5">
                          rezervováno {new Date(b.createdAt).toLocaleDateString("cs-CZ")}
                        </div>
                      </div>
                      <div className="bg-[#EAF1EC] text-[#4A7A5A] font-bold text-sm px-3 py-1 rounded-xl flex-shrink-0">
                        {b.time}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-sm">
                      <a
                        href={`tel:${b.phone}`}
                        className="flex items-center gap-2 text-[#4B5563] hover:text-[#7B9E87] transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-[#7B9E87] flex-shrink-0" viewBox="0 0 16 16" fill="none">
                          <path d="M4 2C4 2 3 3 3 5C3 10 6 13 11 13C13 13 14 12 14 12L12 10C12 10 11 11 10 11C7.5 11 5 8.5 5 6C5 5 6 4 6 4L4 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b.phone}
                      </a>
                      <a
                        href={`mailto:${b.email}`}
                        className="flex items-center gap-2 text-[#4B5563] hover:text-[#7B9E87] transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-[#7B9E87] flex-shrink-0" viewBox="0 0 16 16" fill="none">
                          <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M2 6L8 10L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {b.email}
                      </a>
                    </div>

                    {b.note && (
                      <div className="mt-3 pt-3 border-t border-[#F0F0EE] text-xs text-[#6B7280] leading-relaxed">
                        {b.note}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
