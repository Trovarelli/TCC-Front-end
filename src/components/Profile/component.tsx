"use client";
import { useUserStore } from "@/store/user";
import clsx from "clsx";
import Link from "next/link";
import { CaretDown, Key, SignOut, User, X } from "phosphor-react";
import { SetStateAction, useState } from "react";
import { DefaultModal, GptFormModal } from "../Modal";
import { TextInput } from "../Inputs";
import { Button } from "../Buttons";

interface ProfileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  logout: () => void;
}

export const Profile = ({ logout, className, ...rest }: ProfileProps) => {
  const [open, setOpen] = useState(false);
  const { nome, foto } = useUserStore().user;
  const [infoModal, setInfoModal] = useState(false);

  return (
    <div className="relative">
      <GptFormModal open={infoModal} setOpen={setInfoModal} />
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "text-primary sm:min-w-[150px] font-bold bg-background hover:bg-[#c8c5e9] rounded-lg text-sm px-4 py-2 flex items-center",
          className
        )}
        {...rest}
      >
        <div
          style={{
            backgroundImage: foto ? `url('${foto}')` : "url('img/perfil.jpg')",
          }}
          className="w-8 h-8 bg-cover rounded-full mr-2"
        ></div>
        {nome?.split(" ")[0]}
        {open ? (
          <X size={17} weight="bold" className="ml-2" />
        ) : (
          <CaretDown size={17} weight="bold" className="ml-2" />
        )}
      </button>
      <div
        className={clsx(
          "z-10 absolute bg-white rounded-lg shadow  dark:bg-gray-700 mt-1 sm:min-w-[150px]",
          { hidden: !open }
        )}
      >
        <ul className="text-sm text-primary bg-background divide-y divide-white ">
          <li>
            <Link
              href={"/perfil"}
              className="flex items-center px-4 py-2 bg-background hover:bg-[#c8c5e9] cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <User size={17} weight="bold" className="mr-2" />
              Meu Perfil
            </Link>
          </li>
          <li>
            <div
              onClick={() => setInfoModal(true)}
              className="flex items-center px-4 py-2 bg-background hover:bg-[#c8c5e9] cursor-pointer"
            >
              <Key size={17} weight="bold" className="mr-2" />
              Chave GPT
            </div>
          </li>
          <li>
            <div
              onClick={logout}
              className="flex items-center px-4 py-2 bg-background hover:bg-[#c8c5e9] cursor-pointer"
            >
              <SignOut size={17} weight="bold" className="mr-2" />
              Log out
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};


