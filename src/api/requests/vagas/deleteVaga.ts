import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

type DeleteVagaParams = {userId: string; vagaId: string}


export const DeleteVaga = async ({userId, vagaId}: DeleteVagaParams): Promise<AxiosResponse<undefined, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .post(`https://tahr-api.onrender.com/job/${userId}/${vagaId}`, 
      {},
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => {
        if(err.response.status === 401) {
          Cookies.remove("token");
          router.push("/");
        }
        throw new Error(err)
      })
  };