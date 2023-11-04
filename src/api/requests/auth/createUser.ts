import axios, { AxiosResponse } from "axios";

type CreateUserParams = {
    nome: string;
    email: string;
    senha: string;
    confirmSenha: string;
    empresa: string;    
}

export const CreateUser = async ({nome, email, senha, confirmSenha, empresa}: CreateUserParams): Promise<AxiosResponse<undefined, undefined>> => { 
    return axios
    .post(
      "http://localhost:3001/auth/register",
      {
        name: nome,
        email: email,
        password: senha,
        confirmPassword: confirmSenha,
        company: empresa,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res)
      .catch((err) => {
        throw new Error(err)
      })
  };
