import { DefaultModalProps } from "../DefaultModal/types";

export interface VagaFormModalProps extends Omit<DefaultModalProps, 'children'> {
    setOpen: (v: boolean) => void
    action: () => void
}