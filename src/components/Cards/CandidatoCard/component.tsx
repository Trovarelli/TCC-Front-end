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
    onDelete && onDelete();
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

      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all relative">
        {onDelete && (
          <button
            onClick={() => setOpenDelete(true)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
          >
            <Trash size={16} weight="fill" />
          </button>
        )}

        <div className="grid md:grid-cols-12 gap-4 items-center pr-8">
          {}
          <div className="md:col-span-3 space-y-1">
            <div className="text-xs text-gray-500">Nome</div>
            <div className="font-semibold text-gray-900">{candidato.nome}</div>
            <div className="text-xs text-gray-500">
              {candidato.idade ? `${candidato.idade} anos` : "Idade não informada"}
            </div>
          </div>

          {}
          <div className="md:col-span-6 flex flex-wrap gap-1.5">
            {sanitizedCaracteristicas.slice(0, 5).map((el, idx) => (
              <span
                key={idx}
                className="inline-block bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded text-xs font-medium hover:bg-indigo-100 cursor-pointer transition-colors"
                onClick={() => setOpenPDF(true)}
              >
                {el}
              </span>
            ))}
            {sanitizedCaracteristicas.length > 5 && (
              <span className="inline-block bg-gray-100 text-gray-600 px-2.5 py-1 rounded text-xs font-medium">
                +{sanitizedCaracteristicas.length - 5}
              </span>
            )}
          </div>

          {}
          <div className="md:col-span-3 flex justify-end">
            <button
              onClick={() => setOpenPDF(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              Ver Currículo
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

