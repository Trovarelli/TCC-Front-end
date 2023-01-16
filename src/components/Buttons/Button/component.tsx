interface buttonProps{
    btnName: string
    onClick: ()=>void
}
export const Button = ({onClick, btnName}:buttonProps)=>{
    return(
        <button onClick={onClick} className="m-1 px-10 py-3  rounded bg-[#5344FF] text-red">{btnName}</button>
    )
}