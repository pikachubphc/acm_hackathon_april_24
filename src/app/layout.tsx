import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SuperTokensProvider } from "@/components/supertokensProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "BitsAI",
  description: "Your own college AI assistant",
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
            "m-0 flex min-h-screen flex-col items-center bg-background p-0 font-sans antialiased",
            inter.variable
          )}
        >
          <div className="flex w-full max-w-7xl flex-col gap-4">
            {children}
            <Toaster />
          </div>
        </body>
      </SuperTokensProvider>
    </html>
  );
}
