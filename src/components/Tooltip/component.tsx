import clsx from "clsx";
import { FC, useRef } from "react";
import { ToolTipProps } from "./types";

export const ToolTip: FC<ToolTipProps> = ({
  children,
  tooltip,
  state = "info",
}): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="group"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className={clsx(
            "invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-100 bg-info text-white p-2 rounded absolute top-full mt-1 whitespace-nowrap",
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
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;
