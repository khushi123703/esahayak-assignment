import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db"; // adjust import if your db helper is elsewhere
import Papa from "papaparse";

// Reuse Zod schema for buyer
const buyerSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().regex(/^\d{10,15}$/),
  city: z.enum(["Chandigarh", "Mohali", "Zirakpur", "Panchkula", "Other"]),
  propertyType: z.enum(["Apartment", "Villa", "Plot", "Office", "Retail"]),
  bhk: z.enum(["1", "2", "3", "4", "Studio"]).optional(),
  purpose: z.enum(["Buy", "Rent"]),
  budgetMin: z.coerce.number().int().optional(),
  budgetMax: z.coerce.number().int().optional(),
  timeline: z.enum(["0-3m", "3-6m", ">6m", "Exploring"]),
  source: z.enum(["Website", "Referral", "Walk-in", "Call", "Other"]),
  notes: z.string().max(1000).optional(),
  tags: z.string().optional(), // CSV string, will split
  status: z.enum([
    "New",
    "Qualified",
    "Contacted",
    "Visited",
    "Negotiation",
    "Converted",
    "Dropped",
  ]).default("New"),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const text = await file.text();

    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });

    if (parsed.errors.length) {
      return NextResponse.json(
        { error: "Invalid CSV format", details: parsed.errors },
        { status: 400 }
      );
    }

    const rows = parsed.data as any[];
    if (rows.length > 200) {
      return NextResponse.json({ error: "Max 200 rows allowed" }, { status: 400 });
    }

    const errors: { row: number; message: string }[] = [];
    const validRows: any[] = [];

    rows.forEach((row, i) => {
      const result = buyerSchema.safeParse(row);
      if (!result.success) {
        errors.push({ row: i + 2, message: result.error.errors[0].message });
      } else {
        const data = result.data;
        if (
          data.propertyType === "Apartment" ||
          data.propertyType === "Villa"
        ) {
          if (!data.bhk) {
            errors.push({ row: i + 2, message: "BHK required for residential" });
            return;
          }
        }
        if (
          data.budgetMin &&
          data.budgetMax &&
          data.budgetMax < data.budgetMin
        ) {
          errors.push({ row: i + 2, message: "budgetMax must ≥ budgetMin" });
          return;
        }

        validRows.push({
          ...data,
          tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        });
      }
    });

    if (errors.length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    await prisma.$transaction(
      validRows.map((row) =>
        prisma.buyer.create({
          data: {
            ...row,
            ownerId: "demo-user", // Replace with real user from auth
          },
        })
      )
    );

    return NextResponse.json({ inserted: validRows.length });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
