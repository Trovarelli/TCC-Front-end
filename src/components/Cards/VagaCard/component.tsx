"use client";
import { PencilSimple, Trash } from "phosphor-react";
import { VagaCardProps } from "./types";
import { useState } from "react";
import {
  DefaultModal,
  ConfirmationModal,
  Button,
  TextInput,
  TextArea,
} from "@/components";
import ChipInput from "@/components/Inputs/ChipInput/component";

interface VagaModel {
  titulo: string;
  descricao: string;
  tags: string[];
  candidatos?: any[];
}

export const VagaCard = ({
  title,
  quantity,
  onDelete,
  onEdit,
}: VagaCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [values, setValues] = useState<VagaModel>({
    titulo: "",
    descricao: "",
    tags: [],
  });

  const handleSetTags = (v: string[]) => {
    setValues({ ...values, tags: v });
  };

  const handleDelete = () => {
    setOpenDelete(false);
    onDelete && onDelete();
  };

  const handleEdit = () => {
    setOpenEdit(false);
    onEdit && onEdit();
  };

  const handleOnChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [v.target.id]: v.target.value });
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
      <DefaultModal open={openEdit} size="md">
        <div className="text-xl font-bold text-primary text-center mb-4">
          Editar Vaga
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextInput
            id="titulo"
            label="Titulo"
            onChange={handleOnChange}
            value={values.titulo}
          />
          <ChipInput
            label="Caracteristicas"
            state="error"
            chipsValue={values.tags}
            setChipsValue={handleSetTags}
          />
          <div className="col-span-2">
            <TextArea
              id="descricao"
              label="Descrição da vaga"
              onChange={handleOnChange}
              value={values.descricao}
            />
          </div>
        </div>
        <div className="w-full mt-12 flex justify-end items-center">
          <div
            onClick={() => setOpenEdit(false)}
            className="text-center px-4 text-primary cursor-pointer"
          >
            Cancelar
          </div>
          <Button btnName="Gravar" color="success" onClick={handleEdit} />;
        </div>
      </DefaultModal>
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
