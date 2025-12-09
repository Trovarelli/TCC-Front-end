import { DefaultModalProps } from "../DefaultModal/types";

export interface UploadModalProps extends Omit<DefaultModalProps, 'children'> {
    setOpen: (v: boolean) => void;
}


