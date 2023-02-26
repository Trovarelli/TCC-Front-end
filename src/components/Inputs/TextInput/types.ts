import { InputHTMLAttributes } from "react"

export interface TextInputProps extends InputHTMLAttributes<any> {
    label: string
    state?: "error" | "success" | "info" | "warning" | undefined;
    helperText?: string
}