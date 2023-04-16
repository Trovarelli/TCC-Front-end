"use client";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseMetal,
  PlusCircle,
  UserList,
} from "phosphor-react";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/component";

export default function Dashboard() {
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRenderLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="bg-background p-4 min-h-screen flex justify-center">
      {renderLoading ? (
        <div className="flex h-screen w-full justify-center items-center">
          <Spinner color="primary" size={40} />
        </div>
      ) : (
        <div className="md:p-20 flex flex-col max-w-[1000px] max-h-[1000px]">
          <div className="text-3xl">
            Olá <strong>Username</strong>,<br /> seja bem vindo!
          </div>
          <div className="grid sm:grid-cols-5 grid-cols-1 gap-4 mt-14 text-lg text-primary">
            <Link
              href="/candidatos"
              className="bg-white rounded-md p-4 flex justify-center items-center flex-col"
            >
              <UserList size={40} weight="fill" />
              <span className="text-black font-bold">131</span>
              Candidatos
            </Link>
            <Link
              href="/vagas"
              className="bg-white cursor-pointer rounded-md p-4 flex justify-center items-center flex-col"
            >
              <BriefcaseMetal size={40} weight="fill" />
              <span className="text-black font-bold">15</span>
              Vagas
            </Link>
            <div className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-center flex-col col-span-2">
              Adicionar novos candidatos na base de currículos
              <PlusCircle size={32} className="mt-4" />
            </div>
            <div className="bg-white cursor-pointer max-sm:col-span-2 rounded-md p-4 flex justify-center flex-col items-center">
              TERÇA FEIRA
              <div>
                <span className="text-black">28</span> MAR.
                <span className="text-black">2023</span>
              </div>
              <div>
                <span className="text-black">13:39</span> PM
              </div>
            </div>

            <div className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-center flex-col col-span-2">
              Gerenciamento de vagas e candidatos existentes
              <div className="flex text-sm items-center mt-4">
                Ver mais
                <ArrowRight size={20} className="ml-2" />
              </div>
            </div>
            <div className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-between flex-col col-span-2">
              Adicionar novas vagas de emprego
              <PlusCircle size={32} className="mt-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
