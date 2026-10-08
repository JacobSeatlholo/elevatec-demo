"use client";

import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";
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

/* Real accreditation lines pulled from elevatec.com.au */
const REGISTRATIONS = [
  "Commercial Builder — CCB-L 100313",
  "Domestic Builder — CB-U 41950",
  "ISO 9001 · ISO 14001 · ISO 45001",
  "VGCSR No. 904351",
];

const HERO_STATS = [
  { value: "25+", label: "Years industry experience" },
  { value: "ISO", label: "9001 · 14001 · 45001 certified" },
  { value: "VIC", label: "Metro Melbourne & Regional" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-white"
      aria-label="Hero"
    >
      {/* Background: real Elevate project photography */}
      <div className="absolute inset-0">
        <img
          src="/brand/hero-image.jpg"
          alt="Elevate Commercial Construction project site in Melbourne"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="plan-grid absolute inset-0 opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-6 sm:pt-44 lg:px-8 lg:pb-24 lg:pt-52">
        <div className="max-w-3xl">
          {/* Accreditation eyebrow — verifiable numbers first */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold tracking-[0.14em] text-neutral-300"
          >
            {REGISTRATIONS.map((r) => (
              <span key={r} className="flex items-center gap-2">
                <span className="h-1 w-1 bg-brand" aria-hidden="true" />
                {r.toUpperCase()}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="display-tight text-balance text-4xl sm:text-6xl lg:text-[4.2rem]"
          >
            Precision Commercial Fitouts &amp; Workplace Solutions in{" "}
            <span className="text-brand">Metropolitan Melbourne</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg"
          >
            Calculate estimated fitout costs, spatial requirements and lead
            times in under 60 seconds — then validate the numbers with a free
            on-site audit from a registered Victorian builder.
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
              className="group h-14 bg-brand px-8 text-base font-bold tracking-wide text-white transition-colors hover:bg-brand-deep"
            >
              Start Fitout Calculator
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("#contact")}
              className="h-14 border-white/30 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <ClipboardCheck className="mr-2 h-5 w-5 text-brand" />
              Book On-Site Audit
            </Button>
          </motion.div>

          {/* Editorial stat row */}
          <motion.dl
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {s.value}
                </dd>
                <dd className="mt-1 text-[11px] leading-snug tracking-wide text-neutral-400">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Bottom strip: certification partner + JAS-ANZ accreditation (real badges) */}
      <div className="relative border-t border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-[11px] leading-relaxed tracking-wide text-neutral-400">
            O&rsquo;Callaghan Building and Maintenance Pty Ltd trading as{" "}
            <span className="font-bold text-white">
              Elevate Commercial Construction
            </span>{" "}
            — registered commercial &amp; domestic builder, Victoria.
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 border-l border-white/15 pl-5">
              <img
                src="/brand/jas-anz.png"
                alt="JAS-ANZ accredited certification"
                className="h-9 w-auto bg-white/95 rounded-sm px-1 py-0.5"
              />
              <img
                src="/brand/cpg.png"
                alt="Certification Partner Global"
                className="h-8 w-auto rounded-sm bg-white/95 px-1 py-0.5"
              />
            </div>
            <div className="text-[10px] leading-tight tracking-wide text-neutral-400">
              <span className="block font-bold text-neutral-200">
                Certification Partner Global
              </span>
              ISO 9001 · ISO 14001 · ISO 45001
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
