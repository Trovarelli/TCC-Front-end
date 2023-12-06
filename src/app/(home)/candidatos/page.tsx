"use client";

import { CandidatoModel } from "@/api/models";
import { DeleteCandidato, GetAllCandidatos } from "@/api/requests";
import {
  CandidatoCard,
  CheckBox,
  DefaultModal,
  UploadModal,
} from "@/components";
import ChipInput from "@/components/Inputs/ChipInput/component";
import Spinner from "@/components/Spinner/component";
import { useUsertore } from "@/store";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Candidatos = () => {
  const [renderLoading, setRenderLoading] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const { id } = useUsertore().user;
  const [candidatos, setCandidatos] = useState<CandidatoModel[]>([]);
  const [filteredCandidatos, setFilteredCandidatos] = useState<
    CandidatoModel[]
  >([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const handleGetAllCandidatos = () => {
    GetAllCandidatos({ userId: id })
      .then((res) => setCandidatos(res.data))
      .catch((err) => console.log(err.message))
      .finally(() => setRenderLoading(false));
  };

  useEffect(() => {
    handleGetAllCandidatos();
  }, []);

  useEffect(() => {
    setFilteredCandidatos(() =>
      candidatos.filter((el) => {
        if (onlyFavorites) return el.favorito === true;
        else return true;
      })
    );
  }, [onlyFavorites, candidatos]);

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

  const handleFavoriteClientCandidato = (id: string, favorite: boolean) => {
    candidatos.map((el) => {
      if (el._id === id) el.favorito = favorite;
      return el;
    });
  };

  const handleDelete = (candidatoId: string) => {
    setLocalLoading(true);
    DeleteCandidato({ candidatoId, userId: id })
      .then(() => {
        setCandidatos((v) => v.filter((el) => el._id !== candidatoId));
      })
      .catch((err) => toast.error(err.response?.data.message))
      .finally(() => setLocalLoading(false));
  };

  const handleSanitizeTags = (tags: string[]) => {
    return tags.map((tg) => tg.toLowerCase());
  };

  useEffect(() => {
    if (tags.length > 0) {
      const precisionTags = handleSanitizeTags(
        tags.filter((el) => el.includes(":"))
      );
      const normalTags = handleSanitizeTags(
        tags.filter((el) => !el.includes(":"))
      );

      console.log(precisionTags, normalTags);
      setFilteredCandidatos((v) => {
        return v.filter((el) => {
          return (
            el.matchField.some((filter) => precisionTags.includes(filter)) ||
            el.matchField.some((filter) =>
              normalTags.includes(filter.split(":")[1])
            )
          );
        });
      });
    } else {
      setFilteredCandidatos(() =>
        candidatos.filter((el) => {
          if (onlyFavorites) return el.favorito === true;
          else return true;
        })
      );
    }
  }, [tags]);

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
                setCandidatos={setCandidatos}
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
            <div className="px-3 flex flex-col items-center gap-3 max-sm:col-span-2">
              <div className="text-center font-bold">Pré-definições</div>
              <div className="text-justify">
                Nossa busca avançada permite que você filtre candidatos por meio
                de tags, basta digitar a característica que deseja filtrar para
                que os candidatos com tal característica sejam exibidos.
                <br></br>
                Caso queira filtrar com mais precisão, para mais informações{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setInfoModal((prev) => !prev)}
                >
                  clique aqui.
                </span>
                <DefaultModal open={infoModal}>
                  <div className="flex flex-col">
                    <div
                      className="w-full cursor-pointer text-primary flex justify-end pr-3"
                      onClick={() => setInfoModal(false)}
                    >
                      X
                    </div>
                    <div className="flex flex-col px-3 pb-3">
                      <div>
                        Para mais precisão em seu filtro basta inserir uma chave
                        antes do parametro utilizado pelo filtro, por exemplo:
                        <strong>nome:jose</strong>. Aqui estão algumas das
                        chaves que poderão ser usadas para tornar sua busca mais
                        precisa:
                      </div>
                      <ul className="font-bold ml-3">
                        <li>nome</li>
                        <li>nivelProfissional</li>
                        <li>idade</li>
                        <li>caracteristicas</li>
                        <li>escolaridade</li>
                        <li>experiencia</li>
                      </ul>
                    </div>
                  </div>
                </DefaultModal>
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className={
                "w-full bg-white rounded-md p-3 mt-5 text-primary max-h-[100vh] overflow-y-scroll"
              }
            >
              <div className="grid grid-cols-12">
                <div
                  className={clsx(
                    "col-span-10 max-md:col-span-12 transition-all duration-100",
                    {
                      "opacity-0": tags.length == 0,
                    }
                  )}
                >
                  Aqui, uma busca de candidatos que possuem
                  <strong>{handleFormatTags()}</strong> em seu currículo.
                </div>
                <div className="col-span-2 max-md:col-span-12">
                  <div className="flex justify-end items-center w-full">
                    <CheckBox
                      label={"Somente favoritos"}
                      checked={onlyFavorites}
                      setValue={(value) => setOnlyFavorites((prev) => !prev)}
                    />
                  </div>
                </div>
              </div>
              {filteredCandidatos.length > 0 ? (
                filteredCandidatos?.map((el, idx) => (
                  <CandidatoCard
                    onFavoriteClientCandidato={handleFavoriteClientCandidato}
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
            {localLoading && (
              <div className="absolute inset-0 flex justify-center items-center z-50 bg-white bg-opacity-40">
                <Spinner color="primary" size="md" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidatos;
