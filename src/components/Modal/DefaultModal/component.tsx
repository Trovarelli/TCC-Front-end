"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DefaultModalProps } from "./types";

export const DefaultModal = ({
  open,
  size,
  children,
  className,
}: DefaultModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className={clsx(
              "relative bg-white shadow-2xl rounded-2xl w-full transform transition-all",
              { "max-w-sm": size === "xsm" },
              { "max-w-md": size === "sm" },
              { "max-w-2xl": size === "md" },
              { "max-w-4xl": size === "lg" },
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};



