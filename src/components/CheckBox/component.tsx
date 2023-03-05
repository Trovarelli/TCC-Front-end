import clsx from "clsx";
import { useEffect, useState } from "react";

interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  label?: string;
  value?: boolean;
  sm?: boolean;
}

export const CheckBox = ({
  label,
  id = "chbx1",
  sm = false,
  value,
  checked,
  ...props
}: CheckBoxProps) => {
  return (
    <div className="flex mt-4 items-center rounded">
      <input
        {...props}
        id={id}
        type="checkbox"
        className="w-4 h-4 text-white rounded focus:ring-transparent accent-primary "
      />
      <label
        htmlFor={id}
        className={clsx("w-full ml-2 font-medium text-gray-900 rounded", {
          "text-sm": sm,
        })}
      >
        {label}
      </label>
    </div>
  );
};
