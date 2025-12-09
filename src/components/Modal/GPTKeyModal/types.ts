import { DefaultModalProps } from "../DefaultModal/types";
import { Dispatch, SetStateAction } from "react";

export interface GptFormModalProps extends Omit<DefaultModalProps, 'children'> {
    open: boolean
    setOpen: (v: boolean) => void
}



