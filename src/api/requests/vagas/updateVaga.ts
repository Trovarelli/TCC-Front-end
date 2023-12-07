import { VagaModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

type UpdateVagaParams = {titulo: string, descricao: string, caracteristicas: string[], userId: string, vagaId: string}

export const UpdateVaga = async ({userId, caracteristicas, descricao, titulo, vagaId}: UpdateVagaParams): Promise<AxiosResponse<VagaModel, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .patch(`https://tahr-api.onrender.com/job/${userId}/${vagaId}`, 
      {
        descricao,
        caracteristicas,
        titulo,
      }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => {
        if(err.response.status === 401) {
          Cookies.remove("token");
          router.push("/");
        }
        throw err
      })
  };
