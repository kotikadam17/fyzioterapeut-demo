"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "./FloatingElement";

const quals = [
  { label: "Vzdělání", value: "FTVS UK Praha, Mgr." },
  { label: "Praxe", value: "9 let, soukromá ordinace" },
  { label: "Specializace", value: "Páteř, sport, ženy" },
  { label: "Kapacita", value: "max. 5 pacientů denně" },
];


export function AboutSection() {
  return (
    <section id="o-mne" className="py-28 lg:py-36 bg-[#F5EFE6]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — photo */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Main portrait */}
              <div className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-petra.png"
                  alt="Mgr. Petra Marková — fyzioterapeutka"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
                {/* Overlay gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1C1C1C]/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="text-white font-serif font-bold text-xl">Mgr. Petra Marková</div>
                  <div className="text-[#7B9E87] text-sm font-medium">Fyzioterapeutka</div>
                </div>
              </div>

              {/* Floating quals card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -right-4 lg:-right-8 top-16 bg-white rounded-2xl shadow-xl p-5 w-48"
              >
                {quals.slice(0, 2).map((q) => (
                  <div key={q.label} className="mb-3 last:mb-0">
                    <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#7B9E87] mb-0.5">{q.label}</div>
                    <div className="text-xs font-semibold text-[#1C1C1C] leading-snug">{q.value}</div>
                  </div>
                ))}
              </motion.div>

              {/* Decorative dot grid */}
              <div
                className="absolute -bottom-6 -left-6 w-28 h-28 opacity-20 -z-10"
                style={{
                  backgroundImage: "radial-gradient(circle, #7B9E87 1.5px, transparent 1.5px)",
                  backgroundSize: "10px 10px",
                }}
              />
            </div>
          </ScrollReveal>

          {/* Right — story */}
          <ScrollReveal direction="right">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-10 h-px bg-[#7B9E87]" />
                <span className="text-[#7B9E87] text-xs font-semibold tracking-[0.25em] uppercase">O mně</span>
              </div>

              <h2
                className="font-serif font-bold text-[#1C1C1C] leading-[1.0] mb-6"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}
              >
                Fyzioterapie
                <br />
                <em className="italic text-[#7B9E87]">je můj životní styl.</em>
              </h2>

              <div className="space-y-4 text-[#6B7A6E] font-light leading-relaxed text-base mb-8">
                <p>
                  Před devíti lety jsem se rozhodla jít vlastní cestou. Opustila jsem kliniku a otevřela soukromou praxi — protože věřím, že skutečná fyzioterapie vyžaduje klid, pozornost a prostor pro každého pacienta zvlášť.
                </p>
                <p>
                  Specializuji se na bolesti pohybového aparátu, sportovní zranění a ženské zdraví. Ke každému pacientovi přistupuji individuálně — bez šablon, s plnou péčí a zájmem o člověka jako celek.
                </p>
                <p>
                  Pracuji na základě nejnovějších poznatků a zároveň naslouchám tomu, co mi říká vaše tělo. Cílem není jen odstranit bolest — ale najít její příčinu a předejít návratu.
                </p>
              </div>

              {/* Certs */}
              <div className="mb-8">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B7A6E] mb-3">Certifikace & kurzy</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Maitland — mobilizační techniky",
                    "DNS — Dynamic Neuromuscular Stabilization",
                    "McKenzie Institut",
                    "Fyzioterapie pánevního dna",
                    "Sportovní fyzioterapie — UEFA certifikát",
                    "FTVS UK Praha, Mgr.",
                  ].map((c) => (
                    <div key={c} className="bg-white rounded-xl px-3 py-2.5 border border-[#E8EEE9] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#7B9E87] flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-[#1C1C1C] font-medium leading-snug">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
