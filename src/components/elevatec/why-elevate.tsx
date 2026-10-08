"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Handshake, RefreshCcw, ShieldCheck } from "lucide-react";

/* Copy grounded in elevatec.com.au/about — real positioning, real language. */
const PILLARS = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Integrity & Transparent Communication",
    body: "We have built a strong reputation for integrity, transparent communication and collaborative partnerships with clients, consultants and industry professionals — the reason so much of our work is repeat business.",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: "Tailored Delivery Solutions Models",
    body: "With extensive experience across operational sites, we develop tailored delivery models that maintain business continuity while still achieving project outcomes. Your organisation keeps working while we build around it.",
  },
  {
    icon: <RefreshCcw className="h-6 w-6" />,
    title: "Turnkey, In-House Capability",
    body: "Our turnkey capabilities combine in-house design, construction expertise and workplace relocation management to streamline processes and consistently deliver high-quality, trusted results — one accountable team from first sketch to handover.",
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: "Fully Invested, Accountable Delivery",
    body: "Our values underpin every project we undertake. We are fully invested, accountable and committed to leading with professionalism and emotional intelligence throughout the construction process.",
  },
];

/* The six real Delivery Platforms published on elevatec.com.au */
const DELIVERY_PLATFORMS = [
  "Turn Key Design and Delivery Solutions",
  "Early Contractor Engagement",
  "Project and Programme Management",
  "Pre Cost Estimates",
  "Fit Out Construction (Lump Sum or Open Book)",
  "Workplace Relocation",
];

const PROCESS = [
  {
    step: "01",
    title: "Estimate",
    body: "Frame your budget range and lead time with the 60-second calculator — the same pre-cost estimate discipline we bring to ECI engagements.",
  },
  {
    step: "02",
    title: "On-Site Audit",
    body: "A free measured site audit covering services, structure, compliance risks and opportunities across your Melbourne site.",
  },
  {
    step: "03",
    title: "Detailed Scope & Fixed Price",
    body: "Design coordination, itemised scope and a fixed-price commitment you can take to your board or committee.",
  },
  {
    step: "04",
    title: "Build & Handover",
    body: "Weekly reporting, ISO 45001-audited site safety, defects-free practical completion and occupancy sign-off.",
  },
];

export function WhyElevate() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-ink py-20 text-white lg:py-28"
      aria-label="Why choose Elevate"
    >
      <div className="plan-grid absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="kicker text-brand">About Elevate</p>
            <h2 className="display-tight mt-4 text-3xl sm:text-5xl">
              A Victorian builder with over 25 years in the industry.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-300 sm:text-lg">
              Elevate Commercial Construction is a Victorian-based commercial
              builder with over 25 years of experience. Our approach is
              grounded in delivering tailored solutions that respond to the
              unique needs and objectives of each client and project — across
              workplace, retail, health, education and community assets.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:text-lg">
              Our extensive industry partnerships across a diverse range of
              asset classes provide depth of knowledge and technical
              capability, enabling us to successfully deliver complex and
              specialised projects. At the core of our success are
              long-standing client relationships, reflected in the high level
              of repeat business we consistently achieve.
            </p>

            {/* Real delivery platforms */}
            <h3 className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
              Our Delivery Platforms
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {DELIVERY_PLATFORMS.map((p, i) => (
                <li
                  key={p}
                  className="flex items-center gap-3 border-b border-white/10 pb-2.5 text-sm font-medium text-neutral-200"
                >
                  <span className="text-xs font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pillars */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-brand/40 hover:bg-white/[0.08]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/15 text-brand ring-1 ring-brand/30">
                  {p.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process timeline */}
        <div className="mt-20">
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
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
                className="relative rounded-xl bg-ink-soft/90 p-5 ring-1 ring-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-sm font-black text-white">
                  {s.step}
                </div>
                <h4 className="mt-4 flex items-center gap-2 text-base font-bold">
                  {s.title}
                  {i === 1 && <ClipboardCheck className="h-4 w-4 text-brand" />}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
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
