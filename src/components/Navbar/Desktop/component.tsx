"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Buttons";

export default function DesktopNav() {
  const router = useRouter();

  return (
    <>
      <div className="fixed mr-0 top-0 right-0 left-0 border-b border-[#747bff] bg-white px-2 sm:px-4 py-2.5 rounded">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center">
            <div className="self-center">
              <Link href={"/"}>
                <img src="/img/logo/logo-text.svg" width="120px"></img>
              </Link>
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col p-4 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li>
                <Link href={"/"} className="hover:text-primary">
                  Home
                </Link>
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
            {false ? (
              <div className="cursor-pointer" onClick={() => router.push("/")}>
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
