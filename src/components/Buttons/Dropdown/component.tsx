"use client";
import { Select, TextInput } from "@/components/Inputs";
import clsx from "clsx";
import { CaretDown, X } from "phosphor-react";
import { ReactNode, useState } from "react";

interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
  btnName: string;
  icon?: ReactNode;
  itens: ReactNode[];
}

export const Dropdown = ({
  fullWidth,
  loading,
  btnName,
  className,
  icon,
  itens,
  ...rest
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "text-primary font-bold rounded-lg text-sm px-4 py-2 flex items-center justify-between",
          className,
          {
            "w-full": fullWidth,
          }
        )}
        {...rest}
      >
        <div className="flex gap-2 justify-center items-center">
          {icon}
          {btnName}
        </div>
        {open ? (
          <X size={17} weight="bold" className="ml-2" />
        ) : (
          <CaretDown size={17} weight="bold" className="ml-2" />
        )}
      </button>
      <div
        className={clsx(
          "z-10 absolute bg-white rounded-lg shadow  dark:bg-gray-700 mt-1",
          { hidden: !open }
        )}
      >
        <ul className="text-sm text-primary bg-white divide-y divide-white">
          {itens?.map((el) => (
            <li className="p-2">{el}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
