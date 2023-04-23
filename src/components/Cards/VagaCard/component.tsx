"use client";
import { PencilSimple, Trash } from "phosphor-react";
import { VagaCardProps } from "./types";
import { useState } from "react";
import { ConfirmationModal } from "@/components/Modal/ConfirmationModal";

export const VagaCard = ({
  title,
  quantity,
  onDelete,
  onEdit,
}: VagaCardProps) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(false);
    onDelete && onDelete();
  };

  return (
    <>
      <ConfirmationModal
        type="delete"
        open={open}
        setOpen={() => setOpen(!open)}
        onConfirm={handleDelete}
        title="Deseja excluir está vaga ?"
        description={
          "Ao deletar esta vaga todos os dados salvos serão perdidos."
        }
      />
      <div className="flex my-2 justify-between items-center w-full p-4 bg-[#D1CEFC] rounded-md text-sm py-6">
        <div>
          <div className="font-bold text-primary">{title}</div>
          {quantity} Candidatos
        </div>
        <div className="flex">
          <PencilSimple
            onClick={onEdit}
            size={20}
            className="cursor-pointer text-primary"
            weight="fill"
          />
          <Trash
            onClick={() => setOpen(!open)}
            size={20}
            className="cursor-pointer text-error ml-5"
            weight="fill"
          />
        </div>
      </div>
    </>
  );
};
