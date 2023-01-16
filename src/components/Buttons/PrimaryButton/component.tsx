import { getIcon } from "../utils/getIcons"
import { PrimaryButtonProps } from "./types"

export const PrimaryButton = ({ btnName, icon, ...rest}:PrimaryButtonProps)=>{
    return(
        <button {...rest} className="m-1 px-10 py-3 active:bg-[#3023c9] rounded bg-[#5344FF]">
            {icon !== undefined ? (<div className="flex justify-center items-center">
            <div className="mr-1">{getIcon(icon)}</div>
            {btnName}
            </div>) : btnName}
        </button>
    )
}