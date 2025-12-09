"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ArrowUDownLeft } from "phosphor-react";
import Link from "next/link";
import { Button, CheckBox, TextInput } from "@/components";
import { useUserStore } from "@/store/user";
import { getUserIdByToken } from "@/utils";
import { MakeLogin } from "@/api/requests";
import { LoginValidator } from "@/validations";
import Image from "next/image";

const Login = () => {
  const remember = Cookies.get("autoLogin");
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    remember: !!remember,
  });

  const { setUserState } = useUserStore();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const secret = process.env.JWT_SECRET_KEY;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target?.id as keyof typeof errors;
    const value = event.target?.value;
    setUserLogin((prev) => ({ ...prev, [key]: value }));
    if (value && errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };
  const fnHandleSubmit = (event: FormEvent) => {
    event.preventDefault();

    event.preventDefault();
    try {
      LoginValidator.parse(userLogin);
    } catch (err) {
      if (err instanceof z.ZodError) {
        JSON.parse(err.message)?.forEach(
          (el: { path: string[]; message: string }) =>
            setErrors((prev) => ({ ...prev, [el.path[0]]: el.message }))
        );
        toast.error("Por favor preencha os campos corretamente.");
        return;
      }
    }

    setLoading(true);

    if (userLogin.remember && !remember) {
      Cookies.set("autoLogin", `${userLogin.remember}`, { expires: 1200 });
    }

    MakeLogin({ email: userLogin.email, password: userLogin.password })
      .then((res) => {
        const { token, name, company, photo } = res.data;
        const id = getUserIdByToken(token, secret ?? "") || "";
        Cookies.set("token", token, {
          expires: userLogin.remember ? 1200 : 1,
        });

        setUserState({
          id,
          empresa: company,
          nome: name,
          token,
          email: userLogin.email,
          foto: photo,
        });

        setTimeout(() => router.push("/dashboard"), 800);
      })
      .catch((err) => {
        toast.error(err.response?.data.message || "Erro interno");
        setLoading(false);
        console.error(err);
      });
  };
  return (
    <div
      style={{
        backgroundImage: "url('img/bg-login.png')",
      }}
      className=" w-full bg-login h-[100vh] bg-no-repeat bg-cover flex sm:justify-start justify-center items-center"
    >
      <div className="relative h-[100vh] md:w-[40vw] w-[100vw] bg-white sm:p-16 p-10">
        <Link href={"/"} className="fixed top-2 left-2 hover:text-primary">
          <ArrowUDownLeft size={26} />
        </Link>
        <div className="flex justify-center">
          <Image
            src="./img/logo/logo-text.svg"
            width="200"
            height="200"
            alt="TAHR"
          />
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


