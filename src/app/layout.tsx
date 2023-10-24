import { ReactNode } from "react";
import "./global.css";
import { Footer } from "@/components";
import { Metadata } from "next";
import ToastProvider from "@/components/ToastProvider/component";

export const metadata: Metadata = {
  title: {
    default: "TAHR - Technology Applied to Human Resources",
    template: "%s | TAHR - Technology Applied to Human Resources",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ptBr">
      <body>
        <ToastProvider />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
