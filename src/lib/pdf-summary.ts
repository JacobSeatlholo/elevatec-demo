"use client";

import { jsPDF } from "jspdf";
import {
  estimateFitout,
  FINISH_META,
  formatAUDFull,
  PROPERTY_META,
  type FitoutInput,
} from "@/lib/fitout";

/**
 * Builds a branded one-page PDF summary of the fitout estimate breakdown.
 * Called client-side from the confirmation modal so the user instantly
 * receives a downloadable copy of what they calculated.
 */
export function downloadEstimatePDF(input: FitoutInput, reference?: string) {
  const est = estimateFitout(input);
  const property = PROPERTY_META.find((p) => p.value === input.propertyType)!;
  const finish = FINISH_META.find((f) => f.value === input.finish)!;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const NAVY: [number, number, number] = [10, 10, 10];
  const BRAND: [number, number, number] = [242, 103, 34];
  const GREY: [number, number, number] = [90, 90, 95];
  const LINE: [number, number, number] = [228, 226, 223];

  /* Header band ------------------------------------------------------ */
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 34, "F");
  doc.setFillColor(...BRAND);
  doc.rect(0, 34, W, 1.6, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("ELEVATE", 14, 15);
  doc.setFontSize(14);
  doc.setTextColor(...BRAND);
  doc.text("COMMERCIAL CONSTRUCTION", 52, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(185, 180, 175);
  doc.text(
    "Precision Commercial Fitouts & Workplace Solutions | Melbourne, VIC",
    14,
    22
  );
  doc.text("m 0401 933 088  |  info@elevatec.com.au  |  elevatec.com.au", 14, 27.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND);
  if (reference) doc.text(`REF: ${reference}`, W - 14, 15, { align: "right" });
  doc.setTextColor(185, 180, 175);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`,
    W - 14,
    21,
    { align: "right" }
  );
  doc.text("ISO 9001 | 14001 | 45001", W - 14, 27.5, { align: "right" });

  /* Title ------------------------------------------------------------ */
  let y = 46;
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Fitout Budget Estimate Summary", 14, y);
  y += 6;
  doc.setDrawColor(...BRAND);
  doc.setLineWidth(0.8);
  doc.line(14, y, 66, y);

  /* Scope block ------------------------------------------------------ */
  y += 9;
  doc.setFontSize(8);
  doc.setTextColor(...GREY);
  doc.text("SCOPE OF WORK", 14, y);
  doc.setFontSize(10.5);
  doc.setTextColor(...NAVY);
  y += 6;
  const scopeLines: [string, string][] = [
    ["Property Type", property.label],
    ["Location", `${input.suburb || "—"}, VIC ${input.postcode || "—"}`],
    ["Floor Area", `${input.floorArea.toLocaleString()} sqm`],
    ["Workstations", `${input.desks} desks`],
    ["Finish Level", `${finish.label} (${finish.low}–${finish.high} $/sqm)`],
    [
      "Layout Additions",
      est.toggleLines.length
        ? est.toggleLines
            .map((t) => `${t.label}${t.qty > 1 ? ` ×${t.qty}` : ""}`)
            .join(", ")
        : "None selected",
    ],
  ];
  scopeLines.forEach(([k, v]) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GREY);
    doc.text(k, 14, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(v, 62, y, { maxWidth: W - 80 });
    y += 6.4;
  });

  /* Budget block ----------------------------------------------------- */
  y += 3;
  doc.setFillColor(246, 245, 243);
  doc.roundedRect(14, y, W - 28, 30, 2.5, 2.5, "F");
  y += 9;
  doc.setFontSize(8);
  doc.setTextColor(...GREY);
  doc.text("ESTIMATED BUDGET RANGE (AUD)", 20, y);
  doc.text("EST. CONSTRUCTION DURATION", W / 2 + 6, y);
  y += 9;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...BRAND);
  doc.text(
    `${formatAUDFull(est.budgetLow)} – ${formatAUDFull(est.budgetHigh)}`,
    20,
    y
  );
  doc.setTextColor(...NAVY);
  doc.text(`${est.durationLowWeeks}–${est.durationHighWeeks} weeks`, W / 2 + 6, y);
  y += 14;

  /* Breakdown table -------------------------------------------------- */
  doc.setFontSize(8);
  doc.setTextColor(...GREY);
  doc.text("COST BREAKDOWN", 14, y);
  y += 4;
  doc.setDrawColor(...LINE);
  doc.line(14, y, W - 14, y);
  y += 6;

  const row = (label: string, value: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(...(bold ? NAVY : GREY));
    doc.text(label, 14, y);
    doc.setTextColor(...NAVY);
    doc.text(value, W - 14, y, { align: "right" });
    y += 6.2;
  };
  row(
    `Base construction (${input.floorArea.toLocaleString()} sqm × $${finish.low}–$${finish.high}/sqm)`,
    `${formatAUDFull(est.baseLow)} – ${formatAUDFull(est.baseHigh)}`
  );
  est.toggleLines.forEach((t) =>
    row(
      `${t.label}${t.qty > 1 ? ` (×${t.qty})` : ""}`,
      `${formatAUDFull(t.low)} – ${formatAUDFull(t.high)}`
    )
  );
  doc.setDrawColor(...LINE);
  doc.line(14, y - 2, W - 14, y - 2);
  y += 4;
  row("TOTAL ESTIMATED RANGE (ex. GST)", `${formatAUDFull(est.budgetLow)} – ${formatAUDFull(est.budgetHigh)}`, true);

  /* Compliance checklist --------------------------------------------- */
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(...GREY);
  doc.text("ISO COMPLIANCE & REGULATORY SIGN-OFF CHECKLIST", 14, y);
  y += 6;
  doc.setFontSize(9);
  est.checklist.forEach((item) => {
    doc.setTextColor(...BRAND);
    doc.circle(16.5, y - 1.2, 1.1, "F");
    doc.setTextColor(...NAVY);
    doc.text(item, 21, y, { maxWidth: W - 40 });
    y += 5.6;
  });

  /* Footer ----------------------------------------------------------- */
  const footerY = doc.internal.pageSize.getHeight() - 14;
  doc.setDrawColor(...LINE);
  doc.line(14, footerY - 6, W - 14, footerY - 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...GREY);
  doc.text(
    "Indicative planning estimate only. Excludes GST, statutory permits and site condition variations. Final budget confirmed after free on-site audit.",
    14,
    footerY - 1.5,
    { maxWidth: W - 28 }
  );
  doc.text(
    "O'Callaghan Building and Maintenance Pty Ltd T/A Elevate Commercial Construction · CCB-L 100313 · CB-U 41950",
    14,
    footerY + 3.5
  );

  const safeRef = reference ? `-${reference}` : "";
  doc.save(`elevatec-fitout-estimate${safeRef}.pdf`);
}
