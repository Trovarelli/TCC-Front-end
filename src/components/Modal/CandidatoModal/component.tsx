"use client";
import { PDFRenderModalProps } from "./types";
import { DefaultModal } from "../DefaultModal";
import { Heart, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/Buttons";
import { useUsertore } from "@/store";
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
  const { empresa, id } = useUsertore().user;
  const [loading, setLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const downloadPDF = (base64String: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    downloadLink.download = `Curriculo ${candidato.nome}.pdf`;
    downloadLink.click();
  };

  const handleGetCurriculo = async () => {
    setLoading(true);
    GetCurriculo({ userId: id, candidatoId: candidato._id })
      .then((res) => downloadPDF(res.data.curriculo))
      .catch((err) => {
        toast.error("Erro ao baixar curriculo");
      })
      .finally(() => setLoading(false));
  };

  const handleFavoriteCandidato = async (v: boolean) => {
    setFavoriteLoading(true);
    FavoriteCandidato({ userId: id, candidatoId: candidato._id, favorito: v })
      .then(() => {
        onFavoriteClientCandidato(candidato._id, v);
        setFavorite(v);
      })
      .catch(() => {
        toast.error("Erro ao favoritar candidato, tente novamente mais tarde");
      })
      .finally(() => setFavoriteLoading(false));
  };

  return (
    <DefaultModal
      open={open}
      size="lg"
      className="h-[80vh] overflow-y-scroll pb-4"
    >
      <div className="w-full flex justify-end">
        <X
          onClick={() => setOpen(false)}
          size={18}
          className="cursor-pointer mr-1 mt-1"
        />
      </div>
      <div className="w-full h-full p-4 flex flex-col gap-5">
        <div className="grid grid-cols-12">
          <div className="col-span-9 max-md:col-span-12">
            <div className="text-lg text-black font-bold flex gap-3 items-center justify-start max-md:justify-between">
              {candidato.nome}
              <Heart
                weight={favorite ? "fill" : "bold"}
                className={clsx(
                  "text-primary cursor-pointer text-[1.6rem] max-md:text-[1.8rem]",
                  {
                    "animate-pulse pointer-events-none": favoriteLoading,
                  }
                )}
                onClick={() => handleFavoriteCandidato(!favorite)}
              />
            </div>
            <div>- {candidato.idade ? candidato.idade + " anos" : ""}</div>
            <div>{candidato.profissao ? "- " + candidato.profissao : ""}</div>
          </div>
          <div className="col-span-3 max-md:col-span-12 flex justify-end items-center">
            <Button
              onClick={() => handleGetCurriculo()}
              btnName={"Baixar Curriculo"}
              fullWidth
              loading={loading}
            ></Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 relative pb-4">
          <div className="col-span-7 max-md:col-span-12 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="ml-3 font-bold text-primary">Escolaridade</div>
              <div className="border-t border-gray-400 w-full"></div>
              <div className="text-black">
                {candidato.escolaridade?.map((el) => (
                  <p>- {el}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="ml-3 font-bold text-primary">Experiências</div>
              <div className="border-t border-gray-400 w-full"></div>
              <div className="text-black">
                {candidato.experiencia?.map((el) => (
                  <p>- {el}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="ml-3 font-bold text-primary">Competencias</div>
              <div className="border-t border-gray-400 w-full"></div>
              <div className="text-black grid grid-cols-4">
                {candidato.competencias?.map((el) => (
                  <div className="col-span-2 max-sm:col-span-4">- {el}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-l border-gray-400 absolute h-full right-[41.5%] z-50 max-md:hidden"></div>

          <div className="col-span-5 max-md:col-span-12 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="ml-3 font-bold text-primary">Nível</div>
              <div className="border-t border-gray-400 w-full"></div>
              <div className="text-white px-6 rounded-full bg-primary w-fit">
                {candidato.nivelProfissional}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="ml-3 font-bold text-primary">Contato</div>
              <div className="border-t border-gray-400 w-full"></div>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${candidato.email}?&subject=Contato ${empresa}`}
                >
                  - {candidato?.email}
                </a>
                <div className="text-black grid grid-cols-4">
                  {candidato?.telefone &&
                    candidato.telefone.map((el) => (
                      <div className="col-span-2 max-sm:col-span-4">- {el}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultModal>
  );
};
