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
  id = `chinpInput${label}`,
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
    <div className={clsx("relative max-h-[48px]", { "w-full": fullWidth })}>
      <input
        {...props}
        id={id}
        className={clsx(
          "block px-2.5 pb-2.5 pt-4 bg-transparent focus:px-[9px] focus:pb-[9px] focus:pt-[15px] focus:pr-12 pr-12 w-full text-sm text-gray-900 rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 peer transition-all",
          { "border-red-500 focus:border-red-600": state === "error" },
          { "border-blue-500 focus:border-blue-600": state === "info" },
          { "border-yellow-500 focus:border-yellow-600": state === "warning" },
          { "border-green-500 focus:border-green-600": state === "success" },
          { "border-gray-300 focus:border-indigo-600": !state }
        )}
        placeholder=" "
        value={value}
        type={typeControl}
      />
      <label
        htmlFor={id}
        className={clsx(
          "absolute text-sm cursor-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
          "before:content-[''] before:absolute before:inset-0 before:bg-white before:-z-10 before:rounded",
          { "peer-focus:text-red-600 text-red-600": state === "error" },
          { "peer-focus:text-blue-600 text-blue-600": state === "info" },
          { "peer-focus:text-yellow-600 text-yellow-600": state === "warning" },
          { "peer-focus:text-green-600 text-green-600": state === "success" },
          { "text-gray-600 peer-focus:text-indigo-600": !state }
        )}
      >
        {label}
      </label>
      <ToolTip tooltip={helperText} state={state}>
        <div
          className={clsx(
            "absolute bg-white top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 z-10",
            { hidden: !state },
            { "text-red-500": state === "error" },
            { "text-blue-500": state === "info" },
            { "text-green-500": state === "success" },
            { "text-yellow-500": state === "warning" }
          )}
        >
          {!!state && changeIcon(state)}
        </div>
      </ToolTip>
      {inputType === "password" && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className={clsx(
            "absolute text-indigo-600 cursor-pointer bg-white top-1/2 right-0 transition-all duration-100 transform -translate-x-1/2 -translate-y-1/2 z-10",
            { "right-10": !!state },
            { "!text-red-500": state === "error" },
            { "!text-blue-500": state === "info" },
            { "!text-green-500": state === "success" },
            { "!text-yellow-500": state === "warning" }
          )}
        >
          {showPassword ? <Eye size={26} /> : <EyeSlash size={26} />}
        </div>
      )}
      {inputType === "search" && (
        <div
          className={clsx(
            "absolute text-indigo-600 cursor-pointer bg-white top-1/2 right-0 transition-all duration-100 transform -translate-x-1/2 -translate-y-1/2 z-10",
            { "right-10": !!state }
          )}
        >
          <MagnifyingGlass size={26} />
        </div>
      )}
    </div>
  );
}


