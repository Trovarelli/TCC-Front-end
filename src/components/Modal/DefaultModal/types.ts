import { ReactNode } from 'react';

export interface DefaultModalProps {
  open: boolean;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string
}