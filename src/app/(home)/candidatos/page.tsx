"use client";

import { useState } from "react";
import {
  CheckBox,
  DefaultModal,
  UploadModal,
  LoadingScreen,
  EmptyState,
} from "@/components";
import ChipInput from "@/components/Inputs/ChipInput/component";
import { useCandidatos, useCandidatoFilter } from "@/hooks";
import { formatTagList } from "@/utils/formatters";
import clsx from "clsx";
import Spinner from "@/components/Spinner/component";
import { CandidatoCard } from "@/components/Cards/CandidatoCard";
import { MagnifyingGlass, Info, Upload } from "phosphor-react";

const Candidatos = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const {
    candidatos,
    loading,
    localLoading,
    deleteCandidato,
    updateFavorite,
  } = useCandidatos();

  const filteredCandidatos = useCandidatoFilter(candidatos, {
    tags,
    onlyFavorites,
  });

  if (loading) {
    return <LoadingScreen message="Carregando candidatos..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto">
        {}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidatos</h1>
          <p className="text-gray-600">
            Gerencie e organize todos os seus candidatos
          </p>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <MagnifyingGlass size={20} weight="bold" className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Busca Avançada</h3>
              </div>
              <ChipInput
                label="Pesquisar por competências, experiência, etc."
                fullWidth
                chipsValue={tags}
                setChipsValue={setTags}
              />
              <button
                onClick={() => setOpenUpload(true)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Upload size={20} weight="bold" />
                Fazer Upload de Currículos
              </button>
            </div>

            {}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Info size={20} weight="bold" className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Use tags para filtrar candidatos. Digite características como{" "}
                <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
                  Python
                </span>{" "}
                <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
                  React
                </span>{" "}
                ou{" "}
                <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
                  Sênior
                </span>
              </p>
              <button
                onClick={() => setInfoModal(true)}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
              >
                <Info size={16} weight="fill" />
                Ver filtros avançados
              </button>
            </div>
          </div>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className={clsx("text-sm", { "opacity-0": tags.length === 0 })}>
              <span className="text-gray-600">Buscando por:</span>{" "}
              <strong className="text-indigo-600">{formatTagList(tags)}</strong>
            </div>
            <CheckBox
              label="Somente favoritos"
              checked={onlyFavorites}
              setValue={() => setOnlyFavorites((prev) => !prev)}
            />
          </div>

          <div className="space-y-3">
            {filteredCandidatos.length > 0 ? (
              filteredCandidatos.map((candidato, idx) => (
                <CandidatoCard
                  onFavoriteClientCandidato={updateFavorite}
                  candidato={candidato}
                  key={idx}
                  onDelete={() => deleteCandidato(candidato._id)}
                />
              ))
            ) : (
              <EmptyState
                title="Nenhum candidato encontrado"
                description="Faça o upload de currículos para começar a gerenciar seus candidatos"
                actionLabel="Fazer Upload"
                onAction={() => setOpenUpload(true)}
              />
            )}
          </div>

          {localLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white/80 rounded-lg">
              <Spinner color="primary" size="md" />
            </div>
          )}
        </div>
      </div>

      {}
      <UploadModal open={openUpload} setOpen={setOpenUpload} />

      <DefaultModal open={infoModal}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Filtros Avançados</h3>
            <button
              onClick={() => setInfoModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Para filtrar com precisão, use o formato:{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-xs">
              chave:valor
            </code>
          </p>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-700 mb-2">Chaves disponíveis:</div>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="bg-gray-50 p-2 rounded">
                <code className="text-indigo-600 font-mono text-xs">nome:jose</code>
              </li>
              <li className="bg-gray-50 p-2 rounded">
                <code className="text-indigo-600 font-mono text-xs">idade:25</code>
              </li>
              <li className="bg-gray-50 p-2 rounded">
                <code className="text-indigo-600 font-mono text-xs">nivelProfissional:senior</code>
              </li>
              <li className="bg-gray-50 p-2 rounded">
                <code className="text-indigo-600 font-mono text-xs">escolaridade:superior</code>
              </li>
            </ul>
          </div>
        </div>
      </DefaultModal>
    </div>
  );
};

export default Candidatos;

