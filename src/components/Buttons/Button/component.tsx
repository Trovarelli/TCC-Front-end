interface buttonProps{
    btnName: string
    onClick: ()=>void
}
export const Button = ({onClick, btnName}:buttonProps)=>{
    return(
        <button onClick={onClick} className="p-3 rounded bg-blue-500 text-red">{btnName}</button>
    )
}