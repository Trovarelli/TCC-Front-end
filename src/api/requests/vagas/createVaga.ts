import { VagaModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

type CreateVagaParams = Omit<VagaModel, 'matchField' | '_id'>

export const CreateVaga = async ({userId, caracteristicas, descricao, empresa, ativo, titulo}: CreateVagaParams): Promise<AxiosResponse<VagaModel, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .post(`https://tahr-api.vercel.app/job/${userId}`, 
      {
        userId,
        empresa,
        descricao,
        caracteristicas,
        titulo,
        ativo,
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
