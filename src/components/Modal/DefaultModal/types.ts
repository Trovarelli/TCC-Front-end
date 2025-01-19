import { ReactNode } from 'react';

export interface DefaultModalProps {
  open: boolean;
  size?: "xsm" | "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}