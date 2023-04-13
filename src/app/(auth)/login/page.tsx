"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ArrowUDownLeft } from "phosphor-react";
import Link from "next/link";
import axios from "axios";
import { Button, CheckBox, TextInput } from "@/components";

export const Require = (value: any) => {
  if (!value) return "Campo obrigatório";
};

export default function Login() {
  const remember = Cookies.get("autoLogin");
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    remember: !!remember,
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [event.target?.id]: event.target?.value });
    setErrors({ ...errors, [event.target?.id]: Require(event.target?.value) });
  };

  const fnHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (userLogin.remember && !remember) {
      Cookies.set("autoLogin", `${userLogin.remember}`, { expires: 1200 });
    }

    axios
      .post(
        "http://localhost:3001/auth/login",
        {
          email: userLogin.email,
          password: userLogin.password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        Cookies.set("token", res.data.token, {
          expires: userLogin.remember ? 1200 : 1,
        });
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
        setLoading(false)
        console.log(err);
      })
      
  };
  return (
    <div
      style={{
        backgroundImage: "url('img/bg-login.png')",
      }}
      className=" w-full bg-login h-[100vh] bg-no-repeat bg-cover flex sm:justify-start justify-center items-center"
    >
      <ToastContainer />
      <div className="relative sm:h-full md:w-[40vw] w-[100vw] h-[100vh] bg-white sm:p-16 p-10">
        <Link href={"/"} className="fixed top-2 left-2 hover:text-primary">
          <ArrowUDownLeft size={26} />
        </Link>
        <div className="flex justify-center">
          <img src="./img/logo/logo-text.svg" width="250px"></img>
        </div>
        <h1 className="text-title text-center font-bold text-black mt-6">
          Entre em nossa plataforma
        </h1>
        <form onSubmit={fnHandleSubmit} className="grid gap-3 mt-5">
          <TextInput
            id="email"
            label="E-mail"
            value={userLogin.email}
            onChange={(e) => handleOnChange(e)}
            helperText={errors.email}
            state={errors.email ? "error" : undefined}
          />
          <TextInput
            id="password"
            label="Senha"
            value={userLogin.password}
            onChange={(e) => handleOnChange(e)}
            inputType="password"
            helperText={errors.password}
            state={errors.password ? "error" : undefined}
          />
          <CheckBox
            label="Manter-se conectado."
            id="checkBox"
            checked={userLogin.remember}
            onChange={(event) =>
              setUserLogin({ ...userLogin, remember: event.target?.checked })
            }
            sm
          />
          <Button
            btnName="Entrar"
            onClick={fnHandleSubmit}
            fullWidth
            loading={loading}
          />
          <div className="text-primary text-sm text-center mt-3 cursor-pointer">
            Ainda não possui conta? Cadastre-se aqui!
          </div>
        </form>
      </div>
    </div>
  );
}
