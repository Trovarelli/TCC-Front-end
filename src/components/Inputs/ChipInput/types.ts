import { InputHTMLAttributes } from 'react'

export interface ChipInputProps extends Omit<InputHTMLAttributes<any>, 'type' | 'value'> {
    label: string
    state?: "error" | "success" | "info" | "warning" | undefined;
    helperText?: string
    fullWidth?: boolean
    chipsValue: string[]
    setChipsValue: (v: string[]) => void
}