import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.password === process.env.ADMIN_PASSWORD) {
          return { id: "1", name: "Admin", email: "contact@didierflageul.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
