"use client";
import { TextArea, TextInput } from "@/components/Inputs";
import { DefaultModal } from "../DefaultModal";
import ChipInput from "@/components/Inputs/ChipInput/component";
import { VagaFormModalProps } from "./types";
import { Button } from "@/components/Buttons";
import { useState } from "react";
import { CreateVaga, UpdateVaga } from "@/api/requests";
import { toast } from "react-toastify";
import { z } from "zod";
import { useUsertore } from "@/store";
import { CreateVagaValidator } from "@/validations";

export const VagaFormModal = ({
  open,
  title,
  setOpen,
  setVaga,
  candidatos,
  setVagas,
  vaga,
}: VagaFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    titulo: "",
    caracteristicas: "",
    descricao: "",
  });
  const { id, empresa } = useUsertore().user;

  const handleSetTags = (v: string[]) => {
    setVaga({ ...vaga, caracteristicas: v });
    setErrors((prev) => ({ ...prev, caracteristicas: "" }));
  };

  const handleOnChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, [v.target.id]: "" }));
    setVaga({ ...vaga, [v.target.id]: v.target.value });
  };

  const handleCreateEdit = async () => {
    try {
      CreateVagaValidator.parse(vaga);
    } catch (err) {
      if (err instanceof z.ZodError) {
        JSON.parse(err.message)?.forEach(
          (el: { path: string[]; message: string }) =>
            setErrors((prev) => ({ ...prev, [el.path[0]]: el.message }))
        );
        toast.error("Por favor preencha os campos corretamente.");
        return;
      }
    }

    setLoading(true);
    const { caracteristicas, descricao, titulo, ativo, _id } = vaga;

    if (!_id) {
      CreateVaga({
        caracteristicas,
        descricao,
        empresa,
        titulo,
        userId: id,
        ativo,
      })
        .then((res) => {
          const avaliableCandidatos = candidatos.filter((candidato) =>
            candidato.matchField.some((c) =>
              res.data.matchField.some(
                (v) => v.split(":")[1] === c.split(":")[1] && c.split(":")[1]
              )
            )
          );

          const newVaga = { ...res.data, candidatos: avaliableCandidatos };

          setVagas((prev) => [newVaga, ...prev]);
          setOpen(false);
        })
        .catch((err) => toast.error(err.response?.data.message))
        .finally(() => {
          setLoading(false);
          setOpen(false);
        });
    } else {
      UpdateVaga({
        userId: id,
        caracteristicas: vaga.caracteristicas,
        descricao: vaga.descricao,
        titulo: vaga.titulo,
        vagaId: vaga._id,
      })
        .then(() => {
          toast.success("vaga atualizada com sucesso");
          setVagas((prev) =>
            prev.map((el) => {
              if (el._id === vaga._id) {
                const avaliableCandidatos = candidatos.filter((candidato) =>
                  candidato.matchField.some((c) =>
                    el.matchField.some(
                      (v) =>
                        v.split(":")[1] === c.split(":")[1] && c.split(":")[1]
                    )
                  )
                );
                const newVaga = { ...vaga, candidatos: avaliableCandidatos };
                return newVaga;
              }

              return el;
            })
          );
        })
        .catch((err) => toast.error(err.response?.data.message))
        .finally(() => {
          setLoading(false);
          setOpen(false);
        });
    }
  };

  return (
    <DefaultModal open={open} size="md" className="p-4">
      <div className="text-xl font-bold text-primary text-center mb-4">
        {title}
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 max-md:col-span-12">
          <TextInput
            id="titulo"
            label="Titulo"
            onChange={handleOnChange}
            helperText={errors.titulo}
            state={errors.titulo ? "error" : undefined}
            value={vaga.titulo}
          />
        </div>
        <div className="col-span-6 max-md:col-span-12">
          <ChipInput
            label="Caracteristicas"
            chipsValue={vaga.caracteristicas}
            setChipsValue={handleSetTags}
            state={errors.caracteristicas ? "error" : undefined}
            helperText={errors.caracteristicas}
          />
        </div>
        <div className="col-span-12">
          <TextArea
            id="descricao"
            label="Descrição da vaga"
            onChange={handleOnChange}
            value={vaga.descricao}
            helperText={errors.descricao}
            state={errors.descricao ? "error" : undefined}
          />
        </div>
      </div>
      <div className="w-full mt-12 flex justify-end items-center gap-3">
        <Button
          btnName="Cancelar"
          color="error"
          onClick={() => {
            setOpen(false);
            setErrors({
              titulo: "",
              caracteristicas: "",
              descricao: "",
            });
          }}
          loading={loading}
        />
        <Button
          btnName="Gravar"
          color="success"
          onClick={handleCreateEdit}
          loading={loading}
        />
      </div>
    </DefaultModal>
  );
};
