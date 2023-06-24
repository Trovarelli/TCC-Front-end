import { DefaultModalProps } from "../DefaultModal/types";

export interface VagaFormModalProps extends Omit<DefaultModalProps, 'children'> {
    setOpen: (v: boolean) => void
    action: () => void
    vaga?: VagaModel
    title: string
}

export interface VagaModel {
    id?: string;
    titulo: string;
    descricao: string;
    tags: string[];
    candidatos?: any[];
  }