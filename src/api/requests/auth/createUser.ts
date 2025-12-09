import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import router from "next/router";

type CreateUserParams = {
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
  empresa: string;
}

export const CreateUser = async ({ nome, email, senha, confirmSenha, empresa }: CreateUserParams): Promise<AxiosResponse<undefined, undefined>> => {
  return axios
    .post(
      "https://tahr-api.onrender.com/auth/register",
      {
        name: nome,
        email: email,
        password: senha,
        confirmPassword: confirmSenha,
        company: empresa,
      },
    )
    .then((res) => res)
    .catch((err) => {
      if (err.response.status === 401) {
        Cookies.remove("token");
        router.push("/");
      }
      throw err
    })
};
