import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type DeleteCandidatoParams = {userId: string; candidatoId: string}


export const DeleteCandidato = async ({userId, candidatoId}: DeleteCandidatoParams): Promise<AxiosResponse<undefined, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .post(`http://localhost:3001/candidate/${userId}/${candidatoId}`, 
      {},
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err)
      })
  };