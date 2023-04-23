import { InputHTMLAttributes } from "react"

export interface ChipInputProps extends Omit<InputHTMLAttributes<any>, 'type'> {
    label: string
    state?: "error" | "success" | "info" | "warning" | undefined;
    helperText?: string
    fullWidth?: boolean
}