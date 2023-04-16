"use client";

import ToolTip from "@/components/Tooltip/component";
import clsx from "clsx";
import {
  CheckCircle,
  Eye,
  EyeSlash,
  Info,
  MagnifyingGlass,
  Warning,
  WarningCircle,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { TextInputProps } from "./types";

export function TextInput({
  label,
  value,
  state,
  helperText,
  fullWidth,
  inputType,
  ...props
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [typeControl, setTypeControl] = useState(inputType);

  useEffect(() => {
    if (inputType === "password") {
      if (showPassword) setTypeControl("text");
      else setTypeControl("password");
    }
  }, [showPassword]);

  const changeIcon = (state: TextInputProps["state"]) => {
    switch (state) {
      case "error":
        return <WarningCircle size={26} />;
      case "warning":
        return <Warning size={26} />;
      case "info":
        return <Info size={26} />;
      case "success":
        return <CheckCircle size={32} />;
      default:
        return <></>;
    }
  };
  return (
    <div className={clsx("relative", { "w-full": fullWidth })}>
      <input
        {...props}
        className={clsx(
          "block px-2.5 pb-2.5 pt-4 bg-white focus:px-[9px] focus:pb-[9px] focus:pt-[15px] focus:pr-12 pr-12 w-full text-sm text-black rounded-md border border-primary appearance-none focus:outline-none focus:ring-0 focus:border-2 peer",
          { "border-error": state === "error" },
          { "border-info": state === "info" },
          { "border-warning": state === "warning" },
          { "border-success": state === "success" }
        )}
        placeholder=" "
        value={value}
        type={typeControl}
      />
      <label
        htmlFor={props.id}
        className={clsx(
          "absolute text-sm cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
          { "peer-focus:text-error text-error": state === "error" },
          { "peer-focus:text-info text-info": state === "info" },
          { "peer-focus:text-warning text-warning": state === "warning" },
          { "peer-focus:text-success text-success": state === "success" }
        )}
      >
        {label}
      </label>
      <ToolTip tooltip={helperText} state={state}>
        <div
          className={clsx(
            "absolute bg-white top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 z-10",
            { hidden: !state },
            { "text-error": state === "error" },
            {
              "text-info": state === "info",
            },
            {
              "text-success": state === "success",
            },
            {
              "text-warning": state === "warning",
            }
          )}
        >
          {!!state && changeIcon(state)}
        </div>
      </ToolTip>
      {inputType === "password" && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className={clsx(
            "absolute text-primary cursor-pointer bg-white top-1/2 right-0 transition-all duration-100 transform -translate-x-1/2 -translate-y-1/2 z-10",
            { "right-10": !!state }
          )}
        >
          {showPassword ? <Eye size={26} /> : <EyeSlash size={26} />}
        </div>
      )}
      {inputType === "search" && (
        <div
          className={clsx(
            "absolute text-primary cursor-pointer bg-white top-1/2 right-0 transition-all duration-100 transform -translate-x-1/2 -translate-y-1/2 z-10",
            { "right-10": !!state }
          )}
        >
          <MagnifyingGlass size={26} />
        </div>
      )}
    </div>
  );
}
