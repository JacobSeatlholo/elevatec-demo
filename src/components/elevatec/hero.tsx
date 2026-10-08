"use client";

import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const ISO_BADGES = [
  { code: "ISO 9001", label: "Quality Management" },
  { code: "ISO 14001", label: "Environmental Mgmt" },
  { code: "ISO 45001", label: "OH&S Management" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy pt-16 text-white"
      aria-label="Hero"
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/70" />
        <div className="blueprint-grid absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="max-w-3xl">
          {/* Accreditation eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6 inline-flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand">
              <ShieldCheck className="h-3.5 w-3.5" />
              ISO 9001 · 14001 · 45001 Certified
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-slate-300">
              Registered Builder CCB-L 100313 | CB-U 41950
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Precision Commercial Fitouts &amp; Workplace Solutions in{" "}
            <span className="relative text-brand sm:whitespace-nowrap">
              Metropolitan Melbourne
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 8"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6C60 2 180 1 298 4"
                  stroke="#F97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
          >
            Calculate estimated fitout costs, spatial requirements, and lead
            times in under 60 seconds — then lock in your budget with a free
            on-site audit from a licensed builder.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              onClick={() => scrollTo("#calculator")}
              className="group h-14 bg-brand px-8 text-base font-bold text-white shadow-xl shadow-brand/30 transition-all hover:scale-[1.02] hover:bg-brand-deep"
            >
              Start Fitout Calculator
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("#calculator")}
              className="h-14 border-white/25 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/15 hover:text-white"
            >
              <ClipboardCheck className="mr-2 h-5 w-5 text-brand" />
              Book On-Site Audit
            </Button>
          </motion.div>

          {/* Micro trust row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-2">
              <Timer className="h-4 w-4 text-brand" />
              60-second estimate
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand" />
              Fixed-price commitments
            </span>
            <span className="hidden items-center gap-2 sm:inline-flex">
              <ClipboardCheck className="h-4 w-4 text-brand" />
              Melbourne Metro &amp; Regional VIC
            </span>
          </motion.div>
        </div>
      </div>

      {/* ISO accreditation badge strip */}
      <div className="relative border-t border-white/10 bg-navy/80 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {ISO_BADGES.map((b, i) => (
            <motion.div
              key={b.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 py-5 sm:justify-center"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand/70">
                <ShieldCheck className="h-6 w-6 text-brand" />
                <span className="absolute -bottom-1 rounded-sm bg-brand px-1 text-[7px] font-bold text-white">
                  CERT
                </span>
              </div>
              <div>
                <div className="text-sm font-bold tracking-wide">{b.code}</div>
                <div className="text-xs text-slate-400">{b.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
