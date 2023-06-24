"use client";
import { TextInput, VagaCard, VagaFormModal } from "@/components";
import Spinner from "@/components/Spinner/component";
import { BriefcaseMetal, PlusCircle, UserList } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Vagas() {
  const [renderLoading, setRenderLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRenderLoading(false);
    }, 3000);
  }, []);

  const handleCreate = () => {};

  return (
    <div className="bg-background p-4 flex items-center min-h-screen justify-center">
      <VagaFormModal
        title="Criar Vaga"
        setOpen={setOpenCreate}
        action={handleCreate}
        open={openCreate}
      />
      {renderLoading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <div className="md:p-10 max-w-[1200px] grid grid-cols-vagas grid-rows-vagas gap-4">
          <div
            onClick={() => setOpenCreate(true)}
            className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-between flex-col col-span-2 row-span-2"
          >
            Adicionar novas vagas de emprego
            <PlusCircle size={32} className="mt-4" />
          </div>
          <div className="bg-white text-primary row-end-4 rounded-md p-4 flex justify-center items-center flex-col">
            <UserList size={40} weight="fill" />
            <span className="text-black font-bold">231</span>
            Candidatos
          </div>
          <div className="bg-white text-primary row-end-4 rounded-md p-4 flex justify-center items-center flex-col">
            <BriefcaseMetal size={40} weight="fill" />
            <span className="text-black font-bold">15</span>
            <span>Vagas</span>
          </div>
          <div className="bg-white rounded-md p-4 flex items-center col-span-3">
            <TextInput
              label="Pesquisar nome da vaga"
              inputType="search"
              fullWidth
            />
          </div>
          <div className="bg-white rounded-md px-4 py-2 flex flex-col items-center col-span-3 row-start-2 row-span-5">
            <div className="w-full max-h-80 overflow-y-auto">
              <VagaCard title="UX Designer" quantity={25} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
