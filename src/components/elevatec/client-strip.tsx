"use client";

const CLIENTS = [
  { name: "The Salvation Army", src: "/clients/salvation-army.png" },
  { name: "JLL", src: "/clients/jll.png" },
  { name: "Regis Aged Care", src: "/clients/regis-aged-care.png" },
  { name: "Development Victoria", src: "/clients/development-victoria.png" },
  { name: "Greater Western Water", src: "/clients/greater-western-water.png" },
  { name: "Presbyterian Ladies' College", src: "/clients/plc.jpg" },
  { name: "Ingenia Lifestyle", src: "/clients/ingenia.png" },
  { name: "NDIS", src: "/clients/ndis.png" },
  { name: "Northern School of Autism", src: "/clients/northern-school-autism.png" },
  { name: "Forest Hill College", src: "/clients/forest-hill-college.png" },
  { name: "Good Shepherd School", src: "/clients/good-shepparton-school.png" },
  { name: "Link Health", src: "/clients/link-health.png" },
  { name: "ClickView", src: "/clients/clickview.png" },
  { name: "Volleyball Warehouse", src: "/clients/volleyball-warehouse.png" },
];

export function ClientStrip() {
  return (
    <section
      className="border-b border-neutral-200 bg-paper py-10"
      aria-label="Clients delivered for"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="kicker mb-7 text-center text-neutral-500">
          Trusted by government, education, health &amp; community organisations
          across Victoria
        </p>
      </div>
      <div className="relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent" />
        <div className="marquee-track flex w-max items-center gap-14 px-7">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <img
              key={`${c.name}-${i}`}
              src={c.src}
              alt={`${c.name} logo`}
              title={c.name}
              loading={i >= CLIENTS.length ? "lazy" : "eager"}
              className="h-9 w-auto max-w-[130px] object-contain opacity-45 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
