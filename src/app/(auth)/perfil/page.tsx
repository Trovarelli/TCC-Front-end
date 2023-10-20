"use client";

import { Button, TextInput } from "@/components";
import { useUsertore } from "@/store";
import { useRouter } from "next/navigation";

const Perfil = () => {
  const router = useRouter();
  const { nome, foto } = useUsertore();

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1200px] w-full py-4 px-10 flex flex-col justify-center items-start gap-6">
        <Button
          btnName={"Voltar para o menu"}
          secondary
          icon="arrow"
          onClick={() => router.push("/dashboard")}
          className="max-sm:w-full"
        />
        <span className="text-subtitle font-bold">Configurações</span>
        <div className="border-t border-gray-400 w-full"></div>
        <span className="font-bold">Alterar foto de perfil</span>
        <div className="flex sm:flex-row flex-col w-full items-center justify-start gap-4">
          <div
            style={{
              backgroundImage:
                foto !== "" ? `url('${foto}')` : "url('img/perfil.jpg')",
            }}
            className="w-40 h-40 bg-cover rounded-full mr-2 "
          ></div>
          <div className="flex flex-col gap-4 justify-center max-sm:w-full">
            <Button
              btnName={"Salvar Imagem"}
              onClick={() => alert("SALVAR IMAGEM")}
              className="max-sm:w-full"
            />
            <Button
              btnName={"Excluir Imagem"}
              onClick={() => alert("EXCLUIR IMAGEM")}
              secondary
              className="!text-error max-sm:w-full !border-error hover:!bg-error hover:!text-white"
            />
          </div>
        </div>
        <div className="border-t border-gray-400 w-full"></div>
        <div className="sm:w-[50%] w-full flex flex-col gap-4">
          <TextInput label={"Nome de usuário"} />
          <TextInput label={"E-mail"} />
          <TextInput label={"Nova senha"} inputType="password" />
          <TextInput label={"Confirmar nova senha"} inputType="password" />
        </div>
        <div className="border-t border-gray-400 w-full"></div>
        <Button
          btnName={"Salvar configurações de conta"}
          onClick={() => alert("SALVAR")}
          secondary
          rounded
          className="max-sm:w-full"
        />
        <div className="flex flex-col gap-2">
          <a
            href="mailto:suport@tahr.com?cc=tahr@gmail.com&subject=Suporte ao usuário"
            className="cursor-pointer text-primary"
          >
            Suporte ao usuário
          </a>
          <a
            href="/termos-de-uso.pdf"
            target="_blank"
            className="cursor-pointer text-primary"
          >
            Termos de uso
          </a>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
