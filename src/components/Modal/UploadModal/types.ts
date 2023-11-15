import { CandidatoModel } from "@/api/models";
import { DefaultModalProps } from "../DefaultModal/types";
import { Dispatch, SetStateAction } from "react";

export interface UploadModalProps extends Omit<DefaultModalProps, 'children'> {
    setOpen: (v: boolean) => void
    setCandidatos: Dispatch<SetStateAction<CandidatoModel[]>>
}
