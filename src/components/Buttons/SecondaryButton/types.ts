export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnName: string
    icon?: "trash" | "home" | "user" | undefined
    rounded?: boolean
}