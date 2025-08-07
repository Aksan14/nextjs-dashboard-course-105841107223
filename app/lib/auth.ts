// 'use server';

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

interface Credentials {
  email: string;
  password: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials as Credentials;

        try {
          const data = await sql`
            SELECT * FROM users WHERE email = ${email}
          `;
          const user = data.rows[0];

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return { id: user.id, name: user.name, email: user.email };
          }

          return null;
        } catch (error) {
          console.error('Database Error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});