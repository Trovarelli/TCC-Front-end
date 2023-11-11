import { SelectHTMLAttributes } from 'react'

export interface SelectProps extends Omit<SelectHTMLAttributes<any>, 'type'> {
    label: string
    state?: "error" | "success" | "info" | "warning" | undefined;
    helperText?: string
    fullWidth?: boolean
    options: {key: string, value: string}[]
}