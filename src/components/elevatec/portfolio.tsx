"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ClipboardList,
  GraduationCap,
  HardHat,
  Stethoscope,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Category = "workplace" | "community" | "education";

interface Project {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  sector: string;
  client: string;
  deliverMode: string;
  region: string;
  image: string;
  summary: string;
  scope: string[];
  highlights: string[];
}

/* All project data below is sourced verbatim from elevatec.com.au
   feature project pages — real clients, real sectors, real delivery modes. */
const PROJECTS: Project[] = [
  {
    id: "workplace-hq",
    title: "Workplace HQ",
    category: "workplace",
    categoryLabel: "Workplace Fitout",
    sector: "Workplace Fit out",
    client: "The Salvation Army",
    deliverMode: "Base Build & Fit Out Construction, Workplace Relocation",
    region: "Melbourne, VIC",
    image: "/projects/workplace-hq.jpg",
    summary:
      "A bespoke workplace environment for The Salvation Army Corporate Headquarters — tailored office and workspace solutions supporting diverse operational requirements and service delivery models.",
    scope: [
      "Delivered a bespoke workplace environment for The Salvation Army Corporate Headquarters",
      "Designed tailored office and workspace solutions to support diverse operational requirements and service delivery models",
      "Developed adaptable front-of-house areas to enable flexible and multi-functional use",
    ],
    highlights: [
      "Led comprehensive stakeholder engagement to deliver customised fit-out solutions aligned with each service platform",
      "Successfully delivered base build and fit-out works within a live environment, minimising operational disruption while maximising efficiency",
    ],
  },
  {
    id: "allied-health-sunshine",
    title: "Allied Health Sunshine",
    category: "community",
    categoryLabel: "Health & Community",
    sector: "Not-for-Profit Allied Health",
    client: "The Salvation Army",
    deliverMode: "Fit Out Construction & Workplace Relocation",
    region: "Sunshine, VIC",
    image: "/projects/allied-health-sunshine.jpg",
    summary:
      "Unique health, wellbeing and community service environments — a base build and fit-out that repurposed the property for multidisciplinary service delivery.",
    scope: [
      "Delivered unique health, wellbeing, and community service environments",
      "Completed base build and fit-out works to repurpose the property for multidisciplinary service delivery",
      "Implemented intricate design solutions to create a welcoming wellbeing environment while maintaining safe and secure spaces",
    ],
    highlights: [
      "Integrated acoustic treatments and access control systems to support privacy, security and efficient daily workflows",
      "Managed relocation services, including furniture coordination and space planning tailored to each multidisciplinary function",
    ],
  },
  {
    id: "ingenia-lifestyles",
    title: "Refurbishment of Ingenia Lifestyles Community Living",
    category: "community",
    categoryLabel: "Strata Remedial",
    sector: "Strata Remedial Works",
    client: "Ingenia Lifestyles",
    deliverMode: "Project & Programme Management, Pre-Cost Estimates, Fit Out Construction",
    region: "Lara, VIC",
    image: "/projects/ingenia-lakeside.jpg",
    summary:
      "Building upgrades and compliance reporting for a lifestyle community operator — complex rectification works staged to minimise disruption to residents.",
    scope: [
      "Delivered building upgrades and compliance reporting, including mitigation strategies to support long-term asset protection",
      "Undertook comprehensive built-form upgrades and associated civil infrastructure works",
      "Developed detailed programming, staging methodologies and coordinated scheduling across multiple buildings and external areas",
    ],
    highlights: [
      "Managed complex staging of rectification works to minimise disruption to residents",
      "Pre-cost estimates prepared ahead of construction to give the client budget certainty before commitment",
    ],
  },
  {
    id: "social-community-housing",
    title: "Social & Community Housing",
    category: "community",
    categoryLabel: "Multi-Unit Residential",
    sector: "Multi-Unit Residential",
    client: "The Salvation Army × Housing Victoria",
    deliverMode: "Turn Key Design & Delivery Solutions",
    region: "Melbourne, VIC",
    image: "/projects/social-housing.jpg",
    summary:
      "Turnkey construction of the Silver Leaf accessible housing development supporting youth accommodation — architecturally designed townhomes within connected community spaces.",
    scope: [
      "Delivered turnkey construction of Silver Leaf accessible housing to support youth accommodation",
      "Developed architecturally designed townhomes integrated within thoughtfully planned and connected community spaces",
      "Accessible design applied across the development from entry through to amenities",
    ],
    highlights: [
      "Collaborated closely with Housing Victoria and The Salvation Army to identify stakeholder requirements and ensure these needs were effectively incorporated",
      "Turnkey handover — from design coordination through to construction delivery",
    ],
  },
  {
    id: "capital-works-plc",
    title: "Capital Works Projects",
    category: "education",
    categoryLabel: "Education",
    sector: "Education",
    client: "Presbyterian Ladies' College",
    deliverMode: "Turn Key Design & Delivery, Pre-Cost Estimates, Early Contractor Engagement",
    region: "Melbourne, VIC",
    image: "/projects/capital-works.jpg",
    summary:
      "Infrastructure, civil, landscaping, education and sports facility works delivered across a large and active campus — as PLC's trusted Early Contractor Engagement partner.",
    scope: [
      "Delivered infrastructure, civil, landscaping, education and sports facility works across the campus",
      "Provided turnkey delivery of a new hospitality and sports amenities building",
      "Led comprehensive stakeholder management to ensure efficient and coordinated delivery across a large and active site",
    ],
    highlights: [
      "Engaged under an ECI as PLC's trusted partner to deliver cost and design solutions that facilitate project success",
      "Repeatedly proven ability to deliver works within a live school environment, maintaining strict safety, security and governance protocols",
    ],
  },
];

