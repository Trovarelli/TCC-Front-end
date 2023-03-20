import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: {
    default: "Auth",
    template: "%s | Auth",
  },
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div>{children}</div>;
}
