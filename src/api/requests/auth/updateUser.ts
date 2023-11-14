import { UserModel } from "@/api/models";
import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie";

type UpdateUserParams = {
    id: string;
    nome: string;
    email: string;
    senha: string;
    empresa: string;
    foto: string;    
}

export const updateUser = async ({id, nome, email, senha, empresa, foto}: UpdateUserParams): Promise<AxiosResponse<UserModel, undefined>> => {
    const token =  Cookies.get('token')
    return axios
    .post(
      `http://localhost:3001/user/${id}`,
      {
        name: nome,
        email: email,
        password: senha,
        company: empresa,
        photo: foto,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${token}`,
        },
      }
    ).catch((err) => {
      throw err
    })
}