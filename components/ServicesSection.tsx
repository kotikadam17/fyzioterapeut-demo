"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./FloatingElement";

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2C12 2 8 7 8 12C8 14.8 9.8 17 12 17C14.2 17 16 14.8 16 12C16 7 12 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 17C9 17 9 21 12 21C15 21 15 17 15 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    num: "01",
    id: "bolesti-patere",
    title: "Bolesti zad a krční páteře",
    desc: "Komplexní diagnostika a terapie akutních i chronických bolestí. Manuální terapie, mobilizace a individuální program.",
    tag: "Nejčastější",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7V14M9 10L7 19M15 10L17 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 19H9M15 19H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    num: "02",
    id: "sportovni-fyzioterapie",
    title: "Sportovní fyzioterapie",
    desc: "Specializovaná péče pro aktivní sportovce. Od rekonvalescence po výkonnostní tréning. Prevence i léčba zranění.",
    tag: "Sport",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 3L14.5 9H21L16 13L18.5 19L12 15L5.5 19L8 13L3 9H9.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    num: "03",
    id: "rehabilitace-po-urazech",
    title: "Stavy po úrazech",
    desc: "Efektivní rehabilitace po zlomeninách, operacích a ortopedických výkonech. Rychlý návrat k plnému pohybu.",
    tag: "Rehabilitace",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 22C12 22 4 17 4 10C4 6.7 7.8 4 12 4C16.2 4 20 6.7 20 10C20 17 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 10C9 10 10 12 12 12C14 12 15 10 15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    num: "04",
    id: "terapie-pro-zeny",
    title: "Terapie pro ženy",
    desc: "Těhotenská fyzioterapie, poporodní rehabilitace, pánevní dno a posturální problémy.",
    tag: "Specializace",
  },
];

export function ServicesSection() {
  return (
    <section id="sluzby" className="py-28 lg:py-36 bg-[#141F18]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-10 h-px bg-[#7B9E87]" />
              <span className="text-[#7B9E87] text-xs font-semibold tracking-[0.25em] uppercase">Naše služby</span>
            </div>
            <h2
              className="font-serif font-bold text-white leading-[1.0]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Co pro vás
              <br />
              <em className="italic text-[#7B9E87]">dokážu udělat</em>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
            Každý pacient je jiný. Proto ke každému přistupuji individuálně — bez šablon, bez spěchu.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.1}>
              <motion.div
                id={s.id}
                whileHover={{ y: -8, backgroundColor: "#7B9E87" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-7 h-full flex flex-col cursor-pointer overflow-hidden"
              >
                {/* Big background number */}
                <div className="absolute top-4 right-5 font-serif text-7xl font-light text-white/5 select-none leading-none pointer-events-none">
                  {s.num}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-[#7B9E87] group-hover:text-white mb-6 transition-colors duration-300">
                  {s.icon}
                </div>

                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7B9E87] group-hover:text-white/60 mb-3 transition-colors duration-300">
                  {s.tag}
                </span>

                <h3 className="font-serif text-xl font-medium text-white leading-snug mb-3">
                  {s.title}
                </h3>

                <p className="text-white/50 group-hover:text-white/70 text-sm leading-relaxed font-light flex-1 transition-colors duration-300">
                  {s.desc}
                </p>

              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.4} className="mt-12 text-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:border-[#7B9E87] hover:text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
          >
            Bezplatná konzultace — zavolejte, poradím vám
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
