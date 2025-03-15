import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const nonce = Buffer.from(Math.random().toString()).toString('base64');

  const csp = `
    default-src 'self';
    img-src 'self' 'nonce-${nonce}' https://next.ftso.local https://directus.ftso.local https://webdata.ftso.eu;
    frame-ancestors 'self' https://next.ftso.local https://directus.ftso.local https://webdata.ftso.eu http://localhost:3000;
    script-src 'self' 'nonce-${nonce}' https://next.ftso.local https://directus.ftso.local https://webdata.ftso.eu https://unpkg.com/spacingjs http://localhost:3000 'unsafe-eval';
    style-src 'self' 'nonce-${nonce}' https://next.ftso.local https://webdata.ftso.eu;
  `.replace(/\n/g, ' ');

  const res = NextResponse.next();
  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('X-CSP-Nonce', nonce);
  /*response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://directus.ftso.local https://webdata.ftso.eu; img-src 'self' https://webdata.ftso.eu;`
  );*/

  //response.headers.set('X-NONCE', nonce);

  if (
    process.env.NODE_ENV === 'production' &&
    url.pathname.startsWith('/draft')
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}
