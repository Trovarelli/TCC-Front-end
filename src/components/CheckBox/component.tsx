import clsx from "clsx";
import { CheckBoxProps } from "./types";

export function CheckBox({
  label,
  id = "chbx1",
  sm = false,
  ...props
}: CheckBoxProps) {
  return (
    <div className="flex items-center rounded">
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
}
