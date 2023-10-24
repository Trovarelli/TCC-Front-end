"use client";
import { z } from "zod";
import { Button, TextInput } from "@/components";
import { useUsertore } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const userValidation = z.object({
  email: z
    .string()
    .email("Digite um e-mail válido")
    .min(1, "Campo obrigatório"),
  nome: z.string().min(1, "Campo obrigatório"),
  empresa: z.string().min(1, "Campo obrigatório"),
  password: z.string(),
  confirmPassword: z.string(),
});

const Perfil = () => {
  const router = useRouter();
  const { user, setUserState } = useUsertore();
  const [loading, setLoading] = useState(false);
  const [userPayload, setUserPayload] = useState({
    nome: user.nome,
    foto: user.foto,
    empresa: user.empresa,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
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
    setUserPayload((prev) => ({ ...prev, [key]: value }));
    if (value && errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };
  const fnHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      userValidation.parse(userPayload);
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
        `http://localhost:3001/user/${user.id}`,
        {
          name: userPayload.nome,
          email: userPayload.email,
          password: userPayload.password,
          company: userPayload.empresa,
          photo: userPayload.foto,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        const { name, company, email, photo } = res.data;

        setUserState({
          id: user.id,
          empresa: company,
          nome: name,
          token: user.token,
          email,
          foto: photo ?? "",
        });

        toast.success("Dados alterados com sucesso");
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1200px] w-full py-4 px-10 flex flex-col justify-center items-start gap-6">
        <Button
          btnName={"Voltar para o menu"}
          secondary
          icon="arrow"
          onClick={() => router.push("/dashboard")}
          className="max-sm:w-full"
        />
        <span className="text-subtitle font-bold">Configurações</span>
        <div className="border-t border-gray-400 w-full"></div>
        <span className="font-bold">Alterar foto de perfil</span>
        <div className="flex sm:flex-row flex-col w-full items-center justify-start gap-4">
          <div
            style={{
              backgroundImage: user.foto
                ? `url('${user.foto}')`
                : "url('img/perfil.jpg')",
            }}
            className="w-40 h-40 bg-cover rounded-full mr-2 "
          ></div>
          <div className="flex flex-col gap-4 justify-center max-sm:w-full">
            <Button
              btnName={"Salvar Imagem"}
              onClick={() => alert("SALVAR IMAGEM")}
              className="max-sm:w-full"
            />
            <Button
              btnName={"Excluir Imagem"}
              onClick={() => alert("EXCLUIR IMAGEM")}
              secondary
              className="!text-error max-sm:w-full !border-error hover:!bg-error hover:!text-white"
            />
          </div>
        </div>
        <div className="border-t border-gray-400 w-full"></div>
        <form
          onSubmit={fnHandleSubmit}
          className="sm:w-[50%] w-full flex flex-col gap-4"
        >
          <TextInput
            id="nome"
            label={"Nome de usuário"}
            value={userPayload.nome}
            onChange={(e) => handleOnChange(e)}
            helperText={errors.nome}
            state={errors.nome ? "error" : undefined}
            disabled={loading}
          />
          <TextInput
            id="email"
            label="E-mail"
            value={userPayload.email}
            onChange={(e) => handleOnChange(e)}
            helperText={errors.email}
            state={errors.email ? "error" : undefined}
            disabled={loading}
          />
          <TextInput
            id="empresa"
            label="Empresa"
            value={userPayload.empresa}
            onChange={(e) => handleOnChange(e)}
            helperText={errors.empresa}
            state={errors.empresa ? "error" : undefined}
            disabled={loading}
          />
          <TextInput
            id="password"
            label="Nova senha"
            value={userPayload.password}
            onChange={(e) => handleOnChange(e)}
            inputType="password"
            helperText={errors.password}
            state={errors.password ? "error" : undefined}
            disabled={loading}
          />
          <TextInput
            id="confirmPassword"
            label="Confirmar nova senha"
            value={userPayload.confirmPassword}
            onChange={(e) => handleOnChange(e)}
            inputType="password"
            helperText={errors.confirmPassword}
            state={errors.confirmPassword ? "error" : undefined}
            disabled={loading}
          />
          <Button
            btnName={"Salvar configurações de conta"}
            secondary
            rounded
            type="submit"
            loading={loading}
            className="max-sm:w-full"
          />
        </form>
        <div className="border-t border-gray-400 w-full"></div>

        <div className="flex flex-col gap-2">
          <a
            href="mailto:suport@tahr.com?cc=tahr@gmail.com&subject=Suporte ao usuário"
            className="cursor-pointer text-primary"
          >
            Suporte ao usuário
          </a>
          <a
            href="/termos-de-uso.pdf"
            target="_blank"
            className="cursor-pointer text-primary"
          >
            Termos de uso
          </a>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
