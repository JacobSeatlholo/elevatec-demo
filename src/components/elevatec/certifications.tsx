"use client";

import { motion } from "framer-motion";
import { BadgeCheck, FileCheck2, ShieldCheck } from "lucide-react";

/* Real certification data from elevatec.com.au/certification-governance */
const ISO_CERTS = [
  {
    standard: "ISO 9001:2015",
    label: "Quality Management System",
    cert: "QMS/15/R61/1610",
  },
  {
    standard: "ISO 14001:2015",
    label: "Environmental Management System",
    cert: "EMS/2/R61/1610",
  },
  {
    standard: "ISO 45001:2018",
    label: "Occupational Health & Safety",
    cert: "EMS/2/R61/1610",
  },
];

const REGISTRATIONS = [
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    label: "Commercial Construction",
    value: "CCB-L 100313",
    note: "Registered through the Building and Plumbing Commission",
  },
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    label: "Domestic Construction",
    value: "CB-U 41950",
    note: "Unlimited domestic builder registration",
  },
  {
    icon: <FileCheck2 className="h-5 w-5" />,
    label: "VIC Government Construction Supply Register",
    value: "No. 904351",
    note: "Approved government supplier",
  },
  {
    icon: <FileCheck2 className="h-5 w-5" />,
    label: "Fair Jobs Code Pre-Assessment",
    value: "FJC-250618-7094",
    note: "Certified fair employment practices",
  },
];

export function Certifications() {
  return (
    <section
      id="certification"
      className="border-y border-neutral-200 bg-white py-20 lg:py-24"
      aria-label="Certification and governance"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: heading + ISO certs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="kicker text-brand">Certification &amp; Governance</p>
            <h2 className="display-tight mt-4 text-3xl text-ink sm:text-4xl">
              Audited systems. Verifiable credentials.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-smoke">
              Elevate maintains ISO accreditation through Certification
              Partner Global, underpinned by JAS-ANZ accreditation —
              reinforcing our commitment to quality, safety and continuous
              improvement across all areas of our business and construction
              delivery.
            </p>

            {/* Real accreditation badges */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-paper px-4 py-3">
                <img
                  src="/brand/jas-anz.png"
                  alt="JAS-ANZ accreditation mark"
                  className="h-10 w-auto"
                />
                <span className="text-[11px] font-semibold leading-tight text-neutral-500">
                  JAS-ANZ
                  <span className="block text-neutral-400">
                    Accredited certification
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-paper px-4 py-3">
                <img
                  src="/brand/cpg.png"
                  alt="Certification Partner Global logo"
                  className="h-9 w-auto"
                />
                <span className="text-[11px] font-semibold leading-tight text-neutral-500">
                  Certification Partner Global
                  <span className="block text-neutral-400">
                    ISO 9001 · 14001 · 45001
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: real cert + registration table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* ISO standards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {ISO_CERTS.map((c) => (
                <div
                  key={c.standard}
                  className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-brand/50"
                >
                  <ShieldCheck className="h-5 w-5 text-brand" />
                  <div className="mt-3 text-sm font-extrabold text-ink">
                    {c.standard}
                  </div>
                  <div className="mt-0.5 text-xs leading-snug text-smoke">
                    {c.label}
                  </div>
                  <div className="mt-3 border-t border-dashed border-neutral-200 pt-2.5 font-mono text-[11px] tracking-tight text-neutral-500">
                    Cert. {c.cert}
                  </div>
                </div>
              ))}
            </div>

            {/* Registrations */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {REGISTRATIONS.map((r) => (
                <div
                  key={r.label}
                  className="flex items-start gap-3 rounded-lg bg-ink p-4 text-white"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand/15 text-brand ring-1 ring-brand/30">
                    {r.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {r.label}
                    </div>
                    <div className="mt-0.5 text-base font-extrabold tracking-tight text-brand">
                      {r.value}
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-neutral-400">
                      {r.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-neutral-400">
              We create safer, smarter construction sites — site OH&amp;S is
              managed through the Breadcrumb platform, and every project
              operates under our certified ISO 45001 occupational health and
              safety system.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
