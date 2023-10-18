"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CheckBoxProps } from "./types";
import clsx from "clsx";

export function CheckBox({
  label,
  id = "chbx1",
  sm = false,
  value = { label, checked: false },
  setValue,
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
    <div className="flex items-center rounded cursor-pointer">
      <input
        {...props}
        id={`${id}-${label}`}
        type="checkbox"
        className="w-4 h-4 text-white rounded focus:ring-transparent accent-primary"
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
      <label
        htmlFor={`${id}-${label}`}
        className={clsx(
          "w-full ml-2 cursor-pointer font-medium text-gray-900 rounded",
          {
            "text-sm": sm,
          }
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
