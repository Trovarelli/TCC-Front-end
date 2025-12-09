import { VagaModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type CreateVagaParams = {
  userId: string;
  titulo: string;
  descricao: string;
  caracteristicas: string[];
}

export const CreateVaga = async ({ userId, titulo, descricao, caracteristicas }: CreateVagaParams): Promise<AxiosResponse<VagaModel>> => {
  const token = Cookies.get('token');
  return axios
    .post(
      `https://tahr-api.onrender.com/job/${userId}`,
      {
        titulo,
        descricao,
        caracteristicas
      },
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }
    )
};
