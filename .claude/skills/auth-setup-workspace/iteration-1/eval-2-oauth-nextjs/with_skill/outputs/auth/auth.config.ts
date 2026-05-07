import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

/**
 * NextAuth.js configuration with Google and GitHub OAuth providers.
 *
 * - Uses Authorization Code flow (NextAuth handles PKCE automatically).
 * - PrismaAdapter creates or links a local user on first OAuth login.
 * - Provider tokens are stored in the Account table for calling provider APIs.
 * - Session cookies use httpOnly, Secure, SameSite=Lax (Lax required for OAuth redirects).
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],

  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.OAUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    /**
     * Attach user ID and role to the JWT so they are available in the session
     * without a database lookup on every request.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? 'user';
      }
      return token;
    },

    /**
     * Expose user ID and role on the client-side session object.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  events: {
    /**
     * Assign a default role when a new user is created on first OAuth login.
     */
    async createUser({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'user' },
      });
    },
  },

  session: {
    strategy: 'jwt',
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax', // Lax required for OAuth redirects
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  pages: {
    signIn: '/login',
    error: '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
