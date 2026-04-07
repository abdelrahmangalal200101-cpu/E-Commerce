import type { Metadata } from "next";
import { Geist, Exo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "./_components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import MyProvider from "./_components/MyProvider/MyProvider";
import NumCartItemProvider from "../Context/NumCartItemProvider";
import NumWishItemProvider from "../Context/NumWishItemProvider";
import Footer from "./_components/Footer/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Anything In Your Mind You Will Find It Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`bg-white ${exo.className}`}>
        <MyProvider>
          <NumWishItemProvider>
            <NumCartItemProvider>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </NumCartItemProvider>
          </NumWishItemProvider>
        </MyProvider>
      </body>
    </html>
  );
}
