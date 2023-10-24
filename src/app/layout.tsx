"use client";
import { ReactNode } from "react";
import "./global.css";
import { Footer } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: {
    default: "TAHR - Technology Applied to Human Resources",
    template: "%s | TAHR - Technology Applied to Human Resources",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ptBr">
      <body>
        <ToastContainer />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
