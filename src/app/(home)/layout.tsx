"use client";
import { ReactNode } from "react";
import DesktopNav from "@/components/Navbar/Desktop/component";

export const metadata = {
  title: {
    default: "Home",
    template: "%s | Home ",
  },
};

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <DesktopNav />
      <main className="mt-[4.4rem] min-h-screen">{children}</main>
    </div>
  );
}
