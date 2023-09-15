import clsx from "clsx";
import { DefaultModalProps } from "./types";

export const DefaultModal = ({
  open,
  size,
  children,
  className,
}: DefaultModalProps) => {
  return (
    <div className={clsx({ hidden: !open })}>
      <div
        className={
          "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-14 inset-0 z-50 outline-none focus:outline-none"
        }
      >
        <div
          className={clsx(
            "relative my-6 mx-auto bg-white shadow-lg max-w-[80vw] rounded-md",
            { "w-[75vw]": size === "md" },
            { "w-[95vw]": size === "lg" },
            className
          )}
        >
          {children}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};
