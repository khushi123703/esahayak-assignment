// app/api/export/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams;
  const where: any = {};
  if (q.get('city')) where.city = q.get('city');
  if (q.get('propertyType')) where.propertyType = q.get('propertyType');
  if (q.get('status')) where.status = q.get('status');
  if (q.get('timeline')) where.timeline = q.get('timeline');

  // basic search
  const search = q.get('search');
  let buyers;
  if (search) {
    buyers = await prisma.buyer.findMany({
      where: {
        AND: [
          where,
          {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search } }
            ]
          }
        ]
      },
      orderBy: { updatedAt: 'desc' }
    });
  } else {
    buyers = await prisma.buyer.findMany({ where, orderBy: { updatedAt: 'desc' } });
  }

  // build CSV
  const header = 'fullName,email,phone,city,propertyType,bhk,purpose,budgetMin,budgetMax,timeline,source,notes,tags,status';
  const lines = buyers.map(b => {
    const tags = (b.tags || []).join(',');
    return [
      b.fullName,
      b.email || '',
      b.phone,
      b.city,
      b.propertyType,
      b.bhk || '',
      b.purpose,
      b.budgetMin ?? '',
      b.budgetMax ?? '',
      // map enum names back to human strings (some enums in prisma changed char)
      b.timeline,
      b.source,
      (b.notes || '').replace(/\n/g,' '),
      tags,
      b.status
    ].join(',');
  });

  const csv = [header, ...lines].join('\n');
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename=buyers.csv' }});
}
