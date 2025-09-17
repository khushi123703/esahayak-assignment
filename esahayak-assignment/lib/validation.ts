// lib/validation.ts
import { z } from 'zod';

export const cities = ['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other'] as const;
export const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Office', 'Retail'] as const;
export const bhkValues = ['1','2','3','4','Studio'] as const;
export const purposes = ['Buy', 'Rent'] as const;
export const timelines = ['0-3m','3-6m','>6m','Exploring'] as const;
export const sources = ['Website','Referral','Walk-in','Call','Other'] as const;
export const statuses = ['New','Qualified','Contacted','Visited','Negotiation','Converted','Dropped'] as const;

export const buyerSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email().optional().or(z.literal('').transform(()=>undefined)),
  phone: z.string().regex(/^\d{10,15}$/),
  city: z.enum(cities),
  propertyType: z.enum(propertyTypes),
  bhk: z.string().optional(),
  purpose: z.enum(purposes),
  budgetMin: z.number().int().positive().optional(),
  budgetMax: z.number().int().positive().optional(),
  timeline: z.enum(timelines),
  source: z.enum(sources),
  notes: z.string().max(1000).optional().or(z.literal('').transform(()=>undefined)),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(statuses).optional().default('New')
}).superRefine((data, ctx) => {
  // bhk required for Apartment/Villa
  if ((data.propertyType === 'Apartment' || data.propertyType === 'Villa') && !data.bhk) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'bhk is required for Apartment and Villa',
      path: ['bhk']
    });
  }
  // budgetMax >= budgetMin if both present
  if (typeof data.budgetMin === 'number' && typeof data.budgetMax === 'number') {
    if (data.budgetMax < data.budgetMin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'budgetMax must be >= budgetMin',
        path: ['budgetMax']
      });
    }
  }
});

export type BuyerInput = z.infer<typeof buyerSchema>;

// CSV row validator: expects row keys matching header names
export function validateCsvRow(row: Record<string,string>, rowNum: number) {
  const mapped = {
    fullName: row.fullName?.trim(),
    email: row.email?.trim() || undefined,
    phone: row.phone?.trim(),
    city: row.city?.trim(),
    propertyType: row.propertyType?.trim(),
    bhk: row.bhk?.trim() || undefined,
    purpose: row.purpose?.trim(),
    budgetMin: row.budgetMin ? parseInt(row.budgetMin, 10) : undefined,
    budgetMax: row.budgetMax ? parseInt(row.budgetMax, 10) : undefined,
    timeline: row.timeline?.trim(),
    source: row.source?.trim(),
    notes: row.notes?.trim() || undefined,
    tags: row.tags ? row.tags.split(',').map(s=>s.trim()).filter(Boolean) : []
  };

  const res = buyerSchema.safeParse(mapped);
  if (!res.success) {
    const msg = res.error.issues.map(i => `${i.path.join('.') || 'field'}: ${i.message}`).join('; ');
    return { ok: false, row: rowNum, error: msg };
  }
  return { ok: true, row: rowNum, data: res.data };
}
