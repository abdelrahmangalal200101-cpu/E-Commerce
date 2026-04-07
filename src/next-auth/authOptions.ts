import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          placeholder: "enter your email",
          type: "email",
        },
        password: {
          label: "password",
          placeholder: "enter your password",
          type: "password",
        },
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
              headers: {
                "content-type": "application/json",
              },
            },
          );

          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message || "invalid Login");
          }
          console.log("result authorization", result);

          const jwt: { id: string } = jwtDecode(result.token);
          console.log(jwt);

          return {
            id: jwt.id,
            name: result.user.name,
            email: result.user.email,
            token: result.token,
          };
        } catch (err) {
          throw new Error((err as Error).message);
        }
      },
    }),
  ],

  callbacks: {
    jwt(params) {
      if (params.user) {
        ((params.token.usetoken = params.user.token),
          (params.token.id = params.user.id));
      }

      return params.token;
    },
    session(param){
      param.session.id = param.token.id;


      return param.session
    }
  },
  pages: {
    signIn: "/login",
  },
};
