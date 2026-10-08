"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  GraduationCap,
  Ruler,
  Stethoscope,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Category = "office" | "medical" | "education";

interface Project {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  location: string;
  image: string;
  summary: string;
  before: string;
  after: string;
  stats: { sqm: string; duration: string; budgetBand: string; delivered: string };
}

const PROJECTS: Project[] = [
  {
    id: "workplace-hq",
    title: "Workplace HQ",
    category: "office",
    categoryLabel: "Commercial Office",
    location: "Collins Street, Melbourne CBD",
    image: "/images/project-hq.png",
    summary:
      "A full-floor agile workplace for a professional services tenant — custom timber joinery, acoustic meeting suites and a client-facing reception with skyline presence.",
    before:
      "Tired 1990s tenancy with cellular offices, suspended ceiling grid, poor daylight penetration and dated amenities core.",
    after:
      "Open agile workfloor with 62 sit-stand workstations, 3 acoustic meeting pods, executive boardroom with full AV, and a terrazzo reception tailored for client hosting.",
    stats: {
      sqm: "1,240 sqm",
      duration: "11 weeks",
      budgetBand: "Executive / Architectural",
      delivered: "Delivered 2 days ahead of program",
    },
  },
  {
    id: "ingenia",
    title: "Ingenia Lifestyles Refurbishment",
    category: "office",
    categoryLabel: "Community & Workplace",
    location: "Ingenia Community, Outer Melbourne",
    image: "/images/project-ingenia.png",
    summary:
      "Staged refurbishment of resident community and administration facilities for a lifestyle village operator — delivered while the site remained fully operational.",
    before:
      "Worn carpet, single-glazed joinery, dim fluorescent lighting and a disconnected admin suite with no accessible entry.",
    after:
      "Refurbished resident lounge and function areas, DDA-compliant entry and amenities, new engineered timber flooring, LED lighting upgrade and modernised admin hub.",
    stats: {
      sqm: "860 sqm",
      duration: "9 weeks (3 stages)",
      budgetBand: "Standard Commercial",
      delivered: "Zero disruption to resident operations",
    },
  },
  {
    id: "sunshine-allied-health",
    title: "Sunshine Allied Health",
    category: "medical",
    categoryLabel: "Allied Health / Medical",
    location: "Sunshine, Western Melbourne",
    image: "/images/project-sunshine.png",
    summary:
      "Turnkey fitout of a multi-discipline allied health clinic — 6 consult rooms, treatment spaces, accessible amenities and a calm, welcoming reception.",
    before:
      "Vacant shell with basic builder's finish, no mechanical separation, non-compliant amenities and limited accessible access.",
    after:
      "6 consult rooms, 2 treatment suites, audiology-tested acoustic separation, DDA amenities, nurse call provision and fully compliant clinical finishes.",
    stats: {
      sqm: "420 sqm",
      duration: "7 weeks",
      budgetBand: "High-End / Turnkey",
      delivered: "AHFG-aligned compliance handover",
    },
  },
  {
    id: "northern-school",
    title: "Northern School Learning Hub",
    category: "education",
    categoryLabel: "Educational / NFP",
    location: "Northern Metropolitan Melbourne",
    image: "/images/project-school.png",
    summary:
      "Purpose-built learning support hub for a specialist school community — sensory-aware acoustics, robust finishes and secure, supervised circulation.",
    before:
      "Relocatable classrooms with poor thermal comfort, exposed cabling and no acoustic separation between learning spaces.",
    after:
      "Two flexible learning studios, sensory room, staff resource centre, acoustic wall systems and secure monitored entry configured for specialist supervision.",
    stats: {
      sqm: "610 sqm",
      duration: "12 weeks (term break window)",
      budgetBand: "Standard Commercial",
      delivered: "Handed over before term commencement",
    },
  },
];

const FILTERS: { key: "all" | Category; label: string; icon?: React.ReactNode }[] = [
  { key: "all", label: "All Projects" },
  { key: "office", label: "Office", icon: <Building2 className="h-4 w-4" /> },
  { key: "medical", label: "Medical", icon: <Stethoscope className="h-4 w-4" /> },
  { key: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Escape-to-close + body scroll lock while the case study is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl scrollbar-thin"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-navy/60 text-white backdrop-blur transition-colors hover:bg-navy"
          aria-label="Close case study"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-56 w-full overflow-hidden sm:h-72">
          <img
            src={project.image}
            alt={`${project.title} — completed fitout`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge className="bg-brand text-white hover:bg-brand">
              {project.categoryLabel}
            </Badge>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="text-sm text-slate-300">{project.location}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {project.summary}
          </p>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: <Ruler className="h-4 w-4" />, label: "Area", value: project.stats.sqm },
              {
                icon: <CalendarDays className="h-4 w-4" />,
                label: "Timeline",
                value: project.stats.duration,
              },
              {
                icon: <Building2 className="h-4 w-4" />,
                label: "Spec",
                value: project.stats.budgetBand,
              },
              {
                icon: <ArrowUpRight className="h-4 w-4" />,
                label: "Outcome",
                value: project.stats.delivered,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-deep">
                  {s.icon}
                  {s.label}
                </div>
                <div className="mt-1.5 text-xs font-bold leading-snug text-navy">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Before / After */}
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-black text-slate-600">
                  B
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Before
                </h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {project.before}
              </p>
            </div>
            <div className="rounded-xl border border-brand/40 bg-brand-soft p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-black text-white">
                  A
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wide text-brand-deep">
                  After
                </h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {project.after}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                onClose();
                document
                  .querySelector("#calculator")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-12 flex-1 bg-brand font-bold text-white hover:bg-brand-deep"
            >
              Estimate a Similar Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onClose();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-12 flex-1 border-slate-300 font-semibold text-charcoal hover:bg-slate-50"
            >
              Book On-Site Audit
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="portfolio"
      className="bg-slate-50 py-20 lg:py-28"
      aria-label="Featured fitout portfolio"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand ring-1 ring-navy">
            Proven Delivery
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Featured Fitouts &amp; Case Studies
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Real projects across Melbourne — explore the before, the after,
            and the numbers behind each handover.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                filter === f.key
                  ? "bg-navy text-white shadow-lg shadow-navy/20"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 hover:text-navy"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-200/70 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                onClick={() => setSelected(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p);
                  }
                }}
                aria-label={`Open ${p.title} case study`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.categoryLabel} fitout in ${p.location}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <Badge className="absolute left-4 top-4 bg-white/90 text-navy hover:bg-white">
                    {p.categoryLabel}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-extrabold tracking-tight text-white">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-300">{p.location}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex gap-4 text-xs font-semibold text-slate-500">
                      <span>{p.stats.sqm}</span>
                      <span>{p.stats.duration}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-deep">
                      View Case Study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
