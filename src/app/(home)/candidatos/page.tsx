"use client";

import { CandidatoCard, CheckBox, UploadModal } from "@/components";
import ChipInput from "@/components/Inputs/ChipInput/component";
import Spinner from "@/components/Spinner/component";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Candidatos = () => {
  const [renderLoading, setRenderLoading] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setRenderLoading(false);
    }, 1000);
  }, []);

  const handleFormatTags = () => {
    var string = "";
    for (var i = 0; i < tags.length; i++) {
      var elemento = '"' + tags[i] + '"';
      string += elemento;
      if (i < tags.length - 1) {
        string += ", ";
      }
    }

    return string;
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
          <div className="w-full bg-white rounded-md p-3 grid grid-cols-2 gap-3 divide-x divide-gray-400">
            <div className="flex flex-col justify-start w-full gap-4">
              <UploadModal setOpen={setOpenUpload} open={openUpload} />
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
            <div className="px-3 grid grid-cols-3 gap-3">
              <div className="col-span-3 text-center font-bold">
                Pré-definições
              </div>
              <CheckBox label="Assistente" setValue={handleCheckBoxChange} />
              <CheckBox setValue={handleCheckBoxChange} label="Junior" />
              <CheckBox setValue={handleCheckBoxChange} label="Pleno" />
              <CheckBox setValue={handleCheckBoxChange} label="Senior" />
              <CheckBox setValue={handleCheckBoxChange} label="Integral" />
              <CheckBox setValue={handleCheckBoxChange} label="Meio Periodo" />
              <CheckBox setValue={handleCheckBoxChange} label="Noturno" />
              <CheckBox setValue={handleCheckBoxChange} label="Presencial" />
              <CheckBox setValue={handleCheckBoxChange} label="Remoto" />
              <CheckBox setValue={handleCheckBoxChange} label="Hibrido" />
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
            <CandidatoCard />
            <CandidatoCard />
            <CandidatoCard />
            <CandidatoCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidatos;
