import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../components";

export function Home() {
  const navigate = useNavigate();
  const Navigate = () => {
    navigate("/Perfil");
  };
  const navLogin = () => {
    navigate("/Login");
  };
  return (
    <>
      <nav className="border-b border-[#747bff] px-2 sm:px-4 py-2.5 rounded">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              CVMVC
            </span>
          </a>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col p-4 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Funcionalidades</a>
              </li>
              <li>
                <a>Soluções</a>
              </li>
              <li>
                <a>Sobre nós</a>
              </li>
            </ul>
          </div>
          <div className="flex md:order-2">
            <SecondaryButton
              onClick={navLogin}
              btnName="Entrar na plataforma"
              rounded
            />
          </div>
        </div>
      </nav>

      <div className="ml-10 mt-10">
        <p className="text-4xl font-bold mb-5">
          {" "}
          Sua jornada com o recrutamento <br /> começa aqui!
        </p>
        <p className="text-xl font-light mb-5">
          Oferecemos um sistema de gerenciamento de Candidatos <br /> poderoso
          em uma única plataforma de recrutamento.
        </p>
        <PrimaryButton onClick={Navigate} btnName="Inscreva-se agora!" />
        <SecondaryButton onClick={Navigate} btnName="Já possuo uma conta" />
      </div>
    </>
  );
}
