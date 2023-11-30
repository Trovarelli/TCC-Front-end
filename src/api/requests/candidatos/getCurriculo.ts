import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

export const GetCurriculo = async ({userId, candidatoId}: {userId: string; candidatoId: string}): Promise<AxiosResponse<{curriculo: string}, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .get(`http://localhost:3001/candidate/curriculum/${userId}/${candidatoId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
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