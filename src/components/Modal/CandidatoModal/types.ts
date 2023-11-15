import { CandidatoModel } from "@/api/models";
import { DefaultModalProps } from "../DefaultModal/types";

export interface PDFRenderModalProps extends Omit<DefaultModalProps, 'children'> {
    setOpen: (v: boolean) => void
    candidato: CandidatoModel
    onFavoriteClientCandidato: (id: string, favorite: boolean) => void
}
