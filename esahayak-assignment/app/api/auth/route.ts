// app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { demoUserForEmail, setDemoUserCookie, clearDemoCookie } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>({}));
  const action = body.action;
  if (action === 'login') {
    const email = body.email;
    const user = demoUserForEmail(email);
    const res = NextResponse.json({ ok: true, user });
    setDemoUserCookie(res, user);
    return res;
  } else if (action === 'logout') {
    const res = NextResponse.json({ ok: true });
    clearDemoCookie(res);
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 400 });
}
