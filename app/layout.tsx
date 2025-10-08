import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tone set",
  description: "Color palette for website and apps",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
