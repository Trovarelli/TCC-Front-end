import { UserModel } from "@/api/models";
import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie";
import router from "next/router";

type UpdateUserParams = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  empresa: string;
  foto: string;
}

export const updateUser = async ({ id, nome, email, senha, empresa, foto }: UpdateUserParams): Promise<AxiosResponse<UserModel, undefined>> => {
  const token = Cookies.get('token')
  return axios
    .put(
      `https://tahr-api.onrender.com/user/${id}`,
      {
        name: nome,
        email: email,
        password: senha,
        company: empresa,
        photo: foto,
      },
      {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }
    ).catch((err) => {
      if (err.response.status === 401) {
        Cookies.remove("token");
        router.push("/");
      }
      throw err
    })
}
