"use client";
import { Pencil, Trash, X, Users } from "phosphor-react";
import { VagaCardProps } from "./types";
import { useState } from "react";
import Image from "next/image";
import { CandidatoCard } from "../CandidatoCard";
import { ConfirmationModal } from "../../Modal/ConfirmationModal";
import { DefaultModal } from "../../Modal/DefaultModal";

export const VagaCard = ({
  vaga,
  candidatos,
  setOpenModal,
  onDelete,
}: VagaCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openCandidatos, setOpenCandidatos] = useState(false);

  const handleDeleteVaga = () => {
    setLoading(true);
    onDelete().finally(() => {
      setLoading(false);
      setOpenDelete(false);
    });
  };

  return (
    <>
      {}
      <DefaultModal open={openCandidatos} size="lg">
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Candidatos para {vaga.titulo}
              </h3>
              <p className="text-gray-600 mt-1">
                {candidatos.length} candidato{candidatos.length !== 1 ? "s" : ""} encontrado{candidatos.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setOpenCandidatos(false)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X size={24} className="text-gray-600" weight="bold" />
            </button>
          </div>

          <div className="space-y-4">
            {candidatos.length > 0 ? (
              candidatos.map((el, idx) => (
                <CandidatoCard candidato={el} key={idx} />
              ))
            ) : (
              <div className="text-center py-12">
                <Image
                  src="/img/not-found.jpg"
                  width="300"
                  height="300"
                  alt="Sem candidatos"
                  className="mx-auto opacity-60 mb-4"
                />
                <p className="text-gray-600">
                  Nenhum candidato adequado encontrado para esta vaga.
                </p>
              </div>
            )}
          </div>
        </div>
      </DefaultModal>

      {}
      <ConfirmationModal
        type="delete"
        open={openDelete}
        setOpen={() => setOpenDelete((prev) => !prev)}
        onConfirm={handleDeleteVaga}
        title="Deseja excluir esta vaga?"
        description="Ao deletar esta vaga todos os dados salvos serão perdidos."
      />

      {}
      <div className="group card p-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        {}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="relative flex items-center justify-between">
          {}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{vaga.titulo}</h3>
            <button
              onClick={() => setOpenCandidatos(true)}
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              <Users size={20} weight="fill" />
              <span>{candidatos.length} Candidato{candidatos.length !== 1 ? "s" : ""}</span>
            </button>
          </div>

          {}
          <div className="flex gap-3">
            <button
              onClick={() => setOpenModal()}
              className="w-10 h-10 rounded-full bg-indigo-100 hover:bg-indigo-500 text-indigo-600 hover:text-white flex items-center justify-center transition-all hover:scale-110"
            >
              <Pencil size={18} weight="fill" />
            </button>
            <button
              onClick={() => setOpenDelete(true)}
              className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-500 text-red-600 hover:text-white flex items-center justify-center transition-all hover:scale-110"
            >
              <Trash size={18} weight="fill" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

