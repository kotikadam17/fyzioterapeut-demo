"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./FloatingElement";

const testimonials = [
  {
    quote: "Po letech chronických bolestí zad jsem konečně našel úlevu. Petra přesně identifikovala problém a sestavila plán, který skutečně fungoval. Po 8 sezeních jsem mohl znovu sportovat.",
    name: "Ondřej K.",
    detail: "Bolesti zad, Praha 2",
    rating: 5,
  },
  {
    quote: "Přišla jsem po porodu s bolestmi pánevního dna, o kterých se moc nemluví. Petra byla naprosto profesionální a empatická. Výsledky předčily moje očekávání. Děkuji!",
    name: "Alžběta M.",
    detail: "Poporodní rehabilitace",
    rating: 5,
  },
  {
    quote: "Jako triatlonista jsem potřeboval rychlou rehabilitaci po natržení svalu. Petra nejen pomohla s léčbou, ale i nastavila preventivní plán do budoucna. Zpátky na závodní trasy za 5 týdnů!",
    name: "Martin R.",
    detail: "Sportovní fyzioterapie",
    rating: 5,
  },
  {
    quote: "Po operaci kolene jsem absolvoval kompletní rehabilitaci u Petry. Přístup je naprosto individuální, prostředí klidné a výsledky hovoří za vše — chodím bez bolesti poprvé za 2 roky.",
    name: "Jana P.",
    detail: "Pooperační rehabilitace, Praha 3",
    rating: 5,
  },
  {
    quote: "Profesionální přístup, příjemné prostředí a výsledky, které cítím. Přivedla jsem i svého muže a oba jsme spokojeni. Petra si zasluhuje každou hvězdičku.",
    name: "Veronika H.",
    detail: "Krční páteř, Vinohrady",
    rating: 5,
  },
  {
    quote: "Přicházel jsem skepticky, ale Petra mi doslova změnila pohled na vlastní tělo. Konečně vím, jak správně cvičit a předcházet bolestem. Doporučuji všem, kteří to se svým zdravím myslí vážně.",
    name: "David Š.",
    detail: "Bolesti zad a ramen",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#7B9E87]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1L9.8 6H15L10.5 9L12.3 14L8 11L3.7 14L5.5 9L1 6H6.2L8 1Z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const featured = testimonials[current];

  return (
    <section id="reference" className="py-28 lg:py-36 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-10 h-px bg-[#7B9E87]" />
            <span className="text-[#7B9E87] text-xs font-semibold tracking-[0.25em] uppercase">Reference</span>
          </div>
          <h2
            className="font-serif font-bold text-[#1C1C1C] leading-[1.0]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Co říkají
            <br />
            <em className="italic text-[#7B9E87]">moji pacienti</em>
          </h2>
        </ScrollReveal>

        {/* Featured testimonial slider */}
        <ScrollReveal className="mb-12">
          <div className="relative bg-[#1C1C1C] rounded-3xl p-6 sm:p-8 lg:p-14 overflow-hidden">
            {/* Quote mark */}
            <div className="absolute top-6 left-6 font-serif text-[5rem] sm:text-[8rem] leading-none text-[#7B9E87]/10 pointer-events-none select-none">
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Stars count={featured.rating} />
                <blockquote className="font-serif text-base sm:text-xl lg:text-2xl font-medium text-white leading-relaxed mt-4 mb-6 sm:mb-8 max-w-3xl">
                  "{featured.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-white text-sm">{featured.name}</div>
                  <div className="text-[#7B9E87] text-xs mt-0.5">{featured.detail}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 sm:mt-8 pt-6 border-t border-white/10">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all duration-200 rounded-full ${
                      i === current
                        ? "w-8 h-2 bg-[#7B9E87]"
                        : "w-2 h-2 bg-white/20 hover:bg-[#7B9E87]"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#7B9E87] hover:text-[#7B9E87] transition-colors duration-200 text-white/50"
                  aria-label="Previous"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#7B9E87] hover:text-[#7B9E87] transition-colors duration-200 text-white/50"
                  aria-label="Next"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Google rating note */}
        <ScrollReveal delay={0.3} className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-[#E0E8E3] rounded-full px-6 py-3">
            <svg className="w-5 h-5 text-[#7B9E87]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2L12.2 8H18.6L13.4 11.7L15.6 17.6L10 13.9L4.4 17.6L6.6 11.7L1.4 8H7.8L10 2Z"/>
            </svg>
            <span className="text-sm text-[#2C2C2C] font-medium">4.9 / 5</span>
            <span className="text-[#6B7A6E] text-sm">z 180+ recenzí na Google</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
