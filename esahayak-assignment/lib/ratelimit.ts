// lib/ratelimit.ts
type Bucket = { tokens: number; last: number };
const MAP = new Map<string, Bucket>();
const RATE = 5; // requests
const WINDOW_MS = 60 * 1000; // per minute

export function allowRequest(key: string) {
  const now = Date.now();
  const b = MAP.get(key) ?? { tokens: RATE, last: now };
  const elapsed = now - b.last;
  const refill = Math.floor(elapsed / WINDOW_MS) * RATE;
  if (refill > 0) {
    b.tokens = Math.min(RATE, b.tokens + refill);
    b.last = now;
  }
  if (b.tokens > 0) {
    b.tokens -= 1;
    MAP.set(key, b);
    return true;
  }
  MAP.set(key, b);
  return false;
}
