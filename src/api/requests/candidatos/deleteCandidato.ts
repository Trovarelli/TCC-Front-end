import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

type DeleteCandidatoParams = {userId: string; candidatoId: string}


export const DeleteCandidato = async ({userId, candidatoId}: DeleteCandidatoParams): Promise<AxiosResponse<undefined, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .post(`https://tahr-api.vercel.app/candidate/${userId}/${candidatoId}`, 
      {},
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
        throw new Error(err)
      })
  };