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

export default function DesktopNav() {
  const router = useRouter();
  const path = usePathname();
  const [hasToken, setToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    console.log(path);
    setToken(!!token);
  }, [token]);

  const selectedItem = (link: string) => {
    if (link === path) return "text-primary border-primary";
  };

  const handleLogout = () => {
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
        "max-sm:hidden fixed flex items-center z-50 shadow-sm justify-center mr-0 top-0 right-0 left-0  px-2 sm:px-4 rounded",
        { "bg-white": hasToken },
        {
          "backdrop-blur-md bg-black bg-opacity-5 border-b border-[#747bff]":
            !hasToken,
        }
      )}
    >
      <div className="container flex justify-around font-bold mx-auto">
        <div className="flex items-center">
          <div className="self-center py-3">
            <Link href={"/"}>
              <img
                alt="TAHR-LOGO"
                src="/img/logo/logo-text.svg"
                width="120px"
              ></img>
            </Link>
          </div>
        </div>
        <div
          className={clsx(
            "grid grid-cols-3 gap-3 transition-all min-w-[400px]",
            { hidden: !hasToken }
          )}
        >
          <Link
            href={"/dashboard"}
            className={`${selectedItem(
              "/dashboard"
            )} flex hover:text-primary border-b-4 border-black hover:border-primary flex-col justify-center px-4`}
          >
            <div className=" flex justify-center items-center">
              <SquaresFour size={26} weight="fill" className="mr-2" />
              Dashboard
            </div>
          </Link>
          <Link
            href={"/vagas"}
            className={`${selectedItem(
              "/vagas"
            )} flex hover:text-primary border-b-4 border-black hover:border-primary flex-col justify-center px-4`}
          >
            <div className=" flex justify-center items-center">
              <BriefcaseMetal size={26} weight="fill" className="mr-2" />
              Vagas
            </div>
          </Link>
          <Link
            href={"/candidatos"}
            className={`${selectedItem(
              "/candidatos"
            )} flex hover:text-primary border-b-4 border-black hover:border-primary flex-col justify-center px-4`}
          >
            <div className=" flex justify-center items-center">
              <UserList size={26} weight="fill" className="mr-2" />
              Candidatos
            </div>
          </Link>
        </div>
        <div
          className={clsx("transition-all grid grid-cols-4 gap-4", {
            hidden: hasToken,
          })}
        >
          <Link
            href={"/"}
            className={`${selectedItem(
              "/"
            )} hover:text-primary flex justify-center items-center`}
          >
            Home
          </Link>
          <Link
            href={"/funcionalidades"}
            className={`${selectedItem(
              "/funcionalidades"
            )} hover:text-primary flex justify-center items-center`}
          >
            Funcionalidades
          </Link>
          <Link
            href={"/solucoes"}
            className={`${selectedItem(
              "/solucoes"
            )} hover:text-primary flex justify-center items-center`}
          >
            Soluções
          </Link>
          <Link
            href={"/sobre"}
            className={`${selectedItem(
              "/sobre"
            )} hover:text-primary flex justify-center items-center`}
          >
            Sobre nós
          </Link>
        </div>
        <div className="flex items-center justify-center">
          {loading ? (
            <Spinner color="primary" />
          ) : hasToken ? (
            <Profile logout={handleLogout} />
          ) : (
            <Button
              onClick={() => router.push("/login")}
              btnName="Entrar"
              rounded
            />
          )}
        </div>
      </div>
    </nav>
  );
}
