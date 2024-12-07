import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (user && user.password === credentials.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Prevent unapproved users from signing in
      return user.approved;
    },
    async session({ session, user }) {
      session.user.role = user.role; // Attach role to session
      session.user.approved = user.approved; // Attach approval status to session
      return session;
    },
  },
};

export default NextAuth(authOptions);
