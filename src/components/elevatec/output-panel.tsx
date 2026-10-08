"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  FileText,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalcStore } from "@/lib/store";
import {
  estimateFitout,
  formatAUD,
  FINISH_META,
  PROPERTY_META,
} from "@/lib/fitout";

/* Animated AUD figure ------------------------------------------------ */
function AnimatedAUD({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 90, damping: 22 });
  const display = useTransform(spring, (v) =>
    v >= 1_000_000
      ? `$${(v / 1_000_000).toFixed(2)}M`
      : `$${Math.round(v).toLocaleString("en-AU")}`
  );
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  return <motion.span>{display}</motion.span>;
}

export function OutputPanel({ onOpenLead }: { onOpenLead: () => void }) {
  const s = useCalcStore();
  const estimate = estimateFitout({
    propertyType: s.propertyType,
    suburb: s.suburb,
    postcode: s.postcode,
    floorArea: s.floorArea,
    desks: s.desks,
    toggles: s.toggles,
    finish: s.finish,
  });

  const finishMeta = FINISH_META.find((f) => f.value === s.finish)!;
  const propertyMeta = PROPERTY_META.find((p) => p.value === s.propertyType)!;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:sticky lg:top-24"
      aria-label="Live fitout estimate"
    >
      <div className="overflow-hidden rounded-2xl bg-navy text-white shadow-2xl shadow-navy/30 ring-1 ring-navy/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-200">
              Your Live Estimate
            </h3>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
            {propertyMeta.label.split(" / ")[0]}
          </span>
        </div>

        <div className="px-6 py-6">
          {/* Budget */}
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Estimated Budget Range (AUD)
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-white">
              <AnimatedAUD value={estimate.budgetLow} />
            </span>
            <span className="text-xl font-semibold text-slate-400">–</span>
            <span className="text-4xl font-extrabold tracking-tight text-brand">
              <AnimatedAUD value={estimate.budgetHigh} />
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Based on {s.floorArea.toLocaleString()} sqm ×{" "}
            <span className="text-slate-300">
              {finishMeta.label} (${finishMeta.low}–${finishMeta.high}/sqm)
            </span>{" "}
            + {estimate.toggleLines.length} option{estimate.toggleLines.length === 1 ? "" : "s"}
          </div>

          {/* Duration + density stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <CalendarClock className="h-4 w-4 text-brand" />
              <div className="mt-2 text-lg font-bold leading-none">
                {estimate.durationLowWeeks}–{estimate.durationHighWeeks}
                <span className="text-xs font-medium text-slate-400"> wks</span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-400">
                Build Duration
              </div>
            </div>
            <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <FileText className="h-4 w-4 text-brand" />
              <div className="mt-2 text-lg font-bold leading-none">
                {s.desks > 0 ? formatAUD(estimate.costPerDeskLow) : "—"}
                <span className="text-xs font-medium text-slate-400">+</span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-400">
                Cost / Desk
              </div>
            </div>
            <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <ShieldCheck className="h-4 w-4 text-brand" />
              <div className="mt-2 text-lg font-bold leading-none">
                {estimate.densitySqmPerDesk > 0
                  ? estimate.densitySqmPerDesk.toFixed(1)
                  : "—"}
                <span className="text-xs font-medium text-slate-400"> m²</span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-400">
                Per Workstation
              </div>
            </div>
          </div>

          {/* Options breakdown */}
          {estimate.toggleLines.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {estimate.toggleLines.map((t) => (
                <span
                  key={t.key}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-medium text-orange-200"
                >
                  {t.label}
                  {t.qty > 1 && <span className="text-orange-300">×{t.qty}</span>}
                  <span className="text-orange-300/80">
                    +{formatAUD(t.low)}–{formatAUD(t.high)}
                  </span>
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <Button
            onClick={onOpenLead}
            className="mt-6 h-12 w-full bg-brand text-base font-bold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-deep"
          >
            <Lock className="mr-2 h-4 w-4" />
            Lock In Budget &amp; Request Detailed Scope
          </Button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
            Indicative planning estimate only. Pricing excludes GST, statutory
            permits, and site condition variations. Final budget confirmed
            after free on-site audit.
          </p>
        </div>

        {/* Compliance checklist */}
        <div className="border-t border-white/10 bg-navy-soft/60 px-6 py-5">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand" />
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
              ISO Compliance &amp; Regulatory Sign-off Checklist
            </h4>
          </div>
          <ul className="max-h-44 space-y-2 overflow-y-auto pr-1 scrollbar-thin">
            {estimate.checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.aside>
  );
}
