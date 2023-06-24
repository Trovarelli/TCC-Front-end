"use client";
import { PencilSimple, Trash } from "phosphor-react";
import { VagaCardProps } from "./types";
import { useState } from "react";
import { ConfirmationModal, VagaFormModal } from "@/components";

export const VagaCard = ({
  title,
  quantity,
  onDelete,
  onEdit,
}: VagaCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    onDelete && onDelete();
  };

  const handleEdit = () => {
    setOpenEdit(false);
    onEdit && onEdit();
  };

  return (
    <>
      <ConfirmationModal
        type="delete"
        open={openDelete}
        setOpen={() => setOpenDelete(!openDelete)}
        onConfirm={handleDelete}
        title="Deseja excluir está vaga ?"
        description="Ao deletar esta vaga todos os dados salvos serão perdidos."
      />
      <VagaFormModal
        title="Editar Vaga"
        setOpen={setOpenEdit}
        action={handleEdit}
        open={openEdit}
      />
      <div className="flex my-2 justify-between items-center w-full p-4 bg-[#D1CEFC] rounded-md text-sm py-6">
        <div>
          <div className="font-bold text-primary">{title}</div>
          {quantity} Candidatos
        </div>
        <div className="flex">
          <PencilSimple
            onClick={() => setOpenEdit(!openEdit)}
            size={20}
            className="cursor-pointer text-primary"
            weight="fill"
          />
          <Trash
            onClick={() => setOpenDelete(!openDelete)}
            size={20}
            className="cursor-pointer text-error ml-5"
            weight="fill"
          />
        </div>
      </div>
    </>
  );
};
