"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowUDownLeft } from "phosphor-react";
import Link from "next/link";
import axios from "axios";
import { Button, CheckBox, TextInput } from "@/components";
import { getUserIdByToken } from "@/utils";
import { useUsertore } from "@/store";

const userValidation = z.object({
  email: z
    .string()
    .email("Digite um e-mail válido")
    .min(1, "Campo obrigatório"),
  nome: z.string().min(1, "Campo obrigatório"),
  empresa: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(1, "Campo obrigatório"),
  confirmPassword: z.string().min(1, "Campo obrigatório"),
  condicoesDeUso: z.boolean(),
});

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
  const { setUserState } = useUsertore();
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
    axios
      .post(
        "http://localhost:3001/auth/login",
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        const { token, nome, empresa, foto } = res.data;
        const id = getUserIdByToken(token, secret ?? "") || "";
        Cookies.set("token", token);

        setUserState({
          id,
          empresa,
          nome,
          token,
          email: user.email,
          foto,
        });

        setTimeout(() => router.push("/dashboard"), 1200);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
        setLoading(false);
        console.log(err);
      });
  };

  const fnHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!user.condicoesDeUso) {
      setErrors({
        ...errors,
        condicoesDeUso: "Por favor leia os temos de condições de uso",
      });

      return;
    }

    try {
      userValidation.parse(user);
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
    axios
      .post(
        "http://localhost:3001/auth/register",
        {
          name: user.nome,
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
          company: user.empresa,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(() => {
        handleLogin();
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
      className="w-full bg-login h-[100vh] bg-no-repeat bg-cover flex sm:justify-start justify-center items-center"
    >
      <div className="relative h-full md:w-[40vw] w-[100vw] bg-white sm:px-14 px-10">
        <Link href={"/"} className="fixed top-2 left-2 hover:text-primary">
          <ArrowUDownLeft size={26} />
        </Link>
        <div className="flex justify-center">
          <img src="./img/logo/logo-text.svg" width="200px"></img>
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
              setErrors((prev) => ({
                ...prev,
                condicoesDeUso: value.checked ? "" : "Campo obrigatório",
              }));
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
          <div className="text-primary text-sm text-center cursor-pointer">
            Ainda não possui conta? Cadastre-se aqui!
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
