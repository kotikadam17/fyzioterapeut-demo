"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FloatingElement } from "./FloatingElement";
import { useBooking } from "./BookingContext";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection() {
  const { openModal } = useBooking();
  return (
    <section className="relative min-h-screen flex overflow-hidden">
      {/* LEFT — dark panel */}
      <div className="relative z-10 flex items-center w-full lg:w-[52%] bg-[#1C1C1C] px-8 md:px-14 lg:px-16 xl:px-20 pt-28 pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 20% 80%, rgba(123,158,135,0.12) 0%, transparent 60%)",
          }}
        />

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-xl">
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <span className="block w-10 h-px bg-[#7B9E87]" />
            <span className="text-[#7B9E87] text-xs font-semibold tracking-[0.25em] uppercase">
              Praha 2 — Vinohrady
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-serif leading-[1.05] font-bold text-white mb-8"
            style={{ fontSize: "clamp(3rem, 5.5vw, 6rem)" }}
          >
            Pohyb
            <br />
            bez bolesti
            <br />
            <em className="italic text-[#7B9E87]">je vaše právo.</em>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-white/50 text-base lg:text-lg leading-relaxed max-w-sm mb-10 font-light"
          >
            Jsem soukromá fyzioterapeutka. Přijímám max. 5 pacientů denně — každý dostane moji plnou pozornost a péči bez spěchu.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 items-center">
            <button
              onClick={openModal}
              className="group inline-flex items-center gap-3 bg-[#7B9E87] hover:bg-[#6B8E77] text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
            >
              Rezervovat termín
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="#o-mne" className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200">
              Více o mně
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="mt-16 pt-10 border-t border-white/10 grid grid-cols-3 gap-6">
            {[
              { value: "9+", label: "let praxe" },
              { value: "800+", label: "pacientů" },
              { value: "péče", label: "pro každého z vás" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-[11px] text-white/40 mt-1 font-medium tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT — full-bleed image */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%]">
        <Image
          src="/images/hero-petra.png"
          alt="Petra Marková — fyzioterapeutka"
          fill
          className="object-cover object-center"
          sizes="50vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #1C1C1C 0%, transparent 15%)" }}
        />

        {/* Floating — availability */}
        <FloatingElement
          className="absolute bottom-16 left-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl px-5 py-4"
          amplitude={7}
          duration={4}
          delay={0.5}
        >
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#7B9E87] animate-pulse" />
            <div>
              <div className="text-xs font-bold text-[#1C1C1C]">Volné termíny</div>
              <div className="text-[10px] text-[#6B7A6E]">příští týden</div>
            </div>
          </div>
        </FloatingElement>

        {/* Floating — rating */}
        <FloatingElement
          className="absolute top-1/3 right-8 bg-[#7B9E87] rounded-2xl shadow-xl px-5 py-4"
          amplitude={9}
          duration={5}
          delay={1}
        >
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 text-white" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z" />
              </svg>
            ))}
          </div>
          <div className="text-white text-xs font-bold">4.9 / 5</div>
          <div className="text-white/70 text-[10px]">120+ recenzí</div>
        </FloatingElement>

        {/* Small secondary */}
        <FloatingElement
          className="absolute top-36 -left-20 w-[280px] h-[370px] rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 z-20"
          amplitude={6}
          duration={4.5}
          delay={1.5}
        >
          <video
            src="/images/Dronový_Záběr_Fyzioterapeutické_Kliniky.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </FloatingElement>
      </div>

      {/* Mobile bg */}
      <div className="absolute inset-0 lg:hidden -z-10">
        <Image src="/images/hero-petra.png" alt="" fill className="object-cover opacity-20" sizes="100vw" priority />
      </div>

    </section>
  );
}
