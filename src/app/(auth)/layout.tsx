import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: {
    default: "Login",
    template: "%s | Login",
  },
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <>{children}</>;
}
