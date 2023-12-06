import { z } from "zod";
import { handleVerifySpecialCharacters, handleVerifyName } from "./utils";

  export const UpdateUserValidator = z
  .object({
    email: z
      .string()
      .email("Digite um e-mail válido")
      .min(1, "Campo obrigatório"),
    nome: z.string().min(1, "Campo obrigatório"),
    empresa: z.string().min(1, "Campo obrigatório"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (schema) => {
      return handleVerifySpecialCharacters(schema.password || "");
    },
    {
      path: ["password"],
      message:
        "A senha deve incluir: \n • números \n • caracteres especiais \n • letras maiúsculas e minúsculas.",
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
      return !(schema.password !== "" && schema.confirmPassword === "");
    },
    {
      path: ["confirmPassword"],
      message: "Campo obrigatório",
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
  );