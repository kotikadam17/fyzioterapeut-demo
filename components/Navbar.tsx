"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Služby", href: "#sluzby" },
  { label: "O mně", href: "#o-mne" },
  { label: "Jak to funguje", href: "#jak-to-funguje" },
  { label: "Ceník", href: "#cenik" },
  { label: "Reference", href: "#reference" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1C1C1C]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo — personal brand */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Monogram mark */}
          <div className="w-9 h-9 rounded-xl bg-[#7B9E87] flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-white font-bold text-sm leading-none">PM</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-white font-semibold text-base tracking-wide leading-tight">
              Petra Marková
            </span>
            <span className="text-[#7B9E87] text-[10px] font-medium tracking-[0.15em] uppercase leading-tight">
              Fyzioterapeutka
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-[#7B9E87] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B8E77] transition-colors duration-200"
          >
            Rezervovat termín
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#1C1C1C] border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-white/80 py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#kontakt"
                className="mt-2 inline-flex justify-center bg-[#7B9E87] text-white px-5 py-3 rounded-full text-sm font-medium"
              >
                Rezervovat termín
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
