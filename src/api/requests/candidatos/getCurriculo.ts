import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

export const GetCurriculo = async ({userId, candidatoId}: {userId: string; candidatoId: string}): Promise<AxiosResponse<{curriculo: string}, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .get(`https://tahr-api.vercel.app//candidate/curriculum/${userId}/${candidatoId}`, {
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
