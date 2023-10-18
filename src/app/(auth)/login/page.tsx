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
import { useUsertore } from "@/store";

const Login = () => {
  const remember = Cookies.get("autoLogin");
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    remember: !!remember,
  });

  const { setUserState } = useUsertore();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const Require = (value: any) => {
    if (!value) return "Campo obrigatório";
  };

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
        console.log(res);
        const { token, nome, empresa } = res.data;
        Cookies.set("token", token, {
          expires: userLogin.remember ? 1200 : 1,
        });

        setUserState({ empresa, nome, token });

        setTimeout(() => router.push("/dashboard"), 800);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div
      style={{
        backgroundImage: "url('img/bg-login.png')",
      }}
      className=" w-full bg-login h-[100vh] bg-no-repeat bg-cover flex sm:justify-start justify-center items-center"
    >
      <ToastContainer />
      <div className="relative h-[100vh] md:w-[40vw] w-[100vw] bg-white sm:p-16 p-10">
        <Link href={"/"} className="fixed top-2 left-2 hover:text-primary">
          <ArrowUDownLeft size={26} />
        </Link>
        <div className="flex justify-center">
          <img src="./img/logo/logo-text.svg" width="200px"></img>
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
            disabled={loading}
          />
          <TextInput
            id="password"
            label="Senha"
            value={userLogin.password}
            onChange={(e) => handleOnChange(e)}
            inputType="password"
            helperText={errors.password}
            state={errors.password ? "error" : undefined}
            disabled={loading}
          />
          <CheckBox
            label="Manter-se conectado."
            id="checkBox"
            checked={userLogin.remember}
            onChange={(event) =>
              setUserLogin({ ...userLogin, remember: event.target?.checked })
            }
            sm
            disabled={loading}
          />
          <Button
            btnName="Entrar"
            onClick={fnHandleSubmit}
            fullWidth
            loading={loading}
            disabled={loading}
          />
          <a
            href="/cadastro"
            className="text-primary text-sm text-center mt-3 cursor-pointer"
          >
            Ainda não possui conta? Cadastre-se aqui!
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
