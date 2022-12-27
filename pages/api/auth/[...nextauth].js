import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "/src/schemas/UserSchema";
import clientPromise from "../../../src/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import dbConnect from "../../../src/lib/dbConnect";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.MONGODB_DB,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user, profile }) {
      if (
        profile.email === "louison.prugnaud@gmail.com" ||
        profile.email === "lea.ramelot@gmail.com"
      ) {
        await dbConnect();
        const exist = await User.findOne({ email: user.email });
        if (!exist) {
          user.prenom = profile.given_name;
        }
        return true;
      } else {
        return false;
      }
    },
    async session({ session, user }) {
      session.user = {
        ...session.user,
        prenom: user.prenom,
        _id: user.id,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
