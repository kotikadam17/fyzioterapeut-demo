"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./FloatingElement";

const pricingItems = [
  { name: "Vstupní vyšetření (60 min)", price: "1 200 Kč", note: null },
  { name: "Terapeutické sezení (45 min)", price: "900 Kč", note: null },
  { name: "Terapeutické sezení (60 min)", price: "1 100 Kč", note: null },
  { name: "Sportovní fyzioterapie (60 min)", price: "1 200 Kč", note: null },
  { name: "Terapie pro ženy — pánevní dno (60 min)", price: "1 200 Kč", note: null },
  { name: "Těhotenská fyzioterapie (60 min)", price: "1 100 Kč", note: null },
  { name: "Fyzikální terapie — ultrazvuk, laser", price: "od 300 Kč", note: null },
];

export function PricingSection() {
  return (
    <section id="cenik" className="py-28 lg:py-36 bg-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-10 h-px bg-[#7B9E87]" />
            <span className="text-[#7B9E87] text-xs font-semibold tracking-[0.25em] uppercase">Ceník</span>
          </div>
          <h2
            className="font-serif font-bold text-white leading-[1.0]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Transparentní ceny
            <br />
            <em className="italic text-[#7B9E87]">bez překvapení</em>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-5 sm:gap-8 items-start">
          {/* Standard pricelist */}
          <ScrollReveal className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              <div className="px-4 sm:px-7 py-5 border-b border-white/10">
                <h3 className="font-serif text-xl font-medium text-white">Standardní ceník</h3>
                <p className="text-xs text-white/40 mt-1 font-light">Platnost od ledna 2025</p>
              </div>
              <div className="divide-y divide-white/5">
                {pricingItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-7 py-4 hover:bg-white/5 transition-colors duration-150"
                  >
                    <div>
                      <span className="text-sm font-medium text-white/80">{item.name}</span>
                      {item.note && (
                        <span className="ml-2 text-[10px] bg-[#7B9E87]/20 text-[#7B9E87] px-2 py-0.5 rounded-full font-semibold">
                          {item.note}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-[#7B9E87] whitespace-nowrap ml-4">{item.price}</span>
                  </motion.div>
                ))}
              </div>

              <div className="px-4 sm:px-7 py-4 bg-white/5 border-t border-white/10">
                <p className="text-xs text-white/30 font-light">
                  * Ceny jsou uvedeny včetně DPH. Platba kartou i hotově.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Featured package */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="relative bg-[#2C2C2C] rounded-3xl p-7 text-white overflow-hidden"
            >
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                style={{ background: "#7B9E87", transform: "translate(30%, -30%)" }}
              />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#7B9E87] rounded-full px-4 py-1.5 mb-6">
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z" fill="white"/>
                </svg>
                <span className="text-[10px] font-bold tracking-widest uppercase text-white">Nejlepší hodnota</span>
              </div>

              <h3 className="font-serif text-2xl font-medium mb-2 leading-snug">
                Balíček<br />5 + 1 terapie zdarma
              </h3>
              <p className="text-white/60 text-sm font-light mb-6 leading-relaxed">
                Zakupte 5 terapeutických sezení a šesté dostanete zcela zdarma.
              </p>

              {/* Pricing calculation */}
              <div className="bg-white/10 rounded-2xl p-5 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70 text-sm">5 × sezení (60 min)</span>
                  <span className="text-white/70 text-sm line-through">5 500 Kč</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white text-sm font-medium">+ 1 sezení ZDARMA</span>
                  <span className="text-[#7B9E87] text-sm font-bold">−1 100 Kč</span>
                </div>
                <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                  <span className="text-white font-semibold">Celkem</span>
                  <div className="text-right">
                    <div className="text-2xl font-serif font-light text-white">5 500 Kč</div>
                    <div className="text-xs text-white/50">ušetříte 1 100 Kč</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                {["Platnost 6 měsíců", "Volná volba terapeuta", "Přenosné na rodinného příslušníka"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#7B9E87]/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#7B9E87]" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-white/80 text-xs">{f}</span>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Note about insurance */}
            <ScrollReveal delay={0.3} className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-white/40 leading-relaxed">
                <span className="font-semibold text-white/70">Zdravotní pojišťovny:</span> Spolupracujeme s VZP, OZP a ZPMV. Vybrané výkony mohou být hrazeny pojišťovnou.
              </p>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
