"use client";

import { TextArea, TextInput } from "@/components/Inputs";
import { DefaultModal } from "../DefaultModal";
import ChipInput from "@/components/Inputs/ChipInput/component";
import { VagaFormModalProps, VagaModel } from "./types";
import { Button } from "@/components/Buttons";
import { useEffect, useState } from "react";

export const VagaFormModal = ({
  open,
  title,
  setOpen,
  action,
  vaga,
}: VagaFormModalProps) => {
  const [values, setValues] = useState<VagaModel>({
    id: "",
    titulo: "",
    descricao: "",
    tags: [],
  });

  useEffect(() => {
    if (vaga) {
      setValues(vaga);
    }
  }, [vaga]);

  const handleSetTags = (v: string[]) => {
    setValues({ ...values, tags: v });
  };

  const handleOnChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [v.target.id]: v.target.value });
  };

  return (
    <DefaultModal open={open} size="md" className="p-4">
      <div className="text-xl font-bold text-primary text-center mb-4">
        {title}
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
          onClick={() => setOpen(false)}
          className="text-center px-4 text-primary cursor-pointer"
        >
          Cancelar
        </div>
        <Button btnName="Gravar" color="success" onClick={action} />;
      </div>
    </DefaultModal>
  );
};
