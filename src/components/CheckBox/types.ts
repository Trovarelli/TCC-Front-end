export interface CheckBoxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
    label?: string;
    sm?: boolean;
}