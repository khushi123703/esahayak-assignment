import { z } from "zod";

export const buyerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().min(10, "Phone number is required"),
  status: z.enum([
    "New",
    "Qualified",
    "Contacted",
    "Visited",
    "Negotiation",
    "Converted",
    "Dropped",
  ]),
  budgetMin: z.coerce.number().min(0, "Budget Min must be 0 or greater"),
  budgetMax: z.coerce.number().min(0, "Budget Max must be 0 or greater"),
  timeline: z.enum(["<1m", "1-3m", "3-6m", ">6m"]),
  source: z.enum(["Referral", "Website", "Social Media", "Other"]),
  notes: z.string().optional(),
  tags: z.string().optional(),
});
