import { TextareaHTMLAttributes } from 'react'

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<any>, 'type'> {
    label: string
    state?: "error" | "success" | "info" | "warning" | undefined;
    helperText?: string
    fullWidth?: boolean
}

