import clsx from "clsx";
import { Spinner } from "../../Spinner";
import { getIcon } from "../utils/getIcons";
import { PrimaryButtonProps } from "./types";

export const PrimaryButton = ({
  rounded,
  btnName,
  icon,
  loading,
  fullWidth,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        "mt-4 px-10 py-2 rounded border border-primary active:bg-[#3023c9] bg-primary",
        { "rounded-full": rounded },
        { "w-full": fullWidth }
      )}
      disabled={loading}
    >
      {!!loading ? (
        <div className="flex justify-center">
          {" "}
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
};
