import { PrimaryButton } from "../../components"
import { useNavigate } from "react-router-dom"

export const Perfil = ()=>{
    const navigate = useNavigate()
    const Navigate = ()=>{
        navigate("/")
    }
    return (
        <>
        <h1>Perfil</h1>
        <PrimaryButton onClick={Navigate} btnName="Home" icon="home"/>
        </>
    )
}