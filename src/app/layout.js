import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Your App Name",
  description: "Description of your app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          <main className="container mx-auto px-4 py-8">{children}</main>{" "}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
