import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../components";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 h-[100vh] mt-20">
      <div className="ml-[1.5rem] max-[600px]:mr-[1.5rem] py-10 max-[600px]:col-span-2 flex items-center">
        <div>
          <p className="text-4xl font-bold mb-5">
            Sua jornada com o recrutamento começa aqui!
          </p>
          <p className="text-xl font-light mb-5">
            Oferecemos um sistema de gerenciamento de Candidatos poderoso em uma
            única plataforma de recrutamento.
          </p>
          <PrimaryButton
            onClick={() => navigate("/register")}
            btnName="Inscreva-se agora!"
          />
          <SecondaryButton
            onClick={() => navigate("/login")}
            btnName="Já possuo uma conta"
          />
        </div>
      </div>
      <div className="mr-[1.5rem] min-h-[70vh] bg-no-repeat bg-center bg-home h-full w-[100%] bg-contain max-[600px]:hidden"></div>
      <div className="col-span-2 w-full rounded-[50px] shadow-home h-[2000px]"></div>
    </div>
  );
}
