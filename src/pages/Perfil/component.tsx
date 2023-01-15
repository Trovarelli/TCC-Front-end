import { Button } from "../../components"
import { useNavigate } from "react-router-dom"

export const Perfil = ()=>{
    const navigate = useNavigate()
    const Navigate = ()=>{
        navigate("/")
    }
    return (
        <>
        <div className="bg-slate-600 rounded-xl text-center flex justify-center items-center">Perfilllll</div>
        <Button onClick={Navigate} btnName="Home"/>
        </>
    )
}