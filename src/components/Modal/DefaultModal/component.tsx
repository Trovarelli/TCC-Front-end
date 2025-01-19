"use client";
import clsx from "clsx";
import { useEffect } from "react";
import { DefaultModalProps } from "./types";

export const DefaultModal = ({
  open,
  size,
  children,
  className,
}: DefaultModalProps) => {
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

  return (
    <div className={clsx({ hidden: !open })}>
      <div
        className={
          "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-14 inset-0 z-50 outline-none focus:outline-none"
        }
      >
        <div
          className={clsx(
            "relative my-6 mx-auto bg-white shadow-lg max-w-[80vw] rounded-md w-full",
            { "sm:w-[25vw]": size === "xsm" },
            { "sm:w-[50vw]": size === "sm" },
            { "sm:w-[75vw]": size === "md" },
            { "sm:w-[95vw]": size === "lg" },
            className
          )}
        >
          {children}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black pointer-events-all"></div>
    </div>
  );
};
