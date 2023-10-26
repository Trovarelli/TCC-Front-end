"use client";
import { ArrowRight, Trash } from "phosphor-react";
import { VagaCardProps } from "./types";
import { ChangeEvent, useState } from "react";
import React from "react";
import { PDFRenderModal } from "@/components/Modal/PDFRender";
import { ConfirmationModal } from "@/components/Modal";

export const CandidatoCard = ({
  onDelete,
  onEdit,
  candidato,
}: VagaCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openPDF, setOpenPDF] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    onDelete && onDelete();
  };

  return (
    <>
      <PDFRenderModal
        base64={candidato.curriculo}
        setOpen={setOpenPDF}
        title={candidato.nome}
        open={openPDF}
      />
      <ConfirmationModal
        type="delete"
        open={openDelete}
        setOpen={() => setOpenDelete(!openDelete)}
        onConfirm={handleDelete}
        title="Deseja excluir este candidato?"
        description="Ao deletar este candidato todos os dados salvos serão relativos ao mesmo perdidos."
      />
      <div className="my-2 grid grid-cols-12 gap-2 w-full p-4 bg-[#D1CEFC] rounded-md text-sm py-6">
        <div className="font-bold flex flex-col col-span-2 max-sm:col-span-6">
          Vaga
          <span className=" text-black">UX Designer</span>
        </div>
        <div className="font-bold flex flex-col col-span-2 max-sm:col-span-6">
          Nome
          <span className=" text-black">{candidato.nome}</span>
        </div>
        <div className="flex items-center max-sm:hidden col-span-5">
          {candidato?.caracteristicas.map((el, idx) => (
            <div
              key={idx}
              className="px-4 py-1 m-1 text-white bg-primary rounded-full"
            >
              {el}
            </div>
          ))}
        </div>
        <div
          onClick={() => setOpenPDF(true)}
          className="bg-primary flex font-bold h-fit items-center justify-center max-sm:col-span-12 text-white col-span-3 px-5 py-3 rounded-full cursor-pointer"
        >
          Visualizar Currículo
          <ArrowRight size={16} weight="bold" className="ml-2" />
        </div>
      </div>
    </>
  );
};
