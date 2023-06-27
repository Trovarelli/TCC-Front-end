"use client";
import { ArrowRight, PencilSimple, Trash } from "phosphor-react";
import { VagaCardProps } from "./types";
import { ChangeEvent, useState } from "react";
import { ConfirmationModal } from "@/components";
import React from "react";
import axios from "axios";
import { PDFRenderModal } from "@/components/Modal/PDFRender";

export const CandidatoCard = ({
  title,
  quantity,
  onDelete,
  onEdit,
}: VagaCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openPDF, setOpenPDF] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [view, setView] = useState("");

  const handleDelete = () => {
    setOpenDelete(false);
    onDelete && onDelete();
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (const key in e.target.files) {
        if (!isNaN(Number(key))) {
          const base64 = await handleBase64Convert(e.target.files[key]);
          setView(base64);
          break;
        }
      }
    }
  };

  const handleBase64Convert = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };
  return (
    <>
      <input
        multiple
        type="file"
        name="file"
        id="test"
        onChange={handleUpload}
        accept=".pdf"
        required
      />
      <PDFRenderModal
        base64={view}
        setOpen={setOpenPDF}
        title={""}
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
      <div className="flex my-2 justify-between items-center w-full p-4 bg-[#D1CEFC] rounded-md text-sm py-6">
        <div className="font-bold flex flex-col">
          Vaga
          <span className=" text-black">UX Designer</span>
        </div>
        <div className="font-bold flex flex-col">
          Nome
          <span className=" text-black">Jão</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="px-4 py-1 text-white bg-primary rounded-full">
            Junior
          </div>
          <div className="px-4 py-1 text-black bg-gray-200 rounded-full">
            Junior
          </div>
          <div className="px-4 py-1 text-white bg-primary rounded-full">
            Junior
          </div>
          <div className="px-4 py-1 text-white bg-primary rounded-full">
            Junior
          </div>
          <div className="px-4 py-1 text-white bg-primary rounded-full">
            Junior
          </div>
        </div>
        <div
          onClick={() => setOpenPDF(true)}
          className="bg-primary flex font-bold items-center text-white px-5 py-3 rounded-full cursor-pointer"
        >
          Ver mais
          <ArrowRight size={16} weight="bold" className="ml-2" />
        </div>
      </div>
    </>
  );
};
