import clsx from "clsx";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { authMiddleware } from "../../../middleware/auth";
import { SecondaryButton } from "../../Buttons";

export const DesktopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("autoLogin");
    return navigate("/login");
  };

  return (
    <nav
      className={clsx(
        "fixed z-[9999999]  mr-0 mb-12 top-0 right-0 left-0 border-b border-[#747bff] bg-white px-2 sm:px-4 py-2.5 rounded",
        {
          hidden: location.pathname === "/login",
        }
      )}
    >
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
        <div className="flex md:order-2 items-center">
          {authMiddleware() ? (
            <p className="cursor-pointer" onClick={() => handleLogout()}>
              Sair
            </p>
          ) : (
            <SecondaryButton
              onClick={() => navigate("/login")}
              btnName="Entrar na plataforma"
              rounded
            />
          )}
        </div>
      </div>
    </nav>
  );
};
