import { VagaModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const GetAllVagas = async ({userId}: {userId: string}): Promise<AxiosResponse<VagaModel[], undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .get(`http://localhost:3001/job/${userId}`, {
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
