"use client";
import Spinner from "@/components/Spinner/component";
import clsx from "clsx";
import getIcon from "../utils/getIcons";
import { ButtonProps } from "./types";

export function Button({
  rounded,
  btnName,
  className,
  icon,
  loading,
  fullWidth,
  secondary = false,
  color = "primary",
  size = "md",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "py-2 rounded border",
        className,
        {
          "px-4": size === "md",
        },
        {
          "!px-0": size === "sm",
        },
        {
          "px-10": size === "lg",
        },
        {
          "border-primary active:bg-primary-active bg-primary text-white":
            !secondary && color === "primary",
        },
        "px-10 py-2 rounded border",
        {
          "border-error active:bg-error-active bg-error text-white":
            !secondary && color === "error",
        },
        {
          "border-success active:bg-success-active bg-success text-white":
            !secondary && color === "success",
        },
        {
          "border-warning active:bg-warning-active bg-warning text-white":
            !secondary && color === "warning",
        },
        {
          "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white active:bg-primary-active":
            secondary,
        },
        { "rounded-full": rounded },
        { "w-full": fullWidth }
      )}
      disabled={loading || disabled}
    >
      <div className="relative">
        <div
          className={clsx("flex justify-center absolute inset-0", {
            "opacity-0": !loading,
          })}
        >
          <Spinner />
        </div>
        {icon !== undefined ? (
          <div
            className={clsx("flex justify-center items-center", {
              "opacity-0": loading,
            })}
          >
            <div className="mr-1">{getIcon(icon)}</div>
            {btnName}
          </div>
        ) : (
          <span className={clsx({ "opacity-0": loading })}>{btnName}</span>
        )}
      </div>
    </button>
  );
}
