import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth.config';
import { prisma } from '@/lib/prisma';

/**
 * Get the current authenticated user from the database.
 * Useful when you need full user data beyond what the session provides.
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
}

/**
 * Get the OAuth account tokens for a specific provider.
 * Useful when you need to call provider APIs on behalf of the user.
 */
export async function getProviderTokens(userId: string, provider: string) {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      provider,
    },
    select: {
      access_token: true,
      refresh_token: true,
      expires_at: true,
    },
  });

  return account;
}
