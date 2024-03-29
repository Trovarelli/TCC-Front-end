import { VagaModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const GetAllVagas = async ({userId}: {userId: string}): Promise<AxiosResponse<VagaModel[], undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .get(`https://tahr-api.onrender.com/job/${userId}`, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err)
      })
  };
