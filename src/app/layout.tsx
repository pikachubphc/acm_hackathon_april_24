import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SuperTokensProvider } from "@/components/supertokensProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "plura",
  description: "learning project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SuperTokensProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable
          )}
        >
          {children}
        </body>
      </SuperTokensProvider>
    </html>
  );
}
