import { getIcon } from "../utils/getIcons"
import { SecondaryButtonProps } from "./types"
export const SecondaryButton = ({rounded, btnName, icon, ...rest}:SecondaryButtonProps)=>{
    return(
        <button {...rest} className={`bg-transparent text-[#5344FF] border border-[#5344FF] hover:bg-[#5344FF] hover:text-white active:bg-[#3023c9] font-bold uppercase px-8 py-3 ${rounded ? 'rounded-full' : 'rounded'} outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}>
            {icon !== undefined ? (<div className="flex justify-center items-center">
            <div className="mr-1">{getIcon(icon)}</div>
            {btnName}
            </div>) : btnName}
        </button>
    )
}