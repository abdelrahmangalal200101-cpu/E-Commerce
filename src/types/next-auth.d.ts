import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    user: {
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userToken: string;
  }
}