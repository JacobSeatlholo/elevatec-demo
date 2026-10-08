import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  FINISH_LEVELS,
  PROPERTY_TYPES,
  estimateFitout,
  type FinishLevel,
  type PropertyType,
  type ToggleKey,
} from "@/lib/fitout";

const leadSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(120),
  companyName: z.string().min(1, "Company name is required").max(160),
  email: z.string().email("A valid email is required").max(200),
  phone: z
    .string()
    .min(6, "A valid phone number is required")
    .max(30)
    .regex(/^[0-9+()\-\s]+$/, "Phone can only contain digits and + ( ) -"),
  desiredStart: z.string().min(1).max(60),
  inspectionDate: z.string().max(40).optional().nullable(),
  propertyType: z.string(),
  suburb: z.string().max(120),
  postcode: z.string().max(10),
  floorArea: z.number().min(50).max(3000),
  desks: z.number().min(0).max(2000),
  toggles: z.array(z.string()).max(10),
  finish: z.string(),
});

function makeReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `EL-${year}-${rand}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          issues: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Re-validate the property type / finish against known values and
    // re-run the estimate server-side so stored budgets are trustworthy.
    const propertyType = (PROPERTY_TYPES.some((p) => p.value === data.propertyType)
      ? data.propertyType
      : "commercial-office") as PropertyType;
    const finish = (FINISH_LEVELS.some((f) => f.value === data.finish)
      ? data.finish
      : "standard") as FinishLevel;
    const toggles = data.toggles.filter((t) =>
      ["boardroom", "kitchenette", "phoneBooths", "ddaBathrooms", "reception"].includes(t)
    ) as ToggleKey[];

    const estimate = estimateFitout({
      propertyType,
      suburb: data.suburb,
      postcode: data.postcode,
      floorArea: data.floorArea,
      desks: data.desks,
      toggles,
      finish,
    });

    const reference = makeReference();

    const lead = await db.lead.create({
      data: {
        reference,
        fullName: data.fullName,
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        desiredStart: data.desiredStart,
        inspectionDate: data.inspectionDate ?? null,
        propertyType,
        suburb: data.suburb,
        postcode: data.postcode,
        floorAreaSqm: data.floorArea,
        deskCount: data.desks,
        toggles: JSON.stringify(toggles),
        finishLevel: finish,
        budgetLow: estimate.budgetLow,
        budgetHigh: estimate.budgetHigh,
        durationWeeks: `${estimate.durationLowWeeks}-${estimate.durationHighWeeks}`,
      },
    });

    return NextResponse.json({
      ok: true,
      reference: lead.reference,
      estimate: {
        budgetLow: estimate.budgetLow,
        budgetHigh: estimate.budgetHigh,
        durationWeeks: `${estimate.durationLowWeeks}-${estimate.durationHighWeeks} weeks`,
      },
      message:
        "Thanks — your estimate has been locked in. A senior estimator will call you within one business day.",
    });
  } catch (error) {
    console.error("Lead submission failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your request. Please try again or call 0401 933 088." },
      { status: 500 }
    );
  }
}
