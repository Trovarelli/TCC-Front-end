"use client";
import Spinner from "@/components/Spinner/component";
import clsx from "clsx";
import getIcon from "../utils/getIcons";
import { ButtonProps } from "./types";

export function Button({
  rounded,
  btnName,
  icon,
  loading,
  fullWidth,
  secondary = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        " px-10 py-2 rounded border",
        {
          "border-primary active:bg-[#3023c9] bg-primary text-white":
            !secondary,
        },
        {
          "bg-transparent text-[#5344FF] border border-[#5344FF] hover:bg-[#5344FF] hover:text-white active:bg-[#3023c9]":
            secondary,
        },
        { "rounded-full": rounded },
        { "w-full": fullWidth }
      )}
      disabled={loading}
    >
      {!!loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : icon !== undefined ? (
        <div className="flex justify-center items-center">
          <div className="mr-1">{getIcon(icon)}</div>
          {btnName}
        </div>
      ) : (
        btnName
      )}
    </button>
  );
}
