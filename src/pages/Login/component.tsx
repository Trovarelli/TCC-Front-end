import { PrimaryButton } from "../../components"
import { useNavigate } from "react-router-dom"

export const Login = ()=>{
    const navigate = useNavigate()
    const Navigate = ()=>{
        navigate("/")
    }
    return (
        <>
        <div className="flex h-screen">
            <div className="flex flex-col p-10 w-30">
                <div className="m-10 text-center">
                    <a onClick={Navigate} className="text-2xl font-bold">CVMVC</a>
                    <p className="text-xl mt-5">Entre em nossa <br/> plataforma</p>
                </div>
                <form className="flex flex-col">
                    <label>E-mail</label>
                    <input className="mt-1 mb-1" type="email" placeholder="Insira o seu e-mail"/>
                    <label>Senha</label>
                    <input className="mt-1 mb-1" type="password" placeholder="Insira sua senha"/>
                    <a className="text-right font-semibold">Esqueceu sua senha?</a>
                    <PrimaryButton btnName="Entrar"/>
                    <a className="text-center font-semibold m-5">Ainda não possui uma conta? Registre-se aqui!</a>
                </form>
                <div className="flex flex-col justify-end text-center">
                    <a className="font-semibold">Termos de uso</a>
                    <a className="font-semibold">Suporte ao usuário</a>
                </div>
            </div>
                <div className="flex-auto w-30 bg-[#747bff]">
            </div>
        </div>
        </>
    )
}