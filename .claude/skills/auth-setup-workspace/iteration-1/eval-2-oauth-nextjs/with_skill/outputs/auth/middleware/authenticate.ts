import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '@/auth/auth.config';

/**
 * Middleware to protect Next.js pages (runs at the edge).
 *
 * Add protected route patterns to the `matcher` config at the bottom.
 * Unauthenticated users are redirected to the sign-in page.
 */
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const signInUrl = new URL('/login', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

/**
 * Define which routes are protected by the middleware.
 */
export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/admin/:path*'],
};

/**
 * Helper to protect API routes (server-side).
 *
 * Usage in an API route handler:
 *
 *   import { requireAuth } from '@/auth/middleware/authenticate';
 *
 *   export async function GET(req: Request) {
 *     const session = await requireAuth();
 *     if (!session) {
 *       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 *     }
 *     // ... handle authenticated request
 *   }
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  return session;
}

/**
 * Helper to require a specific role for API routes.
 *
 * Usage:
 *   const session = await requireRole('admin');
 *   if (!session) {
 *     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
 *   }
 */
export async function requireRole(role: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== role) {
    return null;
  }
  return session;
}
