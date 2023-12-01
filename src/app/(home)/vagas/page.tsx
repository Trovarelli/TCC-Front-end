"use client";
import { CandidatoModel, VagaModel } from "@/api/models";
import { DeleteVaga, GetAllCandidatos, GetAllVagas } from "@/api/requests";
import { TextInput, VagaCard, VagaFormModal } from "@/components";
import Spinner from "@/components/Spinner/component";
import { useUsertore } from "@/store";
import { AxiosError } from "axios";
import Link from "next/link";
import { BriefcaseMetal, PlusCircle, UserList } from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const defaultValues = {
  _id: "",
  titulo: "",
  descricao: "",
  caracteristicas: [],
  empresa: "",
  userId: "",
  ativo: false,
  candidatos: [],
};

export interface VagaCandidatoModel extends VagaModel {
  candidatos: CandidatoModel[];
}

export default function Vagas() {
  const [renderLoading, setRenderLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const { id: userId, empresa } = useUsertore().user;
  const [vagas, setVagas] = useState<VagaCandidatoModel[]>([]);
  const [selectedVaga, setSelectedVaga] = useState<
    Omit<VagaModel, "matchField">
  >({ ...defaultValues, userId, empresa });
  const [candidatos, setCandidatos] = useState<CandidatoModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setRenderLoading(true);

      try {
        const [vagasResponse, candidatosResponse] = await Promise.all([
          GetAllVagas({ userId }),
          GetAllCandidatos({ userId }),
        ]);
        setCandidatos(candidatosResponse.data);
        setVagas(
          vagasResponse.data.map((el) => {
            const avaliableCandidatos = candidatosResponse.data.filter(
              (candidato) =>
                candidato.matchField.some((c) =>
                  el.matchField.some((v) => v.split(":")[1] === c.split(":")[1])
                )
            );
            return {
              ...el,
              candidatos: avaliableCandidatos,
            };
          })
        );
      } catch (error) {
        if (error instanceof AxiosError)
          toast.error(error.response?.data.message);
      } finally {
        setRenderLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleSelectForEdit = (vaga: VagaModel) => {
    setOpenCreate((prev) => !prev);
    setSelectedVaga(vaga);
  };

  const handleDeleteVaga = async (id: string) => {
    DeleteVaga({ userId, vagaId: id })
      .catch((err) => toast.error(err.response?.data.message))
      .finally(() => {
        setVagas((prev) => prev.filter((el) => el._id !== id));
      });
  };

  return (
    <div className="bg-background p-4 flex items-center min-h-screen justify-center">
      <VagaFormModal
        title="Criar Vaga"
        setVagas={setVagas}
        setVaga={setSelectedVaga}
        vaga={selectedVaga}
        setOpen={setOpenCreate}
        open={openCreate}
        candidatos={candidatos}
      />
      {renderLoading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <div className="md:p-10 max-w-[1200px] grid grid-cols-vagas grid-rows-vagas gap-4">
          <div
            onClick={() => {
              setSelectedVaga(defaultValues);
              setOpenCreate(true);
            }}
            className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-between flex-col col-span-2 row-span-2"
          >
            Adicionar novas vagas de emprego
            <PlusCircle size={32} className="mt-4" />
          </div>
          <Link
            href={"/candidatos"}
            className="bg-white text-primary row-end-4 rounded-md p-4 flex justify-center items-center flex-col"
          >
            <UserList size={40} weight="fill" />
            <span className="text-black font-bold">{candidatos.length}</span>
            Candidatos
          </Link>
          <div className="bg-white text-primary row-end-4 rounded-md p-4 flex justify-center items-center flex-col">
            <BriefcaseMetal size={40} weight="fill" />
            <span className="text-black font-bold">{vagas.length}</span>
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
            <div className="w-full max-h-96 overflow-y-auto">
              {vagas.length > 0 ? (
                vagas.map((el) => (
                  <VagaCard
                    vaga={el}
                    candidatos={el.candidatos}
                    userId={userId}
                    setOpenModal={() => handleSelectForEdit(el)}
                    onDelete={() => handleDeleteVaga(el._id)}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center flex-col">
                  Não foram encontradas vagas salvas.
                  <img src="/img/not-found.jpg" width={300} height={300}></img>
                  <span
                    className="cursor-pointer text-primary"
                    onClick={() => setOpenCreate(true)}
                  >
                    Clique aqui para fazer poder criar sua primeira vaga!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
