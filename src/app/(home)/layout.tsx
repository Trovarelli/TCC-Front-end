"use client";
import { ReactNode } from "react";
import DesktopNav from "@/components/Navbar/Desktop/component";
import MobileNav from "@/components/Navbar/Mobile/component";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <DesktopNav />
      <MobileNav />
      <main className="mt-[4.4rem] min-h-screen">{children}</main>
    </div>
  );
}
