// app/api/buyers/route.ts
import { NextResponse } from "next/server";

// In-memory storage (resets on restart)
let buyers: any[] = [];

// GET all buyers
export async function GET() {
  return NextResponse.json(buyers);
}

// POST new buyer
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newBuyer = {
      id: String(Date.now()), // unique ID
      fullName: body.fullName,
      email: body.email,
      phone: body.phone || "",
      status: body.status || "New",
      budgetMin: body.budgetMin ?? null,
      budgetMax: body.budgetMax ?? null,
      timeline: body.timeline || "",
      source: body.source || "",
      notes: body.notes || "",
      tags: body.tags || "",
    };

    buyers.push(newBuyer);

    return NextResponse.json(newBuyer, { status: 201 });
  } catch (error) {
    console.error("Error creating buyer:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
