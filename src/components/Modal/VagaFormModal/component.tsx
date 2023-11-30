"use client";
import { TextArea, TextInput } from "@/components/Inputs";
import { DefaultModal } from "../DefaultModal";
import ChipInput from "@/components/Inputs/ChipInput/component";
import { VagaFormModalProps } from "./types";
import { Button } from "@/components/Buttons";
import { useEffect, useState } from "react";
import { VagaModel } from "@/api/models";
import { CreateVaga } from "@/api/requests";
import { useUsertore } from "@/store";
import { toast } from "react-toastify";

export const VagaFormModal = ({
  open,
  title,
  setOpen,
  vaga,
}: VagaFormModalProps) => {
  const { id, empresa } = useUsertore().user;
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Omit<VagaModel, "matchField">>({
    _id: "",
    titulo: "",
    descricao: "",
    caracteristicas: [],
    empresa,
    userId: id,
    ativo: false,
  });

  useEffect(() => {
    if (vaga) {
      setValues(vaga);
    }
  }, [vaga]);

  const handleSetTags = (v: string[]) => {
    setValues({ ...values, caracteristicas: v });
  };

  const handleOnChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [v.target.id]: v.target.value });
  };

  const handleCreate = async () => {
    setLoading(true);
    const { caracteristicas, descricao, empresa, titulo, userId, ativo } =
      values;
    CreateVaga({
      caracteristicas,
      descricao,
      empresa,
      titulo,
      userId,
      ativo,
    })
      .then((res) => {
        setValues(res.data);
        setOpen(false);
      })
      .catch((err) => toast.error(err.response?.data.message))
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
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
          chipsValue={values.caracteristicas}
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
        <Button
          btnName="Cancelar"
          color="error"
          onClick={() => setOpen(false)}
          loading={loading}
        />
        ;
        <Button
          btnName="Gravar"
          color="success"
          onClick={handleCreate}
          loading={loading}
        />
        ;
      </div>
    </DefaultModal>
  );
};
