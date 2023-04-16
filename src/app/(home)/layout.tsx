"use client";
import { ReactNode } from "react";
import DesktopNav from "@/components/Navbar/Desktop/component";
import MobileNav from "@/components/Navbar/Mobile/component";

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
      <MobileNav />
      <main className="mt-[4.4rem]">{children}</main>
    </div>
  );
}
