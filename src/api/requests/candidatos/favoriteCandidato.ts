import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const FavoriteCandidato = async ({userId, candidatoId, favorito}: {userId: string; candidatoId: string; favorito: boolean}): Promise<AxiosResponse<undefined, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .post(`http://localhost:3001/candidate/favorite/${userId}/${candidatoId}`, 
      {
        favorito,
      },
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
