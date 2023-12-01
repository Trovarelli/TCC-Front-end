"use client";
import { Pencil, Trash, X } from "phosphor-react";
import { VagaCardProps } from "./types";
import { useState } from "react";
import { CandidatoCard, ConfirmationModal, DefaultModal } from "@/components";

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
      <DefaultModal open={openCandidatos} size="lg">
        <div className="p-3 flex flex-col max-h-[80vh] overflow-y-auto">
          <div className="w-full flex justify-end">
            <X
              onClick={() => setOpenCandidatos((prev) => !prev)}
              size={20}
              className="cursor-pointer text-primary "
              weight="fill"
            />
          </div>
          <div>
            {candidatos.length > 0 ? (
              candidatos?.map((el, idx) => (
                <CandidatoCard candidato={el} key={idx} />
              ))
            ) : (
              <div className="flex justify-center items-center flex-col">
                Infelizmente não foram encontrados candidatos adequados esta
                vaga.
                <img src="/img/not-found.jpg" width={300} height={300}></img>
              </div>
            )}
          </div>
        </div>
      </DefaultModal>
      <ConfirmationModal
        type="delete"
        open={openDelete}
        setOpen={() => setOpenDelete((prev) => !prev)}
        onConfirm={handleDeleteVaga}
        title="Deseja excluir está vaga ?"
        description="Ao deletar esta vaga todos os dados salvos serão perdidos."
      />
      <div className="flex my-2 justify-between items-center w-full p-4 bg-[#D1CEFC] rounded-md text-sm py-6">
        <div>
          <div className="font-bold text-primary">{vaga.titulo}</div>
          <span
            onClick={() => setOpenCandidatos(true)}
            className="cursor-pointer"
          >
            {candidatos.length} Candidatos
          </span>
        </div>
        <div className="flex gap-3">
          <Pencil
            onClick={() => setOpenModal()}
            size={20}
            className="cursor-pointer text-primary"
            weight="fill"
          />
          <Trash
            onClick={() => setOpenDelete((prev) => !prev)}
            size={20}
            className="cursor-pointer text-error ml-5"
            weight="fill"
          />
        </div>
      </div>
    </>
  );
};
