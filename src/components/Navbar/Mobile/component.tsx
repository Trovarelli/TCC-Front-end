"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/component";
import { Link as LinkScroll } from "react-scroll";
import { useUsertore } from "@/store";
import { Button } from "@/components";

export default function MobileNav() {
  const router = useRouter();
  const [hasToken, setToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("");
  const { removeUserState, user } = useUsertore();

  const handleSelectLink = (link: string) => {
    setSelectedLink(link);
    setIsNavOpen(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(!!token);
  }, []);

  const handleLogout = () => {
    removeUserState();
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
            <div className="container flex flex-col justify-center font-bold mx-auto mt-5 p-10">
              <div className="absolute w-full inset-0 flex justify-center z-0">
                <div
                  style={{
                    backgroundImage: user.foto
                      ? `url('${user.foto}')`
                      : "url('img/perfil.jpg')",
                  }}
                  className={clsx("w-20 h-20 rounded-full mt-3 bg-cover", {
                    hidden: !hasToken,
                  })}
                ></div>
              </div>

              <div
                className={clsx(
                  "transition-all grid grid-rows-4 gap-5 relative mt-9",
                  {
                    hidden: !hasToken,
                  }
                )}
              >
                <Link
                  href={"/perfil"}
                  className="hover:text-primary flex justify-center items-center"
                >
                  Meu perfil
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
                className={clsx("transition-all grid grid-rows-4 gap-5 z-40", {
                  hidden: hasToken,
                })}
              >
                <LinkScroll
                  to="top"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => handleSelectLink("home")}
                  className={clsx(
                    "hover:text-primary cursor-pointer flex justify-center items-center",
                    { "text-primary border-primary": selectedLink === "home" }
                  )}
                >
                  Home
                </LinkScroll>
                <LinkScroll
                  to={"funcionalidades"}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => handleSelectLink("funcionalidades")}
                  className={clsx(
                    "hover:text-primary cursor-pointer flex justify-center items-center",
                    {
                      "text-primary border-primary":
                        selectedLink === "funcionalidades",
                    }
                  )}
                >
                  Funcionalidades
                </LinkScroll>
                <LinkScroll
                  to={"solucoes"}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => handleSelectLink("solucoes")}
                  className={clsx(
                    "hover:text-primary cursor-pointer flex justify-center items-center",
                    {
                      "text-primary border-primary":
                        selectedLink === "solucoes",
                    }
                  )}
                >
                  Soluções
                </LinkScroll>
                <LinkScroll
                  to={"sobre-nos"}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => handleSelectLink("sobre-nos")}
                  className={clsx(
                    "hover:text-primary cursor-pointer flex justify-center items-center",
                    {
                      "text-primary border-primary":
                        selectedLink === "sobre-nos",
                    }
                  )}
                >
                  Sobre nós
                </LinkScroll>
              </div>
            </div>
            <div className="flex items-center justify-center mb-36 w-full">
              {loading ? (
                <Spinner color="primary" />
              ) : hasToken ? (
                <Button
                  onClick={handleLogout}
                  btnName="Sair"
                  rounded
                  fullWidth
                  size="lg"
                />
              ) : (
                <Button
                  onClick={() => router.push("/login")}
                  btnName="Entrar"
                  rounded
                  className="w-full"
                  size="lg"
                />
              )}
            </div>
          </div>
        </section>
      </nav>
    </div>
  );
}
