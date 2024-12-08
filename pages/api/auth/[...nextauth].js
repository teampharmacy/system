"use server";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../src/lib/db";
// import { verifyPassword } from "../../../lib/cryptoUtils";
import { verifyPassword } from "../../../src/lib/cryptoUtils";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure email and password are provided
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        // 1. Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
          include: { accounts: true },
        });

        // 2. Check if user exists and is approved
        if (!user) {
          throw new Error("No user found with this email.");
        }

        // 3. Verify password (using bcrypt)
        const account = user.accounts[0]; // Assuming the user has one account

        if (!account || !account.passwordHash) {
          throw new Error("Invalid credentials.");
        }

        const isValid = await verifyPassword(password, account.passwordHash);
        if (!isValid) {
          throw new Error("Invalid email or password.");
        }

        // Check if the user is approved
        if (!user.approved) {
          throw new Error("Your account has not been approved by the admin.");
        }

        return user; // Authentication successful
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // Add user ID, role, and approval status to session
      if (token) {
        console.log("JWT user:", user); // Log user data to ensure role is assigned correctly
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.approved = token.approved;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log("Session token:", token); // Log token to check for correct data
        token.id = user.id;
        token.role = user.role;
        token.approved = user.approved;
      }
      return token;
    },
    async redirect({ url, baseUrl, user }) {
      // If the user is an admin, redirect to the admin panel
      if (user?.role === "admin") {
        return `${baseUrl}/admin-panel`; // Redirect to the admin panel
      }
      // Otherwise, return to the default destination or home page
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "sign-in", // Custom sign-in page
    error: "sign-in", // Error page redirects back to sign-in
  },
  secret: process.env.NEXTAUTH_SECRET,
});
