import clsx from "clsx";
import { SpinnerProps } from "./types";

export default function Spinner({ color = "white", size }: SpinnerProps) {
  return (
    <div
      className={clsx(
        `content-none text-${color} w-3 h-w-3 bg-transparent rounded-[10%] border-[12px] border-${color} animate-customSpinner`,
        {
          "border-[20px]": size === "md",
        },
        { "border-[40px]": size === "lg" }
      )}
    ></div>
  );
}


