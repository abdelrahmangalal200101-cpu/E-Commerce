import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMytoken() {
  try {
    const cookieStore = await cookies();
    
    const cookieName = process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
    
    const sessionToken = cookieStore.get(cookieName)?.value;
    
    if (!sessionToken) {
      return null;
    }
    
    const decodedToken = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    
    return decodedToken?.userToken as string | null;
    
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
