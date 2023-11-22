"use client";
import { ArrowRight, Trash } from "phosphor-react";
import { CandidatoCardProps } from "./types";
import { useMemo, useState } from "react";
import React from "react";
import { CandidatoModal } from "@/components/Modal/CandidatoModal";
import { ConfirmationModal } from "@/components/Modal";

export const CandidatoCard = ({
  onDelete,
  candidato,
  onFavoriteClientCandidato,
}: CandidatoCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openPDF, setOpenPDF] = useState(false);

  const sanitizedCaracteristicas = useMemo(() => {
    const handleNivel = (
      v: "estagiario" | "junior" | "pleno" | "senior" | undefined
    ) => {
      switch (v) {
        case "estagiario":
          return "Estagiário";
        case "junior":
          return "Júnior";
        case "pleno":
          return "Pleno";
        case "senior":
          return "Sênior";
        default:
          return "";
      }
    };
    const caracteristicas = {
      genero: candidato.genero === "M" ? "Masculino" : "Feminino",
      pcd: candidato.pcd ? "PcD" : "",
      lgbtq: candidato.lgbtq ? "LGBTQ+" : "",
      nivel: handleNivel(candidato.nivelProfissional),
    };

    const customCaracteristicas = Object.values(caracteristicas).filter(
      (el) => el !== ""
    );
    return [
      ...customCaracteristicas,
      ...(candidato.competencias ?? []),
      ...(candidato.caracteristicas ?? []),
    ];
  }, [candidato]);

  const handleDelete = () => {
    setOpenDelete(false);
    onDelete();
  };

  return (
    <>
      <CandidatoModal
        candidato={candidato}
        setOpen={setOpenPDF}
        open={openPDF}
        onFavoriteClientCandidato={onFavoriteClientCandidato}
      />
      <ConfirmationModal
        type="delete"
        open={openDelete}
        setOpen={() => setOpenDelete(!openDelete)}
        onConfirm={handleDelete}
        title="Deseja excluir este candidato?"
        description="Ao deletar este candidato todos os dados salvos serão perdidos."
      />
      <div className="my-2 grid grid-cols-12 gap-2 w-full p-4 bg-[#D1CEFC] rounded-md text-sm py-6 relative">
        <div className="absolute right-2 top-2">
          <div
            onClick={() => setOpenDelete(!openDelete)}
            className="flex justify-center items-center p-[0.35rem] rounded-full bg-white text-center"
          >
            <Trash
              size={16}
              className="cursor-pointer text-primary"
              weight="fill"
            />
          </div>
        </div>
        <div className="font-bold flex flex-col col-span-2 max-sm:col-span-6">
          Idade
          <span className=" text-black">
            {candidato.idade ? `${candidato.idade} anos` : "Não informado."}
          </span>
        </div>
        <div className="font-bold flex flex-col col-span-2 max-sm:col-span-6">
          Nome
          <span className=" text-black">{candidato.nome}</span>
        </div>
        <div className="flex items-center max-sm:hidden col-span-5 max-md:col-span-4">
          {sanitizedCaracteristicas.slice(0, 4).map((el, idx) => (
            <div
              key={idx}
              onClick={() => setOpenPDF(true)}
              className="px-4 py-1 m-1 text-white bg-primary cursor-pointer rounded-full max-md:opacity-0"
            >
              {el}
            </div>
          ))}
          <span className="max-md:opacity-0">
            + {sanitizedCaracteristicas.length - 4}
          </span>
        </div>
        <div className="max-sm:col-span-12 text-white col-span-3 max-md:col-span-4 flex items-center justify-center">
          <div
            onClick={() => setOpenPDF(true)}
            className="bg-primary flex font-bold h-fit items-center justify-center max-sm:w-full px-5 py-3 rounded-full cursor-pointer"
          >
            Visualizar Currículo
            <ArrowRight size={16} weight="bold" className="ml-2" />
          </div>
        </div>
      </div>
    </>
  );
};
