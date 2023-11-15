import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const GetCurriculo = async ({userId, candidatoId}: {userId: string; candidatoId: string}): Promise<AxiosResponse<{curriculo: string}, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .get(`http://localhost:3001/candidate/${userId}/${candidatoId}`, {
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
