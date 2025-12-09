"use client";
import { PDFRenderModalProps } from "./types";
import { DefaultModal } from "../DefaultModal";
import { Heart, X, Download, Envelope, Phone, GraduationCap, Briefcase, Star, User } from "phosphor-react";
import { useState } from "react";
import { useUserStore } from "@/store/user";
import { FavoriteCandidato, GetCurriculo } from "@/api/requests";
import { toast } from "react-toastify";
import clsx from "clsx";

export const CandidatoModal = ({
  candidato,
  open,
  setOpen,
  onFavoriteClientCandidato,
}: PDFRenderModalProps) => {
  const [favorite, setFavorite] = useState(candidato.favorito || false);
  const { empresa, id } = useUserStore().user;
  const [loading, setLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const downloadPDF = (base64String: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    downloadLink.download = `Curriculo_${candidato.nome}.pdf`;
    downloadLink.click();
  };

  const handleGetCurriculo = async () => {
    setLoading(true);
    GetCurriculo({ userId: id, candidatoId: candidato._id })
      .then((res) => downloadPDF(res.data.curriculo))
      .catch(() => toast.error("Erro ao baixar currículo"))
      .finally(() => setLoading(false));
  };

  const handleFavoriteCandidato = async (v: boolean) => {
    setFavoriteLoading(true);
    FavoriteCandidato({ userId: id, candidatoId: candidato._id, favorito: v })
      .then(() => {
        onFavoriteClientCandidato && onFavoriteClientCandidato(candidato._id, v);
        setFavorite(v);
        toast.success(v ? "Candidato favoritado!" : "Favorito removido");
      })
      .catch(() => toast.error("Erro ao favoritar candidato"))
      .finally(() => setFavoriteLoading(false));
  };

  return (
    <DefaultModal open={open} size="lg" className="max-h-[90vh] overflow-hidden flex flex-col">
      {}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 pb-4 z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{candidato.nome}</h2>
              {onFavoriteClientCandidato && (
                <button
                  onClick={() => handleFavoriteCandidato(!favorite)}
                  disabled={favoriteLoading}
                  className={clsx(
                    "transition-all",
                    { "animate-pulse pointer-events-none": favoriteLoading }
                  )}
                >
                  <Heart
                    weight={favorite ? "fill" : "bold"}
                    size={28}
                    className={clsx(
                      "transition-colors",
                      favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    )}
                  />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {candidato.idade && (
                <div className="flex items-center gap-1.5">
                  <User size={16} weight="bold" />
                  <span>{candidato.idade} anos</span>
                </div>
              )}
              {candidato.profissao && (
                <div className="flex items-center gap-1.5">
                  <Briefcase size={16} weight="bold" />
                  <span>{candidato.profissao}</span>
                </div>
              )}
              {candidato.nivelProfissional && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-xs">
                  {candidato.nivelProfissional}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <button
          onClick={handleGetCurriculo}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>Baixando...</>
          ) : (
            <>
              <Download size={20} weight="bold" />
              Baixar Currículo
            </>
          )}
        </button>
      </div>

      {}
      <div className="p-6 overflow-y-auto flex-1">
        <div className="grid md:grid-cols-2 gap-6">
          {}
          <div className="space-y-6">
            {}
            {candidato.escolaridade && candidato.escolaridade.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <GraduationCap size={18} weight="bold" className="text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Escolaridade</h3>
                </div>
                <ul className="space-y-2">
                  {candidato.escolaridade.map((el, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {}
            {candidato.experiencia && candidato.experiencia.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Briefcase size={18} weight="bold" className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Experiências</h3>
                </div>
                <ul className="space-y-2">
                  {candidato.experiencia.map((el, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {}
            {candidato.competencias && candidato.competencias.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star size={18} weight="bold" className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Competências</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidato.competencias.map((el, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm text-gray-700"
                    >
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {}
          <div className="space-y-6">
            {}
            {(candidato.email || (candidato.telefone && candidato.telefone.length > 0)) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Envelope size={18} weight="bold" className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Contato</h3>
                </div>
                <div className="space-y-2">
                  {candidato.email && (
                    <a
                      href={`mailto:${candidato.email}?subject=Contato ${empresa}`}
                      className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <Envelope size={16} weight="bold" />
                      <span>{candidato.email}</span>
                    </a>
                  )}
                  {candidato.telefone && candidato.telefone.length > 0 && (
                    <div className="space-y-1">
                      {candidato.telefone.map((tel, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone size={16} weight="bold" />
                          <span>{tel}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {}
            {candidato.caracteristicas && candidato.caracteristicas.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Star size={18} weight="bold" className="text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Características</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidato.caracteristicas.map((el, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm text-gray-700"
                    >
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultModal>
  );
};

