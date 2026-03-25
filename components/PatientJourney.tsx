"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./FloatingElement";
import { useBooking } from "./BookingContext";

const steps = [
  {
    number: "01",
    title: "Vstupní diagnostika",
    desc: "Na první návštěvě provedu důkladné vyšetření pohybového aparátu. Zjistím příčiny vašich obtíží a zmapuji celkový stav.",
    duration: "60 minut",
    items: ["Posturální analýza", "Pohybové testy", "Anamnéza"],
    color: "#EAF1EC",
  },
  {
    number: "02",
    title: "Terapeutický plán",
    desc: "Na základě diagnózy sestavím individuální léčebný plán. Navrhnu optimální počet sezení a kombinaci technik přímo pro vás.",
    duration: "15 minut",
    items: ["Výběr technik", "Počet sezení", "Domácí cvičení"],
    color: "#F5EFE6",
  },
  {
    number: "03",
    title: "Aktivní terapie",
    desc: "Samotná léčba kombinuje manuální terapii, fyzikální procedury a cílenou cvičební terapii podle vašich potřeb.",
    duration: "45–60 minut",
    items: ["Manuální terapie", "Fyzikální léčba", "Kinezioterapie"],
    color: "#EAF1EC",
  },
];

export function PatientJourney() {
  const { openModal } = useBooking();
  return (
    <section id="jak-to-funguje" className="py-28 lg:py-36 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-10 h-px bg-[#7B9E87]" />
            <span className="text-[#7B9E87] text-xs font-semibold tracking-[0.25em] uppercase">Jak to funguje</span>
          </div>
          <h2
            className="font-serif font-bold text-[#1C1C1C] leading-[1.0]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Vaše první návštěva
            <br />
            <em className="italic text-[#7B9E87]">krok za krokem</em>
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E0E8E3] to-transparent" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.15}>
                <div className="relative">
                  {/* Number badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-[#1C1C1C] flex items-center justify-center text-white font-serif text-xl font-medium z-10 relative">
                      {step.number}
                    </div>
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7B9E87]">
                      {step.duration}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="rounded-3xl p-7 bg-white border border-[#E8EEE9] shadow-sm">
                    <h3 className="font-serif text-2xl font-medium text-[#1C1C1C] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#6B7A6E] text-sm leading-relaxed font-light mb-5">
                      {step.desc}
                    </p>

                    {/* Items */}
                    <div className="flex flex-col gap-2">
                      {step.items.map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-[#7B9E87]" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-sm text-[#2C2C2C] font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <ScrollReveal delay={0.5} className="mt-16">
          <div className="bg-[#2C2C2C] rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-white mb-2">
                Připraveni začít?
              </h3>
              <p className="text-white/60 text-sm font-light">
                Online rezervace je dostupná 24 hodin denně, 7 dní v týdnu.
              </p>
            </div>
            <button
              onClick={openModal}
              className="flex-shrink-0 inline-flex items-center gap-3 bg-[#7B9E87] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#6B8E77] transition-colors duration-200"
            >
              Rezervovat první návštěvu
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
