"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import {
  Building,
  CalendarIcon,
  CalendarCheck2,
  CheckCircle2,
  Download,
  Loader2,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCalcStore } from "@/lib/store";
import {
  estimateFitout,
  FINISH_META,
  formatAUD,
  PROPERTY_META,
} from "@/lib/fitout";
import { downloadEstimatePDF } from "@/lib/pdf-summary";

const START_OPTIONS = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "6+ months / planning",
];

interface SubmittedState {
  reference: string;
  firstName: string;
}

export function LeadDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const s = useCalcStore();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desiredStart, setDesiredStart] = useState<string>("");
  const [inspectionDate, setInspectionDate] = useState<Date | undefined>(
    undefined
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState<SubmittedState | null>(null);

  const estimate = useMemo(
    () =>
      estimateFitout({
        propertyType: s.propertyType,
        suburb: s.suburb,
        postcode: s.postcode,
        floorArea: s.floorArea,
        desks: s.desks,
        toggles: s.toggles,
        finish: s.finish,
      }),
    [s.propertyType, s.suburb, s.postcode, s.floorArea, s.desks, s.toggles, s.finish]
  );

  const propertyMeta = PROPERTY_META.find((p) => p.value === s.propertyType)!;
  const finishMeta = FINISH_META.find((f) => f.value === s.finish)!;

  // Reset when reopened
  useEffect(() => {
    if (open) {
      setSubmitted(null);
      setErrors({});
      setServerError("");
      setSubmitting(false);
    }
  }, [open]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (fullName.trim().length < 2) e.fullName = "Please enter your full name";
    if (!companyName.trim()) e.companyName = "Please enter your company name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email address";
    if (phone.replace(/\D/g, "").length < 8)
      e.phone = "Please enter a valid phone number";
    if (!desiredStart) e.desiredStart = "Please select a start window";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          desiredStart,
          inspectionDate: inspectionDate
            ? format(inspectionDate, "yyyy-MM-dd")
            : null,
          propertyType: s.propertyType,
          suburb: s.suburb,
          postcode: s.postcode,
          floorArea: s.floorArea,
          desks: s.desks,
          toggles: s.toggles,
          finish: s.finish,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.issues) {
          const map: Record<string, string> = {};
          data.issues.forEach(
            (i: { field: string; message: string }) =>
              (map[i.field] = i.message)
          );
          setErrors(map);
        }
        setServerError(
          data.error && data.error !== "Validation failed"
            ? data.error
            : "Please review the highlighted fields and try again."
        );
        return;
      }
      setSubmitted({
        reference: data.reference,
        firstName: fullName.trim().split(/\s+/)[0],
      });
    } catch {
      setServerError(
        "Network error — please try again or call us directly on 0401 933 088."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const closeDialog = (v: boolean) => {
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[92vh] overflow-y-auto bg-white p-0 sm:max-w-lg scrollbar-thin">
        <AnimatePresence mode="wait">
          {!submitted ? (
            /* ------------------------- FORM VIEW ------------------------- */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8"
            >
              <DialogHeader className="text-left">
                <div className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-deep ring-1 ring-brand/20">
                  <ShieldCheck className="h-3 w-3" />
                  Free · No obligation
                </div>
                <DialogTitle className="text-2xl font-extrabold tracking-tight text-navy">
                  Lock In Budget &amp; Request Detailed Scope
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-slate-500">
                  A senior estimator will review your configuration and call
                  within one business day to arrange your on-site audit.
                </DialogDescription>
              </DialogHeader>

              {/* Estimate snapshot */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Your configuration
                  </div>
                  <div className="text-sm font-extrabold text-brand">
                    {formatAUD(estimate.budgetLow)} – {formatAUD(estimate.budgetHigh)}
                  </div>
                </div>
                <div className="mt-2 text-xs leading-relaxed text-slate-600">
                  {propertyMeta.label} · {s.floorArea.toLocaleString()} sqm ·{" "}
                  {s.desks} desks · {finishMeta.label} ·{" "}
                  {estimate.durationLowWeeks}–{estimate.durationHighWeeks} weeks
                  {estimate.toggleLines.length > 0 &&
                    ` · +${estimate.toggleLines.length} option${estimate.toggleLines.length === 1 ? "" : "s"}`}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-xs font-semibold text-charcoal">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Tim Anders"
                        className="h-11 border-slate-300 pl-9 focus-visible:ring-brand"
                        aria-invalid={!!errors.fullName}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs font-medium text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="companyName" className="text-xs font-semibold text-charcoal">
                      Company Name *
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Pty Ltd"
                        className="h-11 border-slate-300 pl-9 focus-visible:ring-brand"
                        aria-invalid={!!errors.companyName}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="text-xs font-medium text-red-500">{errors.companyName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold text-charcoal">
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com.au"
                        className="h-11 border-slate-300 pl-9 focus-visible:ring-brand"
                        aria-invalid={!!errors.email}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs font-medium text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold text-charcoal">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0400 000 000"
                        className="h-11 border-slate-300 pl-9 focus-visible:ring-brand"
                        aria-invalid={!!errors.phone}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs font-medium text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Desired start + inspection date */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-charcoal">
                      Desired Start Date *
                    </Label>
                    <Select value={desiredStart} onValueChange={setDesiredStart}>
                      <SelectTrigger
                        className="h-11 border-slate-300 data-[placeholder]:text-slate-400 focus-visible:ring-brand"
                        aria-invalid={!!errors.desiredStart}
                      >
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        {START_OPTIONS.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.desiredStart && (
                      <p className="text-xs font-medium text-red-500">{errors.desiredStart}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-charcoal">
                      On-Site Inspection Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-11 w-full justify-start border-slate-300 px-3 font-normal text-slate-600 hover:bg-white"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-brand" />
                          {inspectionDate ? (
                            format(inspectionDate, "EEE d MMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={inspectionDate}
                          onSelect={setInspectionDate}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {serverError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                    {serverError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 w-full bg-brand text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-deep disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Locking in your estimate…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Request Detailed Scope
                    </>
                  )}
                </Button>
                <p className="text-center text-[11px] leading-relaxed text-slate-400">
                  By submitting you agree to be contacted about your project.
                  We never share your details. ABN-registered builder, fully
                  insured.
                </p>
              </form>
            </motion.div>
          ) : (
            /* --------------------- CONFIRMATION VIEW --------------------- */
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="p-6 text-center sm:p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 ring-4 ring-brand/20"
              >
                <CheckCircle2 className="h-9 w-9 text-brand" />
              </motion.div>

              <DialogHeader className="mt-4 text-center sm:text-center">
                <DialogTitle className="text-2xl font-extrabold tracking-tight text-navy">
                  You&apos;re locked in, {submitted.firstName}!
                </DialogTitle>
                <DialogDescription className="mx-auto max-w-sm text-sm leading-relaxed text-slate-500">
                  Your estimate and scope request have been received. A senior
                  estimator from Elevate will call you within one business day
                  to confirm your on-site audit.
                </DialogDescription>
              </DialogHeader>

              <div className="mx-auto mt-5 max-w-sm space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Reference</span>
                  <span className="font-extrabold tracking-wide text-navy">
                    {submitted.reference}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Locked budget range</span>
                  <span className="font-bold text-brand">
                    {formatAUD(estimate.budgetLow)} – {formatAUD(estimate.budgetHigh)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Est. duration</span>
                  <span className="font-bold text-navy">
                    {estimate.durationLowWeeks}–{estimate.durationHighWeeks} weeks
                  </span>
                </div>
                {inspectionDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Requested audit date</span>
                    <span className="inline-flex items-center gap-1 font-bold text-navy">
                      <CalendarCheck2 className="h-4 w-4 text-brand" />
                      {format(inspectionDate, "d MMM yyyy")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-lg bg-brand-soft px-4 py-3 text-left text-xs leading-relaxed text-brand-deep ring-1 ring-brand/20">
                <strong className="font-bold">Automated confirmation sent.</strong>{" "}
                A copy of your estimate summary has been queued to{" "}
                <span className="font-semibold">{email}</span>. Keep your
                reference handy when we call.
              </div>

              <Button
                onClick={() =>
                  downloadEstimatePDF(
                    {
                      propertyType: s.propertyType,
                      suburb: s.suburb,
                      postcode: s.postcode,
                      floorArea: s.floorArea,
                      desks: s.desks,
                      toggles: s.toggles,
                      finish: s.finish,
                    },
                    submitted.reference
                  )
                }
                className="mt-5 h-12 w-full bg-navy text-base font-bold text-white transition-colors hover:bg-charcoal"
              >
                <Download className="mr-2 h-5 w-5 text-brand" />
                Download PDF Summary
              </Button>
              <Button
                variant="ghost"
                onClick={() => closeDialog(false)}
                className="mt-2 w-full text-sm font-semibold text-slate-500 hover:text-navy"
              >
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
