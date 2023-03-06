export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnName: string
    icon?: "trash" | "home" | "user" | undefined
    rounded?: boolean
    fullWidth?: boolean
    loading?: boolean
}