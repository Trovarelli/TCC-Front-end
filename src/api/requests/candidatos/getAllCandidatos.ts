import { CandidatoModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { createFilterFieldArray } from "./utils";

export const GetAllCandidatos = async ({userId}: {userId: string}): Promise<AxiosResponse<CandidatoModel[], undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .get(`http://localhost:3001/candidate/${userId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => createFilterFieldArray(res))
      .catch((err) => {
        throw new Error(err)
      })
  };
