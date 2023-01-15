import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate()
    const Navigate = ()=>{
      navigate("/Perfil")
    }
    return (
      <>
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-blue-600">
        Install & Setup Vite + React + Typescript + Tailwind CSS 3
        </h1>
      </div>
      <Button onClick={Navigate} btnName="Perfil"/>
      </>
      
    );
  }