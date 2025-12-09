export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnName: string
    icon?: "trash" | "home" | "user" | "arrow" | undefined
    rounded?: boolean
    fullWidth?: boolean
    loading?: boolean
    size?: 'md' | 'lg' | 'sm'
    secondary?: boolean
    color?: 'primary' | 'info' | 'success' | 'error' | 'warning'
}

