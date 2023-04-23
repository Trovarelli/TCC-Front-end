export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnName: string
    icon?: "trash" | "home" | "user" | undefined
    rounded?: boolean
    fullWidth?: boolean
    loading?: boolean
    secondary?: boolean
    color?: 'primary' | 'info' | 'success' | 'error' | 'warning'
}