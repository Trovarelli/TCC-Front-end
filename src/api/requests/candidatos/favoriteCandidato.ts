import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

export const FavoriteCandidato = async ({userId, candidatoId, favorito}: {userId: string; candidatoId: string; favorito: boolean}): Promise<AxiosResponse<undefined, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .post(`https://tahr-api.vercel.app//candidate/favorite/${userId}/${candidatoId}`, 
      {
        favorito,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
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
