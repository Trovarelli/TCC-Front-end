import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type CreateCandidatoParams = {userId: string; curriculum: string}

export const CreateCandidato = async ({userId, curriculum}: CreateCandidatoParams): Promise<AxiosResponse<undefined, undefined>> => { 
    const token =  Cookies.get('token')
    return axios
      .post(`http://localhost:3001/candidate/${userId}`, 
      {
        curriculum,
      }, 
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => {
        throw err
      })
  };
