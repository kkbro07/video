
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect logged in users to the admin dashboard if they try to access the login page
        if (nextUrl.pathname.startsWith('/login')) {
            return Response.redirect(new URL('/admin/movies', nextUrl));
        }
      }
      return true;
    },
  },
  providers: [], // We will add the credentials provider next
} satisfies NextAuthConfig;
