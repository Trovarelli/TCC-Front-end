"use client";
import DesktopNav from "@/components/Navbar/Desktop/component";
import { ReactNode } from "react";

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
      <div className="mt-16">{children}</div>
    </div>
  );
}
