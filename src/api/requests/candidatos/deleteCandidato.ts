import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const DeleteCandidato = async ({ userId, candidatoId }: { userId: string; candidatoId: string }): Promise<AxiosResponse> => {
  const token = Cookies.get('token');
  return axios
    .delete(
      `https://tahr-api.onrender.com/candidate/${userId}/${candidatoId}`,
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }
    )
};
