import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const GetCurriculo = async ({ userId, candidatoId }: { userId: string; candidatoId: string }): Promise<AxiosResponse<{ curriculo: string }>> => {
  const token = Cookies.get('token');
  return axios
    .get(`https://tahr-api.onrender.com/candidate/curriculum/${userId}/${candidatoId}`, {
      headers: {
        'authorization': `Bearer ${token}`,
      },
    })
};
