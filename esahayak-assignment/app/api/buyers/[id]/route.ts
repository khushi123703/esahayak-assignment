// app/api/buyers/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getUserFromRequest } from '../../../../lib/auth';
import { buyerSchema } from '../../../../lib/validation';
import { allowRequest } from '../../../../lib/ratelimit';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const buyer = await prisma.buyer.findUnique({
    where: { id },
    include: { owner: true, history: { orderBy: { changedAt: 'desc' }, take: 5 } }
  });
  if (!buyer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ buyer });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!allowRequest(`put:${ip}`)) return NextResponse.json({ error: 'Rate limit' }, { status: 429 });

  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const id = params.id;
  const body = await req.json();
  // concurrency check
  if (body.updatedAt) {
    const existing = await prisma.buyer.findUnique({ where: { id }, select: { updatedAt: true } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (new Date(body.updatedAt).getTime() !== existing.updatedAt.getTime()) {
      return NextResponse.json({ error: 'Record changed, please refresh' }, { status: 409 });
    }
  }
  // ownership
  const target = await prisma.buyer.findUnique({ where: { id } });
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (target.ownerId !== user.id && !user.isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const parse = buyerSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.issues }, { status: 400 });
  }
  // apply update and write history
  const data = parse.data;
  const updated = await prisma.$transaction(async (tx) => {
    const before = await tx.buyer.findUnique({ where: { id } });
    const res = await tx.buyer.update({ where: { id }, data });
    const diff: any = {};
    for (const k of Object.keys(data)) {
      // record changed fields
      // @ts-ignore
      if (JSON.stringify((before as any)[k]) !== JSON.stringify((res as any)[k])) diff[k] = { before: (before as any)[k], after: (res as any)[k] };
    }
    if (Object.keys(diff).length > 0) {
      await tx.buyerHistory.create({
        data: { buyerId: id, changedBy: user.id, diff }
      });
    }
    return res;
  });
  return NextResponse.json({ updated });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const id = params.id;
  const target = await prisma.buyer.findUnique({ where: { id } });
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (target.ownerId !== user.id && !user.isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  await prisma.buyer.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
