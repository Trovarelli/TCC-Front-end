import { buttonProps } from "./types"

export const Button = ({ btnName, ...rest}:buttonProps)=>{
    return(
        <button {...rest} className="m-1 px-10 py-3  rounded bg-[#5344FF]">{btnName}</button>
    )
}