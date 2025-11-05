import { Inter } from "next/font/google";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClientProviders } from "./ClientProviders";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Tone set",
  description: "Color palette for website and apps",
  icons: { icon: "/favicon.ico" },
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
