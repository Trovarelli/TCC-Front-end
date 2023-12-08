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
  matchField: [],
};

export interface VagaCandidatoModel extends VagaModel {
  candidatos: CandidatoModel[];
}

export default function Vagas() {
  const [renderLoading, setRenderLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const { id: userId, empresa } = useUsertore().user;
  const [vagas, setVagas] = useState<VagaCandidatoModel[]>([]);
  const [vagasFiltradas, setVagasFiltradas] = useState<VagaCandidatoModel[]>(
    []
  );
  const [selectedVaga, setSelectedVaga] = useState<VagaModel>({
    ...defaultValues,
    userId,
    empresa,
  });
  const [candidatos, setCandidatos] = useState<CandidatoModel[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setRenderLoading(true);
    try {
      const [vagasResponse, candidatosResponse] = await Promise.all([
        GetAllVagas({ userId }),
        GetAllCandidatos({ userId }),
      ])
        .then((res) => res)
        .catch(() => []);
      setCandidatos(candidatosResponse.data);

      const newVagas = vagasResponse.data.map((vaga) => {
        const avaliableCandidatos = candidatosResponse.data.filter(
          (candidato) =>
            candidato.matchField.some((c) =>
              vaga.matchField.some((v) => {
                const vg = v.split(":")[1];
                const cd = c.split(":")[1];
                return vg && cd && cd === vg;
              })
            )
        );

        return {
          ...vaga,
          candidatos: avaliableCandidatos,
        };
      });

      setVagas(newVagas);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
      else toast.error("Erro interno");
    } finally {
      setRenderLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (search) {
      const regexPattern = new RegExp(
        search
          .split("")
          .map((char) => `(${char})`)
          .join(".*"),
        "i"
      );
      const filteredItems = vagas.filter((option) =>
        regexPattern.test(option.descricao)
      );
      setVagasFiltradas(filteredItems);
    } else {
      setVagasFiltradas(vagas);
    }
  }, [search, vagas]);

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
        <div className="md:p-10 max-w-[1200px] grid md:grid-cols-vagas md:grid-rows-vagas grid-cols-12 gap-4 max-md:w-screen">
          <div
            onClick={() => {
              setSelectedVaga(defaultValues);
              setOpenCreate(true);
            }}
            className="bg-primary cursor-pointer text-white max-md:row-end-1 rounded-md p-4 flex justify-between flex-col col-span-12 md:col-span-2 md:row-span-2"
          >
            Adicionar novas vagas de emprego
            <PlusCircle size={32} className="mt-4" />
          </div>
          <Link
            href={"/candidatos"}
            className="bg-white text-primary md:row-end-4 max-md:col-span-6 max-md:row-end-2 rounded-md p-4 flex justify-center items-center flex-col"
          >
            <UserList size={40} weight="fill" />
            <span className="text-black font-bold">{candidatos.length}</span>
            Candidatos
          </Link>
          <div className="bg-white text-primary md:row-end-4 max-md:col-span-6 max-md:row-end-2 rounded-md p-4 flex justify-center items-center flex-col">
            <BriefcaseMetal size={40} weight="fill" />
            <span className="text-black font-bold">{vagas.length}</span>
            <span>Vagas</span>
          </div>
          <div className="bg-white rounded-md p-4 flex items-center md:col-span-3 col-span-12 max-md:row-end-3">
            <TextInput
              label="Pesquisar nome da vaga"
              inputType="search"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="bg-white rounded-md px-4 py-2 flex flex-col items-center md:col-span-3 col-span-12 md:row-start-2 md:row-span-5">
            <div className="w-full max-h-96 overflow-y-auto">
              {vagasFiltradas.length > 0 ? (
                vagasFiltradas.map((el, idx) => (
                  <VagaCard
                    key={idx}
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
                  <img src="/img/not-found.jpg" width={200} height={200}></img>
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
