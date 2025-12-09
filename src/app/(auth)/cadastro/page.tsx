"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowUDownLeft } from "phosphor-react";
import Link from "next/link";
import { Button, CheckBox, TextInput } from "@/components";
import { getUserIdByToken } from "@/utils";
import { useUserStore } from "@/store/user";
import { CreateUser, MakeLogin } from "@/api/requests";
import { CreateUserValidation } from "@/validations";
import Image from "next/image";

const Login = () => {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    empresa: "",
    condicoesDeUso: false,
  });
  const secret = process.env.JWT_SECRET_KEY;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUserState } = useUserStore();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    nome: "",
    confirmPassword: "",
    condicoesDeUso: "",
    empresa: "",
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target?.id as keyof typeof errors;
    const value = event.target?.value;
    setUser((prev) => ({ ...prev, [key]: value }));
    if (value && errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleLogin = () => {
    MakeLogin({ email: user.email, password: user.password })
      .then((res) => {
        const { token, name, company, photo } = res.data;
        const id = getUserIdByToken(token, secret ?? "") || "";
        Cookies.set("token", token);

        setUserState({
          id,
          empresa: company,
          nome: name,
          token,
          email: user.email,
          foto: photo,
        });

        setTimeout(() => router.push("/dashboard"), 1200);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
        setLoading(false);
        console.error(err);
      });
  };

  const fnHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      CreateUserValidation.parse(user);
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
    CreateUser({
      nome: user.nome,
      email: user.email,
      senha: user.password,
      confirmSenha: user.confirmPassword,
      empresa: user.empresa,
    })
      .then(() => {
        handleLogin();
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
        setLoading(false);
        console.error(err);
      });
  };
  return (
    <div
      style={{
        backgroundImage: "url('img/bg-login.png')",
      }}
      className="w-full bg-login h-[100vh] bg-no-repeat bg-cover flex sm:justify-start justify-center items-center"
    >
      <div className="relative h-full md:w-[40vw] w-[100vw] bg-white sm:px-14 px-10">
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
        <h1 className="text-title text-center font-bold text-black mt-4">
          Registre-se em nossa plataforma
        </h1>
        <form onSubmit={fnHandleSubmit} className="grid gap-3 mt-4">
          <TextInput
            id="nome"
            label="Nome"
            value={user.nome}
            onChange={(e) => handleOnChange(e)}
            helperText={errors.nome}
            state={errors.nome ? "error" : undefined}
            disabled={loading}
          />
          <TextInput
            id="email"
            label="E-mail"
            value={user.email}
            onChange={(e) => handleOnChange(e)}
            helperText={errors.email}
            state={errors.email ? "error" : undefined}
            disabled={loading}
          />
          <TextInput
            id="empresa"
            label="Empresa"
            value={user.empresa}
            onChange={(e) => handleOnChange(e)}
            helperText={errors.empresa}
            state={errors.empresa ? "error" : undefined}
            disabled={loading}
          />
          <TextInput
            id="password"
            label="Senha"
            value={user.password}
            onChange={(e) => handleOnChange(e)}
            inputType="password"
            helperText={errors.password}
            state={errors.password ? "error" : undefined}
            disabled={loading}
          />
          <TextInput
            id="confirmPassword"
            label="Confirmar senha"
            value={user.confirmPassword}
            onChange={(e) => handleOnChange(e)}
            inputType="password"
            helperText={errors.confirmPassword}
            state={errors.confirmPassword ? "error" : undefined}
            disabled={loading}
          />
          <CheckBox
            label="Declaro que li e aceito os #termos de uso"
            link="/termos-de-uso.pdf"
            id="checkBox"
            checked={user.condicoesDeUso}
            setValue={(value) => {
              setUser({ ...user, condicoesDeUso: value.checked });
              setErrors((prev) => ({ ...prev, condicoesDeUso: "" }));
            }}
            sm
            helperText={errors.condicoesDeUso}
            state={errors.condicoesDeUso ? "error" : undefined}
            disabled={loading}
          />
          <Button
            btnName="Registrar"
            onClick={fnHandleSubmit}
            fullWidth
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;


