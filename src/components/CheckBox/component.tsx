"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CheckBoxProps } from "./types";
import clsx from "clsx";
import ToolTip from "../Tooltip/component";

export function CheckBox({
  label,
  id = "chbx1",
  sm = false,
  value = { label, checked: false },
  setValue,
  state,
  helperText,
  className,
  link,
  ...props
}: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const labelString = useMemo(() => label.split("#")[0], [label]);
  const labelLink = useMemo(() => label.split("#")[1], [label]);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
    setValue && setValue({ label, checked: !isChecked });
  };
  return (
    <div
      className={clsx("flex items-center rounded cursor-pointer", className)}
    >
      <input
        {...props}
        id={`${id}-${label}`}
        type="checkbox"
        className={clsx(
          "w-4 h-4 text-white rounded focus:ring-transparent accent-primary",
          { "!text-error": state === "error" }
        )}
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
      <label
        htmlFor={`${id}-${label}`}
        className={clsx(
          "w-full ml-2 cursor-pointer font-medium text-gray-900 rounded",
          {
            "text-sm": sm,
          },
          { "!text-error": state === "error" }
        )}
      >
        {labelString}
        <a href={link} target="_blank" className="text-primary cursor-pointer">
          {labelLink}
        </a>
      </label>
    </div>
  );
}
