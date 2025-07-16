import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import User from "models/User";
import bcrypt from "bcryptjs";

// تعریف نوع کاربر
declare module "next-auth" {
  interface User {
    _id: string;
    isAdmin: boolean;
  }

  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    };
  }
}

// تعریف نوع JWT
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isAdmin?: boolean;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token._id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await db.connect();

          const user = await User.findOne({
            email: credentials.email,
          }).select("+password");

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin || false,
          };
        } catch (error) {
          console.error("خطا در احراز هویت:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
