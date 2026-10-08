"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Fitout Calculator", href: "#calculator" },
  { label: "Projects", href: "#portfolio" },
  { label: "Why Elevate", href: "#why" },
  { label: "Certification", href: "#certification" },
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
          ? "bg-ink/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Real Elevate lockup (white version for dark header) */}
        <a
          href="#top"
          className="flex items-center"
          aria-label="Elevate Commercial Construction home"
        >
          <img
            src="/brand/logo-white.svg"
            alt="Elevate Commercial Construction"
            className="h-9 w-auto sm:h-10"
          />
        </a>

        {/* Desktop links */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="px-3.5 py-2 text-[13px] font-semibold tracking-wide text-neutral-300 transition-colors hover:text-brand"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:0401933088"
            className="group flex items-center gap-2 text-sm font-bold text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/40 transition-colors group-hover:bg-brand group-hover:text-white">
              <Phone className="h-3.5 w-3.5 text-brand group-hover:text-white" />
            </span>
            0401 933 088
          </a>
          <Button
            onClick={() => scrollTo("#calculator")}
            className="h-10 bg-brand px-5 text-sm font-bold tracking-wide text-white transition-colors hover:bg-brand-deep"
          >
            Get an Estimate
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
          className="border-t border-white/10 bg-ink/98 px-4 py-4 backdrop-blur-md md:hidden"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full rounded-md px-3 py-3 text-left text-sm font-semibold text-neutral-200 hover:bg-white/5 hover:text-brand"
            >
              {l.label}
            </button>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <a
              href="tel:0401933088"
              className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4 text-brand" /> 0401 933 088
            </a>
            <Button
              onClick={() => scrollTo("#calculator")}
              className="bg-brand font-bold text-white hover:bg-brand-deep"
            >
              Get an Estimate
            </Button>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
