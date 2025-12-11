import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Flight Pure",
  description: "Aviation-grade inspection workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-slate-50 text-slate-900">
        <Header />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
