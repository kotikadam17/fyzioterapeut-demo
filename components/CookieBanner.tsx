"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies_accepted")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookies_accepted", "true");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookies_accepted", "false");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl"
        >
          <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl px-6 py-5 shadow-2xl flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-white/60 text-sm leading-relaxed flex-1">
              Používáme cookies pro zajištění správné funkčnosti webu.{" "}
              <a href="#" className="text-[#7B9E87] hover:text-[#A8C2B0] underline underline-offset-2 transition-colors">
                Více informací
              </a>
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 transition-colors"
              >
                Odmítnout
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#7B9E87] hover:bg-[#6B8E77] text-white transition-colors"
              >
                Přijmout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
