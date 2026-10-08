"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Calculator, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Calculator", href: "#calculator" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Elevate", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/20"
          : "bg-navy/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label="Elevate Commercial Construction home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-soft ring-1 ring-white/15">
            <span className="text-lg font-extrabold tracking-tighter text-white">
              E
              <svg width="10" height="10" viewBox="0 0 10 10" className="ml-[1px] -translate-y-[7px] inline-block">
                <path d="M2 9L8 1" stroke="#F97316" strokeWidth="2.4" />
              </svg>
            </span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight text-white">
              ELEVATE
            </div>
            <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Commercial Construction
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:0401933088"
            className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4 text-brand" />
            0401 933 088
          </a>
          <Button
            onClick={() => scrollTo("#calculator")}
            className="bg-brand font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-deep"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Start Calculator
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-white/10 bg-navy/95 px-4 py-4 backdrop-blur-md md:hidden"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full rounded-md px-3 py-3 text-left text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              {l.label}
            </button>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <a
              href="tel:0401933088"
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4 text-brand" /> 0401 933 088
            </a>
            <Button
              onClick={() => scrollTo("#calculator")}
              className="bg-brand font-semibold text-white hover:bg-brand-deep"
            >
              Start Fitout Calculator
            </Button>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
