"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "./FloatingElement";

const team = [
  {
    name: "Mgr. Tereza Horáková",
    role: "Zakladatelka & Hlavní terapeutka",
    spec: "Bolesti páteře, Manuální terapie",
    years: "14 let praxe",
    image: "/images/team-tereza.png",
    initials: "TH",
    color: "#A8C2B0",
  },
  {
    name: "Bc. Jakub Novák",
    role: "Sportovní fyzioterapeut",
    spec: "Sportovní zranění, Funkční tréning",
    years: "8 let praxe",
    image: "/images/team-jakub.png",
    initials: "JN",
    color: "#C5B8A8",
  },
  {
    name: "Mgr. Petra Vondráčková",
    role: "Ženská fyzioterapie",
    spec: "Pánevní dno, Těhotenství, Poporodní péče",
    years: "10 let praxe",
    image: "/images/team-petra.png",
    initials: "PV",
    color: "#B8C4B0",
  },
  {
    name: "Bc. Martin Šimánek",
    role: "Fyzioterapeut",
    spec: "Rehabilitace po úrazech, Neurologie",
    years: "6 let praxe",
    image: "/images/team-martin.png",
    initials: "MŠ",
    color: "#C8C0B8",
  },
];

export function TeamSection() {
  return (
    <section id="tym" className="py-28 lg:py-36 bg-[#F5EFE6]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-10 h-px bg-[#7B9E87]" />
            <span className="text-[#7B9E87] text-xs font-semibold tracking-[0.25em] uppercase">Náš tým</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="font-serif font-bold text-[#1C1C1C] leading-[1.0]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Lidé za<br />
              <em className="italic text-[#7B9E87]">vaším zdravím</em>
            </h2>
            <p className="text-[#6B7A6E] leading-relaxed max-w-xs font-light text-sm">
              Náš tým tvoří certifikovaní fyzioterapeuti s rozsáhlou klinickou praxí.
            </p>
          </div>
        </ScrollReveal>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group"
              >
                {/* Photo */}
                <div className="w-full aspect-[3/4] rounded-3xl mb-5 flex items-end p-5 relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#2C2C2C]/0 group-hover:bg-[#2C2C2C]/20 transition-colors duration-300 rounded-3xl" />

                  {/* Spec tag */}
                  <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2">
                    <span className="text-[10px] font-semibold text-[#7B9E87] tracking-wide uppercase">{member.years}</span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#2C2C2C] mb-1">{member.name}</h3>
                  <p className="text-[#7B9E87] text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-[#6B7A6E] text-xs leading-relaxed font-light">{member.spec}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Certifications bar */}
        <ScrollReveal delay={0.4} className="mt-16 pt-12 border-t border-[#E0E8E3]">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {[
              "Česká asociace fyzioterapeutů",
              "European Physiotherapy Network",
              "McKenzie Institut",
              "DNS — Dynamic Neuromuscular Stabilization",
            ].map((cert) => (
              <div key={cert} className="text-center">
                <div className="text-[10px] font-semibold tracking-widest uppercase text-[#A8B8AC]">
                  {cert}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
