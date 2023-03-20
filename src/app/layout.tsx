import { ReactNode } from "react";

import "./global.css";

export const metadata = {
  title: {
    default: "TAHR - Technology Applied to Human Resources",
    template: "%s | TAHR - Technology Applied to Human Resources",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ptBr">
      <body>{children}</body>
    </html>
  );
}
