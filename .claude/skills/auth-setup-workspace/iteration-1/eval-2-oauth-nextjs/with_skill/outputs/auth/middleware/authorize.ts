import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/auth/auth.config';

/**
 * Higher-order function to protect API route handlers with role-based access control.
 *
 * Usage in a Next.js App Router API route:
 *
 *   import { withAuth } from '@/auth/middleware/authorize';
 *
 *   export const GET = withAuth(async (req, session) => {
 *     return NextResponse.json({ data: 'protected data' });
 *   });
 *
 *   // Admin-only route:
 *   export const DELETE = withAuth(async (req, session) => {
 *     return NextResponse.json({ message: 'Deleted' });
 *   }, ['admin']);
 */
export function withAuth(
  handler: (req: Request, session: any) => Promise<NextResponse>,
  allowedRoles?: string[]
) {
  return async (req: Request): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (allowedRoles && !allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return handler(req, session);
  };
}
