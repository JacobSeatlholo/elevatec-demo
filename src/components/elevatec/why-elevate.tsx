"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  ClipboardCheck,
  HardHat,
  Landmark,
  ShieldCheck,
  Timer,
} from "lucide-react";

const PILLARS = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Triple-ISO Certified Systems",
    body: "Integrated ISO 9001, 14001 and 45001 management systems govern every project — quality, environmental and safety outcomes are audited, not assumed. Your stakeholders get documented compliance from day one.",
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: "Registered Builder, Fully Insured",
    body: "CCB-L 100313 and CB-U 41950 registrations mean lawful, insurable delivery across commercial classes. Contracts, permits and occupancy sign-off are handled in-house — no loose ends at handover.",
  },
  {
    icon: <Timer className="h-6 w-6" />,
    title: "Program Certainty",
    body: "Trade-won programmes with weekly client reporting. Our 60-second estimator and free on-site audit de-risk budgets before commitments are made, so variations surprise nobody.",
  },
  {
    icon: <HardHat className="h-6 w-6" />,
    title: "Direct Trade Relationships",
    body: "Established Melbourne subcontractor networks across joinery, services, glazing and AV deliver sharper pricing and faster defect resolution than contract-layered alternatives.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Estimate",
    body: "Use the 60-second calculator to frame your budget range and lead time.",
  },
  {
    step: "02",
    title: "On-Site Audit",
    body: "Free measured site audit — services, structure, compliance risks and opportunities.",
  },
  {
    step: "03",
    title: "Detailed Scope & Fixed Price",
    body: "Design coordination, itemised scope and a fixed-price commitment you can take to your board.",
  },
  {
    step: "04",
    title: "Build & Handover",
    body: "Weekly reporting, safety-audited site, defects-free practical completion and occupancy sign-off.",
  },
];

export function WhyElevate() {
  return (
    <section id="why" className="relative overflow-hidden bg-navy py-20 text-white lg:py-28" aria-label="Why choose Elevate">
      <div className="blueprint-grid absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            <Landmark className="h-3.5 w-3.5" />
            Why Elevate
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Commercial construction managed like an{" "}
            <span className="text-brand">investment</span>, not a gamble.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Elevate Commercial Construction delivers workplace, retail, health
            and education fitouts across Metropolitan Melbourne with
            certified systems, registered builder accountability and
            fixed-price certainty.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors duration-300 hover:border-brand/40 hover:bg-white/[0.08]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30">
                {p.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process timeline */}
        <div className="mt-16">
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            From First Click to Handover
          </h3>
          <div className="relative mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-brand/60 via-white/20 to-brand/60 lg:block" />
            {PROCESS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl bg-navy-soft/80 p-5 ring-1 ring-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-sm font-black text-white shadow-lg shadow-brand/30">
                  {s.step}
                </div>
                <h4 className="mt-4 flex items-center gap-2 text-base font-bold">
                  {s.title}
                  {i === 1 && <ClipboardCheck className="h-4 w-4 text-brand" />}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
