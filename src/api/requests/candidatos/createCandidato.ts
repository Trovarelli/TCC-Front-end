import { CandidatoModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const CreateCandidato = async ({ userId, apiKey, formData }: { userId: string; apiKey: string; formData: FormData }): Promise<AxiosResponse<CandidatoModel, undefined>> => {
  const token = Cookies.get('token');
  return axios
    .post(
      `https://tahr-api.onrender.com/candidate/${userId}`,
      formData,
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'apiKey': apiKey
        },
      })
    .then((res) => res)
    .catch((err) => {
      throw new Error(err)
    })
};
