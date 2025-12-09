import { CandidatoModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const GetAllCandidatos = async ({ userId }: { userId: string }): Promise<AxiosResponse<CandidatoModel[]>> => {
  const token = Cookies.get('token');
  return axios
    .get(`https://tahr-api.onrender.com/candidate/${userId}`, {
      headers: {
        'authorization': `Bearer ${token}`,
      },
    })
}