const FILTERS: {
  key: "all" | Category;
  label: string;
  icon?: React.ReactNode;
}[] = [
  { key: "all", label: "All Projects" },
  { key: "workplace", label: "Workplace", icon: <Building2 className="h-4 w-4" /> },
  { key: "community", label: "Community & Health", icon: <Stethoscope className="h-4 w-4" /> },
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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project detail`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl scrollbar-thin"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-ink"
          aria-label="Close project detail"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-56 w-full overflow-hidden sm:h-72">
          <img
            src={project.image}
            alt={`${project.title} — delivered by Elevate Commercial Construction`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge className="bg-brand text-white hover:bg-brand">
              {project.categoryLabel}
            </Badge>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-300">{project.region}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
            {project.summary}
          </p>

          {/* Real project facts */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                icon: <Building2 className="h-4 w-4" />,
                label: "Client",
                value: project.client,
              },
              {
                icon: <ClipboardList className="h-4 w-4" />,
                label: "Sector",
                value: project.sector,
              },
              {
                icon: <HardHat className="h-4 w-4" />,
                label: "Delivery Mode",
                value: project.deliverMode,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-neutral-200 bg-paper p-3"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-deep">
                  {s.icon}
                  {s.label}
                </div>
                <div className="mt-1.5 text-xs font-bold leading-snug text-ink">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Scope / Highlights */}
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-xs font-black text-neutral-600">
                  S
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-500">
                  Scope of Works
                </h4>
              </div>
              <ul className="mt-3 space-y-2.5">
                {project.scope.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-neutral-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-brand/40 bg-brand-soft p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-black text-white">
                  H
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wide text-brand-deep">
                  Delivery Highlights
                </h4>
              </div>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
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
              className="h-12 flex-1 border-neutral-300 font-semibold text-coal hover:bg-paper"
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
      className="bg-paper py-20 lg:py-28"
      aria-label="Featured construction and fitout projects"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="kicker text-brand">Feature Projects</p>
          <h2 className="display-tight mt-4 text-3xl text-ink sm:text-5xl">
            Delivered for organisations that can&apos;t afford downtime.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-smoke sm:text-lg">
            Real projects for real clients — corporate headquarters, allied
            health services, community housing and live school campuses across
            Melbourne and Regional Victoria.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mt-9 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                filter === f.key
                  ? "bg-ink text-white shadow-lg shadow-black/15"
                  : "bg-white text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100 hover:text-ink"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md shadow-black/5 ring-1 ring-neutral-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                onClick={() => setSelected(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p);
                  }
                }}
                aria-label={`Open ${p.title} project detail`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.categoryLabel} project in ${p.region}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <Badge className="absolute left-4 top-4 bg-white/90 text-ink hover:bg-white">
                    {p.categoryLabel}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-extrabold leading-tight tracking-tight text-white">
                      {p.title}
                    </h3>
                    <p className="text-xs text-neutral-300">{p.region}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
                    <div className="flex flex-col text-xs font-semibold text-neutral-500">
                      <span>{p.client}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-deep">
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
