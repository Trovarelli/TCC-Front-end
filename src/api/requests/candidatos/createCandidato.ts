import { CandidatoModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

type CreateCandidatoParams = {userId: string; curriculum: string}

export const CreateCandidato = async ({userId, curriculum}: CreateCandidatoParams): Promise<AxiosResponse<CandidatoModel, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .post(`https://tahr-api.vercel.app//candidate/${userId}`, 
      {
        curriculum,
      }, 
      {
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
        throw err
      })
  };
