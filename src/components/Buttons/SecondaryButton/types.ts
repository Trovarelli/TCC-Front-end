export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnName: string
    icon?: "camera" | "home" | undefined
    rounded?: boolean
}