import { z } from "zod";
import { handleVerifyName, handleVerifySpecialCharacters } from "./utils";

export const CreateUserValidation = z
  .object({
    email: z
      .string()
      .email("Digite um e-mail válido")
      .min(1, "Campo obrigatório"),
    nome: z.string().min(1, "Campo obrigatório"),
    empresa: z.string().min(1, "Campo obrigatório"),
    password: z.string().min(1, "Campo obrigatório"),
    confirmPassword: z.string().min(1, "Campo obrigatório"),
    condicoesDeUso: z.boolean(),
  })
  .refine(
    (schema) => {
      return handleVerifySpecialCharacters(schema.password);
    },
    {
      path: ["password"],
      message:
        "A senha deve incluir:\n • números \n • caracteres especiais \n • letras maiúsculas e minúsculas.",
    }
  )
  .refine(
    (schema) => {
      return handleVerifyName(schema.nome);
    },
    {
      path: ["nome"],
      message: "Por favor, digite o nome completo.",
    }
  )
  .refine(
    (schema) => {
      return !(schema.password !== schema.confirmPassword);
    },
    {
      path: ["confirmPassword"],
      message: "As senhas devem ser iguais",
    }
  )
  .refine(
    (schema) => {
      return schema.condicoesDeUso;
    },
    {
      path: ["condicoesDeUso"],
      message: "Por favor esteja de acordo com as nossas condições de uso",
    }
  );

