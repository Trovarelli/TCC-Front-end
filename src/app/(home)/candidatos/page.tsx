"use client";

import { CheckBox } from "@/components";
import ChipInput from "@/components/Inputs/ChipInput/component";
import Spinner from "@/components/Spinner/component";
import { useEffect, useState } from "react";

const Candidatos = () => {
  const [renderLoading, setRenderLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setRenderLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="bg-background p-4 min-h-screen">
      {renderLoading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <div>
          <div className="w-full bg-white rounded-md p-3 grid grid-cols-2 gap-3 divide-x divide-gray-400">
            <div className="flex items-center w-full">
              <ChipInput
                label={"Pesquisar Candidatos"}
                fullWidth
                chipsValue={[]}
                setChipsValue={function (v: string[]): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
            <div className="p-3 grid grid-cols-3 gap-3">
              <CheckBox label="Assistente" />
              <CheckBox label="Junior" />
              <CheckBox label="Pleno" />
              <CheckBox label="Senior" />
              <CheckBox label="Integral" />
              <CheckBox label="Meio Periodo" />
              <CheckBox label="Noturno" />
              <CheckBox label="Presencial" />
              <CheckBox label="Remoto" />
              <CheckBox label="Hibrido" />
            </div>
          </div>
          <div className="w-full bg-white rounded-md px-3 mt-5">
            Aqui, uma busca de candidatos que possuem, “Adobe Photoshop”, “Adobe
            Illustrator” em seu currículo em Todos os Candidatos.
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidatos;
