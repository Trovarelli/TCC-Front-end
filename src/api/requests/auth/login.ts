import { UserModel } from "@/api/models"
import axios, { AxiosResponse } from "axios"

type UserLogin = {
    email: string
    password: string
}

export const MakeLogin = async ({email, password}: UserLogin): Promise<AxiosResponse<UserModel, undefined>> => {
   return axios
      .post(
        "http://localhost:3001/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
}