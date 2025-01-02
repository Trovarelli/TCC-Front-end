"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  ChartBar,
  Database,
  DeviceMobile,
  FileSearch,
  FloppyDiskBack,
  Heart,
  UserList,
} from "phosphor-react";
import { Button } from "@/components";
import clsx from "clsx";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [hasToken, setToken] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(!!token);
  }, []);

  return (
    <div className="mt-20">
      <div id="top" className="max-w-[1300px] grid grid-cols-2 m-auto">
        <div className="ml-[1.5rem] max-[600px]:mr-[1.5rem] py-10 max-[600px]:col-span-2 flex items-center">
          <div>
            <div className="text-4xl font-bold mb-5">
              Sua jornada com o recrutamento começa aqui!
            </div>
            <div className="text-xl font-light mb-5">
              Oferecemos um sistema de gerenciamento de Candidatos poderoso em
              uma única plataforma de recrutamento.
            </div>
            <div
              className={clsx("grid grid-cols-2 gap-2", { hidden: hasToken })}
            >
              <div className="md:col-span-1 col-span-2">
                <Button
                  onClick={() => router.push("/cadastro")}
                  btnName="Inscreva-se agora!"
                  fullWidth
                />
              </div>
              <div className="md:col-span-1 col-span-2">
                <Button
                  onClick={() => router.push("/login")}
                  btnName="Já possuo uma conta"
                  fullWidth
                  secondary
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('img/person.png')",
          }}
          className="mr-[1.5rem] min-h-[70vh] bg-no-repeat bg-bottom h-full w-full bg-contain max-[600px]:hidden"
        ></div>
      </div>
      <div className="col-span-2 w-full sm:rounded-[50px] rounded-2xl shadow-home p-4 right-0 left-0 ">
        <h1 id="solucoes" className="font-bold sm:mt-20 mt-10 text-center">
          Nossas Vantagens
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div className=" max-w-[1300px]">
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="rounded-md border-2 hover:text-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-justify">
                <Database
                  size={36}
                  weight="fill"
                  className="text-primary md:mr-4"
                />
                Gestão e manutenção de bases de currículos.
              </div>
              <div className="rounded-md border-2 hover:text-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-center">
                <DeviceMobile
                  size={36}
                  weight="fill"
                  className="text-primary md:mr-4"
                />
                Acesso a partir de qualquer dispositivo, em qualquer momento.
              </div>
              <div className="rounded-md border-2 hover:text-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-center">
                <ChartBar
                  size={36}
                  weight="fill"
                  className="text-primary md:mr-4"
                />
                Análise automatizada de currículos.
              </div>
              <div className="rounded-md border-2 hover:text-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-center">
                <Heart
                  size={36}
                  weight="fill"
                  className="text-primary md:mr-4"
                />
                Totalmente online e gratuito.
              </div>
            </div>
            <div className="border border-gray-400 mt-20 w-full"></div>
            <h1
              id="funcionalidades"
              className="font-bold sm:mt-20 mt-10 text-center"
            >
              Nossos Recursos
            </h1>
            <div className="grid grid-cols-2 gap-4 mt-10 text-white">
              <div className="rounded-md border-2 bg-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-justify justify-center">
                <UserList size={36} weight="fill" className="md:mr-4" />
                Visualização eficiente de todos os currículos.
              </div>
              <div className="rounded-md border-2 bg-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-center justify-center">
                <FloppyDiskBack size={36} weight="fill" className="md:mr-4" />
                Arquivamento de currículos necessários para futuras
                contratações.
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="rounded-md border-2 max-w-[50%] bg-primary transition-all duration-300 border-primary p-8 font-bold flex items-center justify-center max-md:flex-col max-md:text-center">
                  <FileSearch size={36} weight="fill" className="md:mr-4" />
                  Filtragem avançada para diversos tipos de currículos.
                </div>
              </div>
            </div>
            <div className="border border-gray-400 mt-20 w-full"></div>
            <h1 id="sobre-nos" className="font-bold sm:mt-20 mt-10 text-center">
              Sobre nós
            </h1>
            <div className="border-2 border-primary mt-10 mb-20 w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-primary font-semibold">
              <div className="flex justify-center items-center">
                <Image
                  src="img/logo/logo-only.svg"
                  width="150"
                  height="150"
                  alt="Logo"
                />
              </div>
              <div>
                TAHR (Technology Applied to Human Resources) é uma tecnologia
                que visa auxiliar os profissionais de Recursos Humanos na
                identificação dos candidatos mais qualificados, alinhados de
                maneira precisa com as exigências específicas de cada vaga de
                emprego disponibilizada pela organização. Buscamos
                constantemente oportunidades de aprimorar a plataforma e a
                experiência do usuário. Estamos sempre abertos para receber
                feedback dos usuários, e utilizmos essas informações como base
                para impulsionar inovações e implementar melhorias nos serviços
                prestados.
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
