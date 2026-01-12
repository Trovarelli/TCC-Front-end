import { UserModel } from "@/api/models"
import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import router from "next/router"

type UserLogin = {
  email: string
  password: string
}

export const MakeLogin = async ({ email, password }: UserLogin): Promise<AxiosResponse<UserModel, undefined>> => {
  return axios
    .post(
      "https://tahr-api.onrender.com/auth/login",
      {
        email,
        password,
      },
    ).catch((err) => {
      if (err.response.status === 401) {
        Cookies.remove("token");
        router.push("/");
      }
      throw err
    })
}
