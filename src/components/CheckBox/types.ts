export interface CheckBoxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
    label: string;
    sm?: boolean;
    value?: {label: string; checked: boolean}
    setValue: (v: {label: string; checked: boolean}) => void
}