"use client";

import clsx from "clsx";
import { ToolTipProps } from "./types";

export default function ToolTip({ children, tooltip, state }: ToolTipProps) {
  const renderTooltipContent = () => {
    if (!tooltip) {
      return null;
    }

    const tooltipLines = tooltip.split("\n");

    return (
      <div
        className={clsx(
          "invisible z-[20] group-hover:visible opacity-0 group-hover:opacity-100 duration-100 text-white p-2 rounded absolute top-full mr-0 right-0 mt-1 whitespace-nowrap",
          { "bg-error": state === "error" },
          { "bg-info": state === "info" },
          { "bg-success": state === "success" },
          { "bg-warning": state === "warning" }
        )}
      >
        <div
          className={clsx(
            "absolute -top-3 h-3 w-3 origin-bottom-left right-[1.35rem] rotate-45 transform",
            { "bg-error": state === "error" },
            { "bg-info": state === "info" },
            { "bg-success": state === "success" },
            { "bg-warning": state === "warning" }
          )}
        ></div>
        {tooltipLines.map((line, index) => (
          <span key={index}>
            {line}
            {index < tooltipLines.length - 1 && <br />}{" "}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="group">
      {children}
      {renderTooltipContent()}
    </div>
  );
}


