import { SpinnerProps } from "./types";

export default function Spinner({ color = "white", size = 12 }: SpinnerProps) {
  return (
    <div
      className={`content-none text-${color} w-3 h-w-3 bg-transparent rounded-[10%] border-[${size}px] border-${color} animate-customSpinner`}
    ></div>
  );
}
