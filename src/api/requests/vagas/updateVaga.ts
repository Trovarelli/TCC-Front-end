import { VagaModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type UpdateVagaParams = {
  userId: string;
  vagaId: string;
  ativo?: boolean;
  caracteristicas?: string[];
  descricao?: string;
  titulo?: string;
}

export const UpdateVaga = async ({ userId, vagaId, ativo, caracteristicas, descricao, titulo }: UpdateVagaParams): Promise<AxiosResponse<VagaModel>> => {
  const token = Cookies.get('token');

  const body: any = {};
  if (ativo !== undefined) body.ativo = ativo;
  if (caracteristicas) body.caracteristicas = caracteristicas;
  if (descricao) body.descricao = descricao;
  if (titulo) body.titulo = titulo;

  return axios
    .patch(
      `https://tahr-api.onrender.com/job/${userId}/${vagaId}`,
      body,
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }
    )
};
