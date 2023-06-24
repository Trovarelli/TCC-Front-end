"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Buttons";
import Spinner from "@/components/Spinner/component";

export default function MobileNav() {
  const router = useRouter();
  const [hasToken, setToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(!!token);
  }, []);

  const handleLogout = () => {
    setIsNavOpen(false);
    setLoading(true);
    Cookies.remove("token");
    router.push("/");
    setToken(false);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="sm:hidden fixed mr-0 top-0 right-0 left-0 bg-white flex items-center justify-between border-b border-gray-400 px-4 z-50">
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
      <nav>
        <section className="flex">
          <button
            className="flex flex-col h-12 w-12 justify-center items-center group"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <div
              className={clsx(
                "h-1 w-6 my-1 rounded-full bg-primary transition ease transform duration-300",
                {
                  "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100":
                    isNavOpen,
                },
                {
                  "opacity-50 group-hover:opacity-100": !isNavOpen,
                }
              )}
            />
            <div
              className={clsx(
                "h-1 w-6 my-1 rounded-full bg-primary transition ease transform duration-300",
                {
                  "opacity-0": isNavOpen,
                },
                {
                  "opacity-50 group-hover:opacity-100": !isNavOpen,
                }
              )}
            />
            <div
              className={clsx(
                "h-1 w-6 my-1 rounded-full bg-primary transition ease transform duration-300",
                {
                  "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100":
                    isNavOpen,
                },
                {
                  "opacity-50 group-hover:opacity-100": !isNavOpen,
                }
              )}
            />
          </button>
          <div
            className={clsx(
              "absolute transition-all shadow-vertical-navigation h-screen mt-[3.8rem] right-0 bg-white flex flex-col justify-between items-center",
              { "max-w-0 overflow-hidden": !isNavOpen },
              { "max-w-[70%] px-3": isNavOpen }
            )}
          >
            <div className="container flex flex-col justify-center font-bold mx-auto mt-5 ">
              <div
                className={clsx("transition-all grid grid-rows-4 gap-5 px-20", {
                  hidden: !hasToken,
                })}
              >
                <Link
                  href={"/dashboard"}
                  className="hover:text-primary flex justify-center items-center"
                >
                  Dashboard
                </Link>
                <Link
                  href={"/vagas"}
                  className="hover:text-primary flex justify-center items-center"
                >
                  Vagas
                </Link>
                <Link
                  href={"/candidatos"}
                  className="hover:text-primary flex justify-center items-center"
                >
                  Candidatos
                </Link>
              </div>

              <div
                className={clsx("transition-all grid grid-rows-4 gap-5", {
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
            </div>
            <div className="flex items-center justify-center mb-24 w-full">
              {loading ? (
                <Spinner color="primary" />
              ) : hasToken ? (
                <Button
                  onClick={handleLogout}
                  btnName="Sair"
                  rounded
                  fullWidth
                />
              ) : (
                <Button
                  onClick={() => router.push("/login")}
                  btnName="Entrar"
                  rounded
                />
              )}
            </div>
          </div>
        </section>
      </nav>
    </div>
  );
}
