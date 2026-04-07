import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMytoken() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("next-auth.session-token")?.value;

    if (!sessionToken) {
      return null;
    }

    const decodedToken = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return decodedToken?.token as string | null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}