import { CandidatoModel, VagaModel } from "@/api/models";
import { DefaultModalProps } from "../DefaultModal/types";
import { Dispatch, SetStateAction } from "react";
import { VagaCandidatoModel } from "@/app/(home)/vagas/page";

export interface VagaFormModalProps extends Omit<DefaultModalProps, 'children'> {
    setOpen: (v: boolean) => void
    vaga: Omit<VagaModel, "matchField">
    setVaga: (v: Omit<VagaModel, "matchField">) => void
    candidatos: CandidatoModel[]
    setVagas: Dispatch<SetStateAction<VagaCandidatoModel[]>>
    title: string
}

