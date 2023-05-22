import { InputHTMLAttributes } from 'react'

export interface TextInputProps extends Omit<InputHTMLAttributes<any>, 'type'> {
    label: string
    state?: "error" | "success" | "info" | "warning" | undefined;
    helperText?: string
    inputType?: 'password' | 'text' | 'number' | "search"
    fullWidth?: boolean
}