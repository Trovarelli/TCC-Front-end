export interface CheckBoxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
    label: string;
    sm?: boolean;
    value?: {label: string; checked: boolean}
    link?: string; 
    setValue?: (v: {label: string; checked: boolean}) => void
    state?: "error" | undefined;
}