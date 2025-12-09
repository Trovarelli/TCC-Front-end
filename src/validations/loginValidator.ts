import { z } from "zod";

export const LoginValidator = z.object({
    email: z
      .string()
      .email("Digite um e-mail válido")
      .min(1, "Campo obrigatório"),
    password: z.string().min(1, "Campo obrigatório"),
  });

