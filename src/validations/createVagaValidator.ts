import { z } from "zod";

export const CreateVagaValidator = z.object({
    titulo: z.string().min(1, "Campo obrigatório"),
    caracteristicas: z.array(z.string()).min(1, "Campo obrigatório"),
    descricao: z.string().min(1, "Campo obrigatório"),
  });