import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../../components";

export function Home() {
    const navigate = useNavigate()
    const Navigate = ()=>{
      navigate("/Perfil")
    }
    return (
      <>
      <h1>Home</h1>
      <SecondaryButton onClick={Navigate} btnName="Perfil" icon="user"/>
      </>
      
    );
  }