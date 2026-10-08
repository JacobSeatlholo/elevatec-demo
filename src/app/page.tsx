"use client";

import { useState } from "react";
import { Navbar } from "@/components/elevatec/navbar";
import { Hero } from "@/components/elevatec/hero";
import { ClientStrip } from "@/components/elevatec/client-strip";
import { Calculator } from "@/components/elevatec/calculator";
import { LeadDialog } from "@/components/elevatec/lead-dialog";
import { Portfolio } from "@/components/elevatec/portfolio";
import { WhyElevate } from "@/components/elevatec/why-elevate";
import { Certifications } from "@/components/elevatec/certifications";
import { Footer } from "@/components/elevatec/footer";

export default function Home() {
  const [leadOpen, setLeadOpen] = useState(false);
  const openLead = () => setLeadOpen(true);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ClientStrip />
        <Calculator onOpenLead={openLead} />
        <Portfolio />
        <WhyElevate />
        <Certifications />
      </main>
      <Footer onOpenLead={openLead} />
      <LeadDialog open={leadOpen} onOpenChange={setLeadOpen} />
    </div>
  );
}
