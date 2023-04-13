"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Buttons";
import Spinner from "@/components/Spinner/component";
import { BriefcaseMetal, SquaresFour, UserList } from "phosphor-react";

export default function DesktopNav() {
  const router = useRouter();
  const [hasToken, setToken] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(!!token);
  }, []);

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
    <>
      <div
        className={clsx(
          "fixed flex items-center shadow-sm justify-center mr-0 top-0 right-0 left-0  px-2 sm:px-4 rounded",
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
                <img src="/img/logo/logo-text.svg" width="120px"></img>
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
              className="flex hover:text-primary border-b-4 border-black hover:border-primary flex-col justify-center px-4"
            >
              <div className=" flex justify-center items-center">
                <SquaresFour size={26} weight="fill" className="mr-2" />
                Dashboard
              </div>
            </Link>
            <Link
              href={"/vagas"}
              className="flex hover:text-primary border-b-4 border-black hover:border-primary flex-col justify-center px-4"
            >
              <div className=" flex justify-center items-center">
                <BriefcaseMetal size={26} weight="fill" className="mr-2" />
                Vagas
              </div>
            </Link>
            <Link
              href={"/candidatos"}
              className="flex hover:text-primary border-b-4 border-black hover:border-primary flex-col justify-center px-4"
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
              className="hover:text-primary flex justify-center items-center"
            >
              Home
            </Link>
            <Link
              href={"/funcionalidades"}
              className="hover:text-primary flex justify-center items-center"
            >
              Funcionalidades
            </Link>
            <Link
              href={"/solucoes"}
              className="hover:text-primary flex justify-center items-center"
            >
              Soluções
            </Link>
            <Link
              href={"/sobre"}
              className="hover:text-primary flex justify-center items-center"
            >
              Sobre nós
            </Link>
          </div>
          <div className="flex items-center justify-center">
            {loading ? (
              <Spinner color="primary" />
            ) : hasToken ? (
              <div
                className="flex items-center cursor-pointer"
                onClick={handleLogout}
              >
                Sair
              </div>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                btnName="Entrar na plataforma"
                rounded
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
