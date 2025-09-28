
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
 
const credentialsConfig = Credentials({
    async authorize(credentials) {
        if (credentials.email === process.env.EMAIL_USER && credentials.password === process.env.EMAIL_PASS) {
            return { email: credentials.email };
        } else {
            return null;
        }
    },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
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
    providers: [credentialsConfig],
    secret: process.env.JWT_SECRET,
});
