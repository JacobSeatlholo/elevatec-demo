"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  MapPin,
  Minus,
  Plus,
  Ruler,
  Sparkles,
  Stethoscope,
  Store,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useCalcStore } from "@/lib/store";
import {
  estimateFitout,
  FINISH_META,
  formatAUD,
  PROPERTY_META,
  suggestDesks,
  TOGGLE_META,
  type FinishLevel,
  type PropertyType,
} from "@/lib/fitout";
import { OutputPanel } from "./output-panel";

const STEP_META = [
  { n: 1, title: "Property & Location" },
  { n: 2, title: "Spatial Scale & Layout" },
  { n: 3, title: "Finish Level" },
];

const PROPERTY_ICONS: Record<PropertyType, React.ReactNode> = {
  "commercial-office": <Building2 className="h-6 w-6" />,
  "retail-hospitality": <Store className="h-6 w-6" />,
  "allied-health": <Stethoscope className="h-6 w-6" />,
  "education-nfp": <GraduationCap className="h-6 w-6" />,
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export function Calculator({ onOpenLead }: { onOpenLead: () => void }) {
  const s = useCalcStore();
  const [step, setStep] = useState(1);
  const [desksAuto, setDesksAuto] = useState(true);

  const estimate = estimateFitout({
    propertyType: s.propertyType,
    suburb: s.suburb,
    postcode: s.postcode,
    floorArea: s.floorArea,
    desks: s.desks,
    toggles: s.toggles,
    finish: s.finish,
  });

  const handleAreaChange = (v: number) => {
    s.setFloorArea(v);
    if (desksAuto) s.setDesks(suggestDesks(v));
  };

  const setDesksManual = (v: number) => {
    setDesksAuto(false);
    s.setDesks(Math.max(0, Math.min(999, v)));
  };

  return (
    <section id="calculator" className="relative bg-white py-20 lg:py-28" aria-label="Fitout calculator">
      <div className="blueprint-grid-light pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-deep ring-1 ring-brand/20">
            <Sparkles className="h-3.5 w-3.5" />
            60-Second Estimator
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Workplace Fitout Calculator
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Configure your space in three steps. Your budget range, build
            duration, and compliance checklist update in real time.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          {/* ------------------------------ Wizard ------------------------------ */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
              {/* Progress header */}
              <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4">
                <div className="flex items-center justify-between gap-2">
                  {STEP_META.map((m) => {
                    const active = step === m.n;
                    const done = step > m.n;
                    return (
                      <button
                        key={m.n}
                        onClick={() => setStep(m.n)}
                        className="group flex flex-1 items-center gap-2.5"
                        aria-label={`Go to step ${m.n}: ${m.title}`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                            done
                              ? "bg-brand text-white"
                              : active
                                ? "bg-navy text-white ring-4 ring-navy/15"
                                : "bg-slate-200 text-slate-500 group-hover:bg-slate-300"
                          }`}
                        >
                          {done ? <Check className="h-4 w-4" /> : m.n}
                        </span>
                        <span
                          className={`hidden text-xs font-semibold sm:block ${
                            active ? "text-navy" : "text-slate-500"
                          }`}
                        >
                          {m.title}
                        </span>
                        {m.n < 3 && (
                          <span className="mx-1 hidden h-px flex-1 bg-slate-200 sm:block" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* mobile progress bar */}
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200 sm:hidden">
                  <motion.div
                    className="h-full bg-brand"
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Steps body */}
              <div className="min-h-[430px] px-6 py-8 sm:px-8">
                <AnimatePresence mode="wait">
                  {/* ---------------- STEP 1 ---------------- */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <h3 className="flex items-center gap-2.5 text-lg font-bold text-navy">
                        <Building2 className="h-5 w-5 text-brand" />
                        What type of property are you fitting out?
                      </h3>
                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {PROPERTY_META.map((p) => {
                          const active = s.propertyType === p.value;
                          return (
                            <button
                              key={p.value}
                              onClick={() => s.setPropertyType(p.value as PropertyType)}
                              aria-pressed={active}
                              className={`group relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                                active
                                  ? "border-brand bg-brand-soft shadow-md shadow-brand/10"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                              }`}
                            >
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                                  active
                                    ? "bg-brand text-white"
                                    : "bg-slate-100 text-charcoal group-hover:bg-slate-200"
                                }`}
                              >
                                {PROPERTY_ICONS[p.value]}
                              </div>
                              <div className="mt-3 text-sm font-bold text-navy">
                                {p.label}
                              </div>
                              <div className="mt-1 text-xs leading-relaxed text-slate-500">
                                {p.blurb}
                              </div>
                              {active && (
                                <Check className="absolute right-3 top-3 h-5 w-5 text-brand" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <h3 className="mt-8 flex items-center gap-2.5 text-lg font-bold text-navy">
                        <MapPin className="h-5 w-5 text-brand" />
                        Where is your site located?
                      </h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_140px]">
                        <div>
                          <label htmlFor="suburb" className="mb-1.5 block text-xs font-semibold text-slate-600">
                            Suburb
                          </label>
                          <Input
                            id="suburb"
                            value={s.suburb}
                            onChange={(e) => s.setSuburb(e.target.value)}
                            placeholder="e.g. Docklands"
                            className="h-11 border-slate-300 focus-visible:ring-brand"
                          />
                        </div>
                        <div>
                          <label htmlFor="postcode" className="mb-1.5 block text-xs font-semibold text-slate-600">
                            Postcode
                          </label>
                          <Input
                            id="postcode"
                            value={s.postcode}
                            inputMode="numeric"
                            maxLength={4}
                            onChange={(e) =>
                              s.setPostcode(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="3000"
                            className="h-11 border-slate-300 focus-visible:ring-brand"
                          />
                        </div>
                      </div>
                      <p className="mt-2.5 text-xs text-slate-400">
                        Default service area: Melbourne Metro — we also deliver
                        across Regional Victoria.
                      </p>
                    </motion.div>
                  )}

                  {/* ---------------- STEP 2 ---------------- */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <h3 className="flex items-center gap-2.5 text-lg font-bold text-navy">
                        <Ruler className="h-5 w-5 text-brand" />
                        How large is your floor plate?
                      </h3>

                      {/* Area display */}
                      <div className="mt-6 flex items-end justify-between">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <motion.span
                              key={s.floorArea}
                              initial={{ scale: 1.08, color: "#F97316" }}
                              animate={{ scale: 1, color: "#0F172A" }}
                              transition={{ duration: 0.3 }}
                              className="text-5xl font-extrabold tracking-tight"
                            >
                              {s.floorArea.toLocaleString()}
                            </motion.span>
                            <span className="text-lg font-semibold text-slate-400">
                              sqm
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            ≈ {Math.round(s.floorArea * 10.764).toLocaleString()} sq ft
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-navy">
                            {s.desks} desks
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {desksAuto ? "auto-suggested" : "manually set"}
                          </div>
                        </div>
                      </div>

                      <Slider
                        value={[s.floorArea]}
                        min={50}
                        max={3000}
                        step={10}
                        onValueChange={(v) => handleAreaChange(v[0])}
                        className="mt-6 [&_[data-slot=slider-range]]:bg-brand [&_[data-slot=slider-thumb]]:border-brand [&_[data-slot=slider-thumb]]:bg-white"
                        aria-label="Floor area in square metres"
                      />
                      <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
                        <span>50 sqm</span>
                        <span>1,000</span>
                        <span>2,000</span>
                        <span>3,000 sqm</span>
                      </div>

                      {/* Desk stepper */}
                      <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <Users className="h-5 w-5 text-brand" />
                            <div>
                              <div className="text-sm font-bold text-navy">
                                Desks / Workstations
                              </div>
                              <div className="text-xs text-slate-500">
                                Headcount drives booth counts &amp; density metrics
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 border-slate-300"
                              onClick={() => setDesksManual(s.desks - 1)}
                              aria-label="Remove one desk"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <input
                              value={s.desks}
                              onChange={(e) =>
                                setDesksManual(parseInt(e.target.value || "0", 10))
                              }
                              inputMode="numeric"
                              className="h-10 w-14 rounded-md border border-slate-300 text-center text-sm font-bold text-navy focus:outline-none focus:ring-2 focus:ring-brand"
                              aria-label="Number of desks"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 border-slate-300"
                              onClick={() => setDesksManual(s.desks + 1)}
                              aria-label="Add one desk"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Toggles */}
                      <h3 className="mt-8 text-lg font-bold text-navy">
                        Layout additions
                      </h3>
                      <div className="mt-3 grid grid-cols-1 gap-2.5">
                        {TOGGLE_META.map((t) => {
                          const on = s.toggles.includes(t.key);
                          return (
                            <div
                              key={t.key}
                              className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-all duration-200 ${
                                on
                                  ? "border-brand/50 bg-brand-soft"
                                  : "border-slate-200 bg-white"
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-navy">
                                  {t.label}
                                </div>
                                <div className="truncate text-xs text-slate-500">
                                  {t.blurb}
                                </div>
                              </div>
                              <div className="flex shrink-0 items-center gap-3">
                                <span className="hidden text-xs font-semibold text-brand-deep sm:block">
                                  +{formatAUD(t.low)}–{formatAUD(t.high)}
                                </span>
                                <Switch
                                  checked={on}
                                  onCheckedChange={() => s.toggle(t.key)}
                                  aria-label={`Toggle ${t.label}`}
                                  className="data-[state=checked]:bg-brand"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ---------------- STEP 3 ---------------- */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <h3 className="flex items-center gap-2.5 text-lg font-bold text-navy">
                        <Sparkles className="h-5 w-5 text-brand" />
                        Choose your finish level
                      </h3>
                      <div className="mt-5 grid grid-cols-1 gap-3">
                        {FINISH_META.map((f, i) => {
                          const active = s.finish === f.value;
                          const popular = i === 1;
                          return (
                            <button
                              key={f.value}
                              onClick={() => s.setFinish(f.value as FinishLevel)}
                              aria-pressed={active}
                              className={`relative min-w-0 rounded-xl border-2 p-4 text-left transition-all duration-200 sm:p-5 ${
                                active
                                  ? "border-brand bg-brand-soft shadow-md shadow-brand/10"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                                <div className="text-base font-bold text-navy">
                                  {f.label}
                                </div>
                                <div
                                  className={`rounded-full px-3 py-1 text-sm font-extrabold ${
                                    active
                                      ? "bg-brand text-white"
                                      : "bg-slate-100 text-charcoal"
                                  }`}
                                >
                                  ${f.low}–${f.high}
                                  <span className="text-xs font-medium opacity-80">
                                    /sqm
                                  </span>
                                </div>
                              </div>
                              <div className="mt-1.5 text-xs font-medium text-slate-500">
                                {f.blurb}
                              </div>
                              <ul className="mt-3 grid gap-1.5 text-xs text-slate-600 sm:grid-cols-2">
                                {f.inclusions.map((inc) => (
                                  <li key={inc} className="flex items-start gap-1.5">
                                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-brand" />
                                    {inc}
                                  </li>
                                ))}
                              </ul>
                              {popular && (
                                <span className="absolute -top-2.5 right-4 rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                                  Most Popular
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Nav footer */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep((v) => Math.max(1, v - 1))}
                  disabled={step === 1}
                  className="font-semibold text-slate-600 hover:text-navy"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Back
                </Button>
                <div className="text-xs font-semibold text-slate-400">
                  Step {step} of 3
                </div>
                {step < 3 ? (
                  <Button
                    onClick={() => setStep((v) => Math.min(3, v + 1))}
                    className="bg-navy font-semibold text-white hover:bg-charcoal"
                  >
                    Continue
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={onOpenLead}
                    className="bg-brand font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand-deep"
                  >
                    Lock In Budget
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Live hint under card (mobile-friendly) */}
            <p className="mt-4 text-center text-xs text-slate-400 lg:hidden">
              Current live estimate:{" "}
              <span className="font-bold text-navy">
                {formatAUD(estimate.budgetLow)} – {formatAUD(estimate.budgetHigh)}
              </span>{" "}
              · {estimate.durationLowWeeks}–{estimate.durationHighWeeks} weeks
            </p>
          </div>

          {/* ------------------------------ Output ------------------------------ */}
          <div className="lg:col-span-2">
            <OutputPanel onOpenLead={onOpenLead} />
          </div>
        </div>
      </div>
    </section>
  );
}
