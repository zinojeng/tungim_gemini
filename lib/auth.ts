import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, accounts, sessions, verificationTokens } from '@/db/schema'

export const authConfig = {
    // Required on non-Vercel hosts (e.g. Zeabur) so Auth.js trusts the
    // X-Forwarded-Host header. Alternatively set AUTH_URL.
    trustHost: true,
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    // Credentials provider requires the JWT session strategy.
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
    },
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            name: 'Email and password',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(raw) {
                const email = typeof raw?.email === 'string' ? raw.email.trim().toLowerCase() : ''
                const password = typeof raw?.password === 'string' ? raw.password : ''
                if (!email || !password) return null

                const [user] = await db.select().from(users).where(eq(users.email, email))
                if (!user || !user.passwordHash) return null

                const ok = await bcrypt.compare(password, user.passwordHash)
                if (!ok) return null

                // Deny sign-in until the email has been confirmed.
                if (!user.emailVerified) return null

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user.role ?? 'user',
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            // For Google, only allow (and only auto-link by email) when Google
            // says the address is verified.
            if (account?.provider === 'google') {
                return (profile as { email_verified?: boolean } | undefined)?.email_verified === true
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.uid = (user as { id?: string }).id
                token.role = (user as { role?: string }).role ?? 'user'
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = (token.uid as string) ?? session.user.id
                session.user.role = (token.role as string) ?? 'user'
            }
            return session
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
