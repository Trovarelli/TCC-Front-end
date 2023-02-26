import clsx from "clsx";
import { CheckCircle, Info, Warning, WarningCircle } from "phosphor-react";
import { ToolTip } from "../../Tooltip";
import { TextInputProps } from "./types";

export const TextInput = ({
  label,
  value,
  state,
  helperText,
  ...props
}: TextInputProps) => {
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
    <div className="relative mt-4">
      <input
        {...props}
        type="text"
        id="textInput"
        className={clsx(
          "block px-2.5 pb-2.5 pt-4 focus:px-[9px] focus:pb-[9px] focus:pt-[15px] focus:pr-12 pr-12 w-full text-sm text-black bg-transparent rounded-lg border border-primary appearance-none focus:outline-none focus:ring-0 focus:border-2 peer",
          { "border-error": state === "error" }
        )}
        placeholder=" "
        value={value}
      />

      <label
        htmlFor="textInput"
        className={clsx(
          "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
          { "peer-focus:text-error text-error": state === "error" }
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
    </div>
  );
};
