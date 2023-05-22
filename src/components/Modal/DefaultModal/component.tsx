import clsx from "clsx";
import { DefaultModalProps } from "./types";

export const DefaultModal = ({
  open,
  size,
  children,
  className,
}: DefaultModalProps) => {
  return (
    <div
      className={clsx(
        "absolute overflow-x-hidden z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-30 h-full w-full flex justify-center items-start md:items-center",
        { hidden: !open }
      )}
    >
      <div
        className={clsx(
          "bg-white shadow-lg max-h-[90vh] max-w-[90vw] p-4 rounded-md h-fit",
          { "w-[70vw]": size === "md" },
          { "w-[90vw]": size === "lg" },
          { className }
        )}
      >
        {children}
      </div>
    </div>
  );
};
