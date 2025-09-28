
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials.email === process.env.EMAIL_USER && credentials.password === process.env.EMAIL_PASS) {
          // For now, we'll return a user object with just the email.
          // In a real application, you might want to fetch more user data from a database.
          return { email: credentials.email };
        } else {
          return null; // Return null if the credentials are not valid
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET, // Add the secret here
});
