import { CandidatoModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const GetAllCandidatos = async ({userId}: {userId: string}): Promise<AxiosResponse<CandidatoModel[], undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .get(`https://tahr-api.vercel.app//candidate/${userId}`, {
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
