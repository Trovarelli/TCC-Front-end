import { DefaultModalProps } from "../DefaultModal/types";

export interface PDFRenderModalProps extends Omit<DefaultModalProps, 'children'> {
    setOpen: (v: boolean) => void
    title: string
    base64: string
}
