"use client";

import { Button } from "@/components";
import { useRouter } from "next/navigation";

const Perfil = () => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1200px] w-full p-4 flex flex-col justify-center items-start gap-6">
        <Button
          btnName={"Voltar para o menu"}
          secondary
          icon="arrow"
          onClick={() => router.push("/dashboard")}
        />
        <span className="text-subtitle font-bold">Configurações</span>
        <div className="border-t border-gray-400 w-full"></div>
        <span className="font-bold">Alterar foto de perfil</span>
      </div>
    </div>
  );
};

export default Perfil;
