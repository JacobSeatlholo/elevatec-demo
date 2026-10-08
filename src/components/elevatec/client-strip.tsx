"use client";

import { motion } from "framer-motion";

const CLIENTS = [
  { name: "JLL", style: "font-black tracking-[0.3em] text-lg" },
  {
    name: "SALVATION ARMY",
    style: "font-bold tracking-wide text-sm",
    shield: true,
  },
  {
    name: "REGIS AGED CARE",
    style: "font-semibold tracking-[0.14em] text-sm",
  },
  {
    name: "NORTHERN SCHOOL OF AUTISM",
    style: "font-bold tracking-wide text-xs sm:text-sm",
  },
];

export function ClientStrip() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-10"
      aria-label="Trusted by leading organisations"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"
        >
          Trusted by Australia&apos;s leading organisations
        </motion.p>
        <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-6 sm:grid-cols-4">
          {CLIENTS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group flex items-center gap-2.5 text-slate-400 transition-colors duration-300 hover:text-charcoal"
              title={c.name}
            >
              {c.shield && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-current text-[10px] font-black">
                  SA
                </span>
              )}
              <span className={`${c.style} text-center leading-tight`}>
                {c.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
