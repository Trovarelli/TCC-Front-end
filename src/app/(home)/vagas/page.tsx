"use client";
import { CandidatoModel, VagaModel } from "@/api/models";
import { DeleteVaga, GetAllCandidatos, GetAllVagas } from "@/api/requests";
import { TextInput, VagaCard, VagaFormModal, LoadingScreen, EmptyState } from "@/components";
import { useUserStore } from "@/store/user";
import { AxiosError } from "axios";
import Link from "next/link";
import { BriefcaseMetal, PlusCircle, UserList, MagnifyingGlass } from "phosphor-react";
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
  const { id: userId, empresa } = useUserStore().user;
  const [vagas, setVagas] = useState<VagaCandidatoModel[]>([]);
  const [vagasFiltradas, setVagasFiltradas] = useState<VagaCandidatoModel[]>([]);
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
      ]);
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
        regexPattern.test(option.descricao) || regexPattern.test(option.titulo)
      );
      setVagasFiltradas(filteredItems);
    } else {
      setVagasFiltradas(vagas);
    }
  }, [search, vagas]);

  const handleSelectForEdit = (vaga: VagaModel) => {
    setOpenCreate(true);
    setSelectedVaga(vaga);
  };

  const handleDeleteVaga = async (id: string) => {
    DeleteVaga({ userId, vagaId: id })
      .catch((err) => toast.error(err.response?.data.message))
      .finally(() => {
        setVagas((prev) => prev.filter((el) => el._id !== id));
      });
  };

  if (renderLoading) {
    return <LoadingScreen message="Carregando vagas..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-6 pt-24">
      <VagaFormModal
        title="Criar Vaga"
        setVagas={setVagas}
        setVaga={setSelectedVaga}
        vaga={selectedVaga}
        setOpen={setOpenCreate}
        open={openCreate}
        candidatos={candidatos}
      />

      <div className="max-w-7xl mx-auto">
        {}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Vagas</h1>
          <p className="text-xl text-gray-600">
            Gerencie suas vagas e encontre os melhores candidatos
          </p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {}
          <button
            onClick={() => {
              setSelectedVaga(defaultValues);
              setOpenCreate(true);
            }}
            className="md:col-span-2 card-gradient min-h-[160px] flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Criar Nova Vaga</h3>
              <p className="text-white/90">
                Adicione novas oportunidades de emprego
              </p>
            </div>
            <div className="flex justify-end">
              <PlusCircle size={48} className="group-hover:scale-110 transition-transform" weight="fill" />
            </div>
          </button>

          {}
          <Link href="/candidatos" className="card group hover:scale-105">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3">
                <UserList size={32} weight="fill" className="text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {candidatos.length}
              </div>
              <div className="text-sm text-gray-600">Candidatos</div>
            </div>
          </Link>

          {}
          <div className="card">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3">
                <BriefcaseMetal size={32} weight="fill" className="text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {vagas.length}
              </div>
              <div className="text-sm text-gray-600">Vagas Criadas</div>
            </div>
          </div>
        </div>

        {}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <MagnifyingGlass size={24} weight="bold" className="text-white" />
            </div>
            <TextInput
              label="Pesquisar vaga por título ou descrição"
              inputType="search"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {search ? `Resultados para "${search}"` : "Todas as Vagas"}
          </h2>

          <div className="space-y-4">
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
              <EmptyState
                title="Nenhuma vaga encontrada"
                description={search 
                  ? "Tente ajustar sua busca ou criar uma nova vaga"
                  : "Comece criando sua primeira vaga para atrair candidatos qualificados"
                }
                actionLabel="Criar Primeira Vaga"
                onAction={() => setOpenCreate(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

