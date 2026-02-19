import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: "pYqQ8pX9kQ4W4R7M9Z2V5X8Z1C4V7B0N1M4Q7W1E4R7T0Y3U1I4O7P0A",
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Mocking user for now based on role
                if (credentials?.email === "admin@hms.com" && credentials?.password === "admin123") {
                    return { id: "1", name: "Admin User", email: "admin@hms.com", role: "Admin" }
                }
                if (credentials?.email === "doctor@hms.com" && credentials?.password === "doctor123") {
                    return { id: "2", name: "Dr. Smith", email: "doctor@hms.com", role: "Doctor" }
                }
                if (credentials?.email === "patient@hms.com" && credentials?.password === "patient123") {
                    return { id: "3", name: "John Doe", email: "patient@hms.com", role: "Patient" }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
})
