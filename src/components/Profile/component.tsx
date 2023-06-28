"use client";

import clsx from "clsx";
import { CaretDown, Gear, SignOut, User, X } from "phosphor-react";
import { useState } from "react";

interface ProfileProps {
  logout: () => void;
}

export const Profile = ({ logout }: ProfileProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-primary font-bold bg-background hover:bg-[#c8c5e9] rounded-lg text-sm px-4 py-2 flex items-center"
      >
        <div
          style={{
            backgroundImage: "url('img/perfil.webp')",
          }}
          className="w-8 h-8 bg-cover rounded-full mr-2"
        ></div>
        Username
        {open ? (
          <X size={17} weight="bold" className="ml-2" />
        ) : (
          <CaretDown size={17} weight="bold" className="ml-2" />
        )}
      </button>
      <div
        className={clsx(
          "z-10 absolute bg-white rounded-lg shadow w-full dark:bg-gray-700 mt-1",
          { hidden: !open }
        )}
      >
        <ul className="text-sm text-primary bg-background divide-y divide-white ">
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-background hover:bg-[#c8c5e9] cursor-pointer"
            >
              <User size={17} weight="bold" className="mr-2" />
              Meu Perfil
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-background hover:bg-[#c8c5e9] cursor-pointer"
            >
              <Gear size={17} weight="bold" className="mr-2" />
              Configurações
            </a>
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