import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const FavoriteCandidato = async ({ userId, candidatoId, favorito }: { userId: string; candidatoId: string; favorito: boolean }): Promise<AxiosResponse> => {
  const token = Cookies.get('token');
  return axios
    .patch(
      `https://tahr-api.onrender.com/candidate/${userId}/${candidatoId}`,
      { favorito },
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }
    )
};
