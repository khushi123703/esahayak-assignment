// lib/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import cookie from 'cookie';
const COOKIE_NAME = 'demo_user';

export type DemoUser = {
  id: string;
  name: string;
  email?: string;
  isAdmin?: boolean;
};

export function setDemoUserCookie(res: NextResponse, user: DemoUser) {
  const val = JSON.stringify(user);
  res.headers.append(
    'Set-Cookie',
    cookie.serialize(COOKIE_NAME, val, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  );
}

export function clearDemoCookie(res: NextResponse) {
  res.headers.append(
    'Set-Cookie',
    cookie.serialize(COOKIE_NAME, '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0)
    })
  );
}

export function getUserFromRequest(req: NextRequest): DemoUser | null {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const parsed = cookie.parse(cookieHeader || '');
  try {
    if (!parsed[COOKIE_NAME]) return null;
    const u = JSON.parse(parsed[COOKIE_NAME]);
    return u;
  } catch {
    return null;
  }
}

export function demoUserForEmail(email?: string) {
  return {
    id: randomUUID(),
    name: email ? email.split('@')[0] : 'Demo User',
    email
  };
}
