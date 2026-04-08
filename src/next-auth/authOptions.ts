import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,   

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "content-type": "application/json" },
            }
          );

          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message || "Invalid email or password");
          }

          const decoded: { id: string } = jwtDecode(result.token);

          return {
            id: decoded.id,
            name: result.user.name,
            email: result.user.email,
            token: result.token,
          };
        } catch (err: any) {
          console.error("Authorize Error:", err.message); // مهم للـ Logs
          throw new Error(err.message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;         
        token.userToken  = user.token;     
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.token = token.token as string;   
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",   
  },
};
