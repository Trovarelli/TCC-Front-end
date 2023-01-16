export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnName: string
    icon?: "camera" | "home" | undefined
}