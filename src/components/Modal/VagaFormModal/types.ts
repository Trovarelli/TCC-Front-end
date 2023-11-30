import { VagaModel } from "@/api/models";
import { DefaultModalProps } from "../DefaultModal/types";

export interface VagaFormModalProps extends Omit<DefaultModalProps, 'children'> {
    setOpen: (v: boolean) => void
    vaga?: VagaModel
    title: string
}

