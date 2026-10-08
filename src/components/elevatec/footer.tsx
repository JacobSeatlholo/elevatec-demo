"use client";

import { ArrowRight, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

/* Real sector list from elevatec.com.au "Sectors & Expertise" */
const SECTORS = [
  "Fitout and Workplace",
  "Education and Not-for-profit Sectors",
  "Multi-Unit Development",
  "Stakeholder Management",
  "Project Management and Relocation",
  "Strata Remedial Work",
];

export function Footer({ onOpenLead }: { onOpenLead: () => void }) {
  return (
    <footer id="contact" className="mt-auto bg-ink text-neutral-300" aria-label="Contact and footer">
      {/* Coverage banner */}
      <div className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center gap-3 text-center md:text-left">
            <MapPin className="h-5 w-5 shrink-0 text-brand" />
            <p className="text-sm font-semibold text-white">
              Servicing Metropolitan Melbourne &amp; Regional Victoria
              <span className="block text-xs font-normal text-neutral-400">
                CBD · Inner East · Bayside · West · North · South East · Geelong ·
                Ballarat · Bendigo
              </span>
            </p>
          </div>
          <Button
            onClick={onOpenLead}
            className="group h-11 bg-brand px-6 font-bold text-white transition-colors hover:bg-brand-deep"
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
            <img
              src="/brand/logo-white.svg"
              alt="Elevate Commercial Construction"
              className="h-11 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-neutral-400">
              Commercial construction specialists delivering the build, design,
              construction and project management of commercial spaces across
              Melbourne and Regional Victoria.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.linkedin.com/company/elevate-commercial-construction"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Elevate Commercial Construction on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-neutral-300 transition-colors hover:border-brand hover:text-brand"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/elevate_commercial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Elevate Commercial Construction on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-neutral-300 transition-colors hover:border-brand hover:text-brand"
              >
                <Instagram className="h-4 w-4" />
              </a>
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
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      Call us directly
                    </span>
                    <span className="block font-bold text-white group-hover:text-brand">
                      0401 933 088
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@elevatec.com.au"
                  className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all hover:border-brand/40 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/30">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      Email the team
                    </span>
                    <span className="block font-bold text-white group-hover:text-brand">
                      info@elevatec.com.au
                    </span>
                  </span>
                </a>
              </li>
              <li className="px-3 py-1 text-xs leading-relaxed text-neutral-400">
                Contact us to discuss a construction package that works for
                you — site inspections by appointment.
              </li>
            </ul>
          </div>

          {/* Sectors & Expertise */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Sectors &amp; Expertise
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SECTORS.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#calculator")}
                    className="text-left text-neutral-400 transition-colors hover:text-brand"
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
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Commercial Builder
                </span>
                <span className="block font-bold text-white">CCB-L 100313</span>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/5 p-3">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Domestic Builder (Unlimited)
                </span>
                <span className="block font-bold text-white">CB-U 41950</span>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/5 p-3">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  ISO Certification Partner Global
                </span>
                <span className="block font-bold text-white">
                  ISO 9001 · 14001 · 45001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — real legal entity line from elevatec.com.au */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="max-w-xl text-center text-[11px] leading-relaxed text-neutral-500 sm:text-left">
            O&rsquo;Callaghan Building and Maintenance Pty Ltd trading as
            Elevate Commercial Construction is a registered commercial (CCB-L
            100313) and unlimited domestic (CB-U 41950) builder.
          </p>
          <p className="text-[11px] text-neutral-500">
            © {new Date().getFullYear()} Elevate Commercial Construction. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
