"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/Buttons";
import Spinner from "@/components/Spinner/component";
import { BriefcaseMetal, SquaresFour, UserList } from "phosphor-react";
import { Profile } from "@/components/Profile";
import { Link as LinkScroll } from "react-scroll";
import { useUserStore } from "@/store/user";
import Image from "next/image";

export default function DesktopNav() {
  const router = useRouter();
  const path = usePathname();
  const [hasToken, setToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const [selectedLink, setSelectedLink] = useState("");
  const { removeUserState } = useUserStore();

  useEffect(() => {
    setToken(!!token);
  }, [token]);

  const selectedItem = (link: string) => {
    if (link === path) return "text-indigo-600 border-indigo-600 bg-indigo-50";
  };

  const handleLogout = () => {
    removeUserState();
    setLoading(true);
    Cookies.remove("token");
    router.push("/");
    setToken(false);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <nav
      className={clsx(
        "max-sm:hidden fixed flex items-center z-50 justify-center top-0 right-0 left-0 px-4 transition-all",
        hasToken
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
          : "bg-white/70 backdrop-blur-md border-b border-indigo-100"
      )}
    >
      <div className="container flex justify-between items-center mx-auto py-3">
        {}
        <div className="flex items-center">
          <Link href="/" className="group">
            <Image
              alt="TAHR-LOGO"
              src="/img/logo/logo-text.svg"
              width="130"
              height="130"
              className="group-hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {}
        <div
          className={clsx(
            "flex gap-2 transition-all",
            { hidden: !hasToken }
          )}
        >
          <Link
            href="/dashboard"
            className={clsx(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300",
              "hover:bg-indigo-50 hover:text-indigo-600",
              selectedItem("/dashboard") || "text-gray-700"
            )}
          >
            <SquaresFour size={22} weight="fill" />
            Dashboard
          </Link>
          <Link
            href="/vagas"
            className={clsx(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300",
              "hover:bg-indigo-50 hover:text-indigo-600",
              selectedItem("/vagas") || "text-gray-700"
            )}
          >
            <BriefcaseMetal size={22} weight="fill" />
            Vagas
          </Link>
          <Link
            href="/candidatos"
            className={clsx(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300",
              "hover:bg-indigo-50 hover:text-indigo-600",
              selectedItem("/candidatos") || "text-gray-700"
            )}
          >
            <UserList size={22} weight="fill" />
            Candidatos
          </Link>
        </div>

        {}
        <div
          className={clsx("flex gap-4 text-sm font-medium", {
            hidden: hasToken,
          })}
        >
          <LinkScroll
            to="top"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            onClick={() => setSelectedLink("home")}
            className={clsx(
              "cursor-pointer px-3 py-2 rounded-lg transition-all hover:text-indigo-600 hover:bg-indigo-50",
              { "text-indigo-600 bg-indigo-50": selectedLink === "home" }
            )}
          >
            Home
          </LinkScroll>
          <LinkScroll
            to="funcionalidades"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            onClick={() => setSelectedLink("funcionalidades")}
            className={clsx(
              "cursor-pointer px-3 py-2 rounded-lg transition-all hover:text-indigo-600 hover:bg-indigo-50",
              { "text-indigo-600 bg-indigo-50": selectedLink === "funcionalidades" }
            )}
          >
            Recursos
          </LinkScroll>
          <LinkScroll
            to="solucoes"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            onClick={() => setSelectedLink("solucoes")}
            className={clsx(
              "cursor-pointer px-3 py-2 rounded-lg transition-all hover:text-indigo-600 hover:bg-indigo-50",
              { "text-indigo-600 bg-indigo-50": selectedLink === "solucoes" }
            )}
          >
            Vantagens
          </LinkScroll>
          <LinkScroll
            to="sobre-nos"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            onClick={() => setSelectedLink("sobre-nos")}
            className={clsx(
              "cursor-pointer px-3 py-2 rounded-lg transition-all hover:text-indigo-600 hover:bg-indigo-50",
              { "text-indigo-600 bg-indigo-50": selectedLink === "sobre-nos" }
            )}
          >
            Sobre nós
          </LinkScroll>
        </div>

        {}
        <div className="flex items-center justify-center">
          {loading ? (
            <Spinner color="primary" />
          ) : hasToken ? (
            <Profile logout={handleLogout} />
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="btn-primary"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

