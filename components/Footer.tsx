"use client";

import { ScrollReveal } from "./FloatingElement";
import { useBooking } from "./BookingContext";

const links: Record<string, { label: string; href: string }[]> = {
  Služby: [
    { label: "Bolesti páteře", href: "#bolesti-patere" },
    { label: "Sportovní fyzioterapie", href: "#sportovni-fyzioterapie" },
    { label: "Rehabilitace po úrazech", href: "#rehabilitace-po-urazech" },
    { label: "Terapie pro ženy", href: "#terapie-pro-zeny" },
  ],
  Ordinace: [
    { label: "O mně", href: "#o-mne" },
    { label: "Ceník", href: "#cenik" },
    { label: "Kontakt", href: "#kontakt" },
    { label: "Jak se objednat", href: "#jak-to-funguje" },
  ],
};

const hours = [
  { day: "Pondělí — Pátek", time: "9:00 — 15:00" },
  { day: "Sobota — Neděle", time: "Zavřeno" },
];

export function Footer() {
  const { openModal } = useBooking();
  return (
    <footer id="kontakt" className="bg-[#1C1C1C] text-white">

      {/* Contact CTA band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-6 sm:gap-10 items-center">
          <div>
            <h2 className="font-serif text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.1] mb-3">
              Začněte svou cestu<br />
              <em className="italic text-[#A8C2B0]">k pohybu bez bolesti</em>
            </h2>
            <p className="text-white/50 font-light text-sm leading-relaxed max-w-sm">
              Rezervujte si termín online nebo mi zavolejte. Těším se na setkání s vámi.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+420777932382"
              className="flex items-center justify-center gap-3 border border-white/20 text-white px-7 py-4 rounded-full text-sm font-medium hover:border-[#7B9E87] hover:text-[#A8C2B0] transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M4 2C4 2 3 3 3 5C3 10 6 13 11 13C13 13 14 12 14 12L12 10C12 10 11 11 10 11C7.5 11 5 8.5 5 6C5 5 6 4 6 4L4 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +420 777 932 382
            </a>
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-3 bg-[#7B9E87] text-white px-7 py-4 rounded-full text-sm font-medium hover:bg-[#6B8E77] transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 6L8 10L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Rezervovat online
            </button>
          </div>
        </div>
      </div>

      {/* Map + info + links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 sm:py-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 items-start">

        {/* Left — brand + map */}
        <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-5">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#7B9E87] flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-white font-bold text-sm leading-none">PM</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-white font-semibold text-base tracking-wide">Petra Marková</span>
                <span className="text-[#7B9E87] text-[10px] font-medium tracking-[0.15em] uppercase">Fyzioterapeutka</span>
              </div>
            </div>
            <p className="text-white/50 text-sm font-light leading-relaxed max-w-xs">
              Soukromá fyzioterapeutická praxe v Kolíně. Pomáhám lidem vrátit se k pohybu a životu bez bolesti.
            </p>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <svg className="w-4 h-4 text-[#7B9E87] mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
              <path d="M8 2C5.8 2 4 3.8 4 6C4 9.5 8 14 8 14C8 14 12 9.5 12 6C12 3.8 10.2 2 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <div className="text-white/60 text-sm font-light leading-relaxed">
              Karlovo náměstí 12<br />
              280 00 Kolín
            </div>
          </div>

          {/* Google map embed */}
          <div className="rounded-2xl overflow-hidden border border-white/10 h-36">
            <iframe
              src="https://maps.google.com/maps?q=Karlovo+náměstí,+Kolín,+Czech+Republic&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(0.85)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa ordinace"
            />
          </div>
        </div>

        {/* Hours */}
        <div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-4">Otevírací doba</div>
          {hours.map((h) => (
            <div key={h.day} className="flex justify-between text-sm mb-2.5">
              <span className="text-white/50 font-light">{h.day}</span>
              <span className={`font-medium ${h.time === "Zavřeno" ? "text-white/30" : "text-white/80"}`}>{h.time}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        {Object.entries(links).map(([category, items]) => (
          <div key={category}>
            <div className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-4">
              {category}
            </div>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-light">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs font-light">
            © {new Date().getFullYear()} Mgr. Petra Marková — Fyzioterapeutka, Kolín
          </p>
          <div className="flex gap-6">
            {[
              { label: "Ochrana osobních údajů", href: "/ochrana-osobnich-udaju" },
              { label: "Cookies", href: "/cookies" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-white/30 text-xs hover:text-white/60 transition-colors duration-150">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
