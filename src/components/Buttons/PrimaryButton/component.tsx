import clsx from "clsx";
import { getIcon } from "../utils/getIcons";
import { PrimaryButtonProps } from "./types";

export const PrimaryButton = ({
  rounded,
  btnName,
  icon,
  fullWidth,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        "mt-4 px-10 py-3 rounded border border-primary active:bg-[#3023c9] bg-primary",
        { "rounded-full": rounded },
        { "w-full": fullWidth }
      )}
    >
      {icon !== undefined ? (
        <div className="flex justify-center items-center">
          <div className="mr-1">{getIcon(icon)}</div>
          {btnName}
        </div>
      ) : (
        btnName
      )}
    </button>
  );
};
