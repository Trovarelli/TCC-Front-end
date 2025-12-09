import { VagaModel } from "@/api/models";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type UpdateVagaParams = {
  userId: string;
  vagaId: string;
  ativo: boolean;
}

export const UpdateVaga = async ({ userId, vagaId, ativo }: UpdateVagaParams): Promise<AxiosResponse<VagaModel>> => {
  const token = Cookies.get('token');
  return axios
    .patch(
      `https://tahr-api.onrender.com/job/${userId}/${vagaId}`,
      { ativo },
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }
    )
};
