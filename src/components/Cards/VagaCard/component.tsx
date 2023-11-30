"use client";
import { Trash } from "phosphor-react";
import { VagaCardProps } from "./types";
import { useState } from "react";
import { ConfirmationModal, VagaFormModal } from "@/components";
import { DeleteVaga } from "@/api/requests";

export const VagaCard = ({ vaga, quantity, userId }: VagaCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    DeleteVaga({ userId, vagaId: vaga._id });
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
        vaga={vaga}
        open={openEdit}
      />
      <div className="flex my-2 justify-between items-center w-full p-4 bg-[#D1CEFC] rounded-md text-sm py-6">
        <div>
          <div className="font-bold text-primary">{vaga.titulo}</div>
          {quantity} Candidatos
        </div>
        <div className="flex">
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
