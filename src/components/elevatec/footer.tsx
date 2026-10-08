"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export function Footer({ onOpenLead }: { onOpenLead: () => void }) {
  return (
    <footer id="contact" className="mt-auto bg-charcoal text-slate-300" aria-label="Contact and footer">
      {/* Coverage banner */}
      <div className="border-b border-white/10 bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center gap-3 text-center md:text-left">
            <MapPin className="h-5 w-5 shrink-0 text-brand" />
            <p className="text-sm font-semibold text-white">
              Servicing Metropolitan Melbourne &amp; Regional Victoria
              <span className="block text-xs font-normal text-slate-400">
                CBD · Inner East · Bayside · West · North · Geelong · Ballarat · Bendigo
              </span>
            </p>
          </div>
          <Button
            onClick={onOpenLead}
            className="group h-11 bg-brand px-6 font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand-deep"
          >
            Book On-Site Audit
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                <span className="text-xl font-extrabold tracking-tighter text-white">
                  E
                  <svg width="11" height="11" viewBox="0 0 10 10" className="ml-[1px] -translate-y-[8px] inline-block">
                    <path d="M2 9L8 1" stroke="#F97316" strokeWidth="2.4" />
                  </svg>
                </span>
              </div>
              <div className="leading-tight">
                <div className="text-base font-extrabold tracking-tight text-white">
                  ELEVATE
                </div>
                <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  Commercial Construction
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Precision commercial fitouts and workplace solutions, delivered
              with ISO-certified quality, environmental and safety systems
              across Melbourne and Regional Victoria.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["ISO 9001", "ISO 14001", "ISO 45001"].map((iso) => (
                <span
                  key={iso}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-300"
                >
                  <ShieldCheck className="h-3 w-3 text-brand" />
                  {iso}
                </span>
              ))}
            </div>
          </div>

          {/* Direct contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Talk to a Builder
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href="tel:0401933088"
                  className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all hover:border-brand/40 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/30">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Call Tim directly
                    </span>
                    <span className="block font-bold text-white group-hover:text-brand">
                      0401 933 088
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Tim@elevatec.com.au"
                  className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all hover:border-brand/40 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/30">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Email the team
                    </span>
                    <span className="block font-bold text-white group-hover:text-brand">
                      Tim@elevatec.com.au
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 px-3 py-1">
                <Clock className="h-4 w-4 shrink-0 text-slate-500" />
                <span className="text-xs text-slate-400">
                  Mon – Fri, 7:00am – 5:00pm AEST · Site inspections by
                  appointment
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Sectors We Deliver
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                "Commercial Office Fitouts",
                "Retail & Hospitality",
                "Allied Health & Medical",
                "Educational & NFP Facilities",
                "Refurbishments & Make-Goods",
                "Defect Rectification & Compliance",
              ].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#calculator")}
                    className="text-slate-400 transition-colors hover:text-brand"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Credentials
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-lg border border-white/10 bg-white/5 p-3">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Registered Building Practitioner
                </span>
                <span className="block font-bold text-white">CCB-L 100313</span>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/5 p-3">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Commercial Builder Registration
                </span>
                <span className="block font-bold text-white">CB-U 41950</span>
              </li>
              <li className="px-1 text-xs leading-relaxed text-slate-400">
                Head office: Melbourne, VIC — delivering projects
                state-wide with local trade networks.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Elevate Commercial Construction. All
            rights reserved. ABN-registered, fully insured builder.
          </p>
          <p className="text-xs text-slate-500">
            Estimates are indicative &amp; exclude GST. Final pricing via
            fixed-price contract.
          </p>
        </div>
      </div>
    </footer>
  );
}
