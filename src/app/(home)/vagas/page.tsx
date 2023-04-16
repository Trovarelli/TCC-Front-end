"use client";

import { TextInput } from "@/components";
import Spinner from "@/components/Spinner/component";
import {
  BriefcaseMetal,
  MagnifyingGlass,
  PlusCircle,
  UserList,
} from "phosphor-react";
import { useEffect, useState } from "react";

export default function Vagas() {
  const [renderLoading, setRenderLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setRenderLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="bg-background p-4 min-h-screen flex items-center justify-center">
      {renderLoading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <Spinner color="primary" size={40} />
        </div>
      ) : (
        <div className="md:p-10 max-w-[1200px] grid grid-cols-vagas grid-rows-vagas gap-4">
          <div className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-between flex-col col-span-2 row-span-2">
            Adicionar novas vagas de emprego
            <PlusCircle size={32} className="mt-4" />
          </div>
          <div className="bg-white text-primary row-end-4 rounded-md p-4 flex justify-center items-center flex-col">
            <UserList size={40} weight="fill" />
            <span className="text-black font-bold">231</span>
            Candidatos
          </div>
          <div className="bg-white text-primary row-end-4 rounded-md p-4 flex justify-center items-center flex-col">
            <BriefcaseMetal size={40} weight="fill" />
            <span className="text-black font-bold">15</span>
            <span>Vagas</span>
          </div>
          <div className="bg-white rounded-md p-4 flex items-center col-span-3">
            <TextInput
              label="Pesquisar nome da vaga"
              inputType="search"
              fullWidth
            />
          </div>
          <div className="bg-white rounded-md p-4 flex items-center col-span-3 row-start-2 row-span-full ">
            AAAAAAA
          </div>
        </div>
      )}
    </div>
  );
}
