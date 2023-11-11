"use client";

import { CandidatoModel } from "@/api/models";
import { DeleteCandidato, GetAllCandidatos } from "@/api/requests";
import {
  CandidatoCard,
  CheckBox,
  Select,
  TextInput,
  UploadModal,
} from "@/components";
import ChipInput from "@/components/Inputs/ChipInput/component";
import Spinner from "@/components/Spinner/component";
import { useUsertore } from "@/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Candidatos = () => {
  const [renderLoading, setRenderLoading] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const { id } = useUsertore().user;
  const [candidatos, setCandidatos] = useState<CandidatoModel[]>([]);

  const handleGetAllCandidatos = () => {
    GetAllCandidatos({ userId: id })
      .then((res) => setCandidatos(res.data))
      .catch((err) => console.log(err.message))
      .finally(() => setRenderLoading(false));
  };

  useEffect(() => {
    handleGetAllCandidatos();
  }, []);

  const handleFormatTags = () => {
    let string = "";
    for (let i = 0; i < tags.length; i++) {
      let elemento = '"' + tags[i] + '"';
      string += elemento;
      if (i < tags.length - 1) {
        string += ", ";
      }
    }

    return string;
  };

  const handleDelete = (candidatoId: string) => {
    setRenderLoading(true);
    DeleteCandidato({ candidatoId, userId: id })
      .then(() => {
        setCandidatos((v) => v.filter((el) => el._id !== candidatoId));
      })
      .catch((err) => toast.error(err.response?.data.message))
      .finally(() => setRenderLoading(false));
  };

  const handleCheckBoxChange = (value: { label: string; checked: boolean }) => {
    if (value.checked) setTags((v) => [...v, value.label]);
    else setTags((v) => v.filter((tg) => tg !== value.label));
  };

  return (
    <div className="bg-background p-4 min-h-screen">
      {renderLoading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <div>
          <div className="w-full bg-white rounded-md p-3 grid grid-cols-2 gap-3 sm:divide-x sm:divide-gray-400">
            <div className="flex flex-col justify-start w-full gap-4 max-sm:col-span-2">
              <UploadModal
                setOpen={setOpenUpload}
                open={openUpload}
                handleGetAllCandidatos={handleGetAllCandidatos}
              />
              <div className="p-2 border border-black rounded-md">
                <div className="col-span-3 text-center font-bold mb-3">
                  Busca Avançada
                </div>
                <ChipInput
                  label={"Pesquisar Candidatos"}
                  fullWidth
                  chipsValue={tags}
                  setChipsValue={setTags}
                />
              </div>
            </div>
            <div className="px-3 grid grid-cols-3 max-sm:grid-cols-4 gap-3 max-sm:col-span-2">
              <div className="col-span-3 max-sm:col-span-4 text-center font-bold">
                Pré-definições
              </div>
              <div className="max-sm:col-span-2 flex justify-center items-center">
                <Select label={"Nível Profissional"} fullWidth options={[]} />
              </div>
              {/* <CheckBox
                label="Assistente"
                className="max-sm:col-span-2"
                setValue={handleCheckBoxChange}
              />
              <CheckBox
                setValue={handleCheckBoxChange}
                label="Júnior"
                className="max-sm:col-span-2"
              />
              <CheckBox
                className="max-sm:col-span-2"
                setValue={handleCheckBoxChange}
                label="Pleno"
              />
              <CheckBox
                className="max-sm:col-span-2"
                setValue={handleCheckBoxChange}
                label="Senior"
              />
              <CheckBox
                className="max-sm:col-span-2"
                setValue={handleCheckBoxChange}
                label="Estágio"
              />
              <CheckBox
                className="max-sm:col-span-2"
                setValue={handleCheckBoxChange}
                label="Homem"
              />
              <CheckBox
                className="max-sm:col-span-2"
                setValue={handleCheckBoxChange}
                label="Mulher"
              />
              <CheckBox
                className="max-sm:col-span-2"
                setValue={handleCheckBoxChange}
                label="LGBT+"
              />
              <CheckBox
                setValue={handleCheckBoxChange}
                label="PCD"
                className="max-sm:col-span-2"
              /> */}
            </div>
          </div>
          <div className="w-full bg-white rounded-md p-3 mt-5 text-primary">
            <div
              className={clsx("transition-all duration-100", {
                "opacity-0": tags.length == 0,
              })}
            >
              Aqui, uma busca de candidatos que possuem
              <strong>{handleFormatTags()}</strong> em seu currículo.
            </div>
            {candidatos.length > 0 ? (
              candidatos?.map((el, idx) => (
                <CandidatoCard
                  candidato={el}
                  key={idx}
                  onDelete={() => handleDelete(el._id)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center flex-col">
                Não foram encontrados candidatos salvos.
                <img src="/img/not-found.jpg" width={300} height={300}></img>
                <span
                  className="cursor-pointer"
                  onClick={() => setOpenUpload(true)}
                >
                  Clique aqui para fazer o upload dos seus curriculos
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidatos;
