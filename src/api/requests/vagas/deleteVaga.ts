import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const DeleteVaga = async ({ userId, vagaId }: { userId: string; vagaId: string }): Promise<AxiosResponse> => {
  const token = Cookies.get('token');
  return axios
    .delete(
      `https://tahr-api.onrender.com/job/${userId}/${vagaId}`,
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }
    )
};
