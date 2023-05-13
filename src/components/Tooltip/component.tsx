"use client";

import clsx from "clsx";
import { FC, useRef } from "react";
import { ToolTipProps } from "./types";

export default function ToolTip({ children, tooltip, state }: ToolTipProps) {
  const tooltipRef = useRef<HTMLSpanElement>(null);

  return (
    <div className="group">
      {children}
      {tooltip ? (
        <div
          className={clsx(
            "invisible z-[20] group-hover:visible opacity-0 group-hover:opacity-100 duration-100 text-white p-2 rounded absolute top-full mr-0 right-0 mt-1 whitespace-nowrap",
            { "bg-error": state === "error" },
            {
              "bg-info": state === "info",
            },
            {
              "bg-success": state === "success",
            },
            {
              "bg-warning": state === "warning",
            }
          )}
        >
          <div
            className={clsx(
              " absolute -top-3 h-3 w-3 origin-bottom-left right-[1.35rem] rotate-45 transform",
              { "bg-error": state === "error" },
              {
                "bg-info": state === "info",
              },
              {
                "bg-success": state === "success",
              },
              {
                "bg-warning": state === "warning",
              }
            )}
          ></div>
          <span ref={tooltipRef}>{tooltip}</span>
        </div>
      ) : null}
    </div>
  );
}
