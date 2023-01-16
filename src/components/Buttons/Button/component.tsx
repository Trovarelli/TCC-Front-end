import { buttonProps } from "./types"

export const Button = ({ btnName, ...rest}:buttonProps)=>{
    return(
        <button {...rest} className="p-3 rounded bg-blue-500 text-red">{btnName}</button>
    )
}