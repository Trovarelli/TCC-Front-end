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
          Nossas Soluções
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div className=" max-w-[1300px]">
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="rounded-md border-2 hover:text-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-justify justify-center">
                <Database
                  size={36}
                  weight="fill"
                  className="text-primary md:mr-4"
                />
                Gerenciamento e manutenção de base de currículos.
              </div>
              <div className="rounded-md border-2 hover:text-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-center justify-center">
                <DeviceMobile
                  size={36}
                  weight="fill"
                  className="text-primary md:mr-4"
                />
                Tenha acesso de qualquer dispositivo e a qualquer momento.
              </div>
              <div className="rounded-md border-2 hover:text-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-center justify-center">
                <ChartBar
                  size={36}
                  weight="fill"
                  className="text-primary md:mr-4"
                />
                Fornecemos uma análise automática de currículos.
              </div>
              <div className="rounded-md border-2 hover:text-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-center justify-center">
                <Heart
                  size={36}
                  weight="fill"
                  className="text-primary md:mr-4"
                />
                A nossa aplicação é 100% online e totalmente gratuita.
              </div>
            </div>
            <div className="border border-gray-400 mt-20 w-full"></div>
            <h1
              id="funcionalidades"
              className="font-bold sm:mt-20 mt-10 text-center"
            >
              Funcionalidades
            </h1>
            <div className="grid grid-cols-2 gap-4 mt-10 text-white">
              <div className="rounded-md border-2 bg-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-justify justify-center">
                <UserList size={36} weight="fill" className="md:mr-4" />
                Visualização de todos os currículos de forma rápida e eficiente.
              </div>
              <div className="rounded-md border-2 bg-primary transition-all duration-300 border-primary p-8 font-bold flex items-center max-md:flex-col max-md:text-center justify-center">
                <FloppyDiskBack size={36} weight="fill" className="md:mr-4" />
                Guarde os currículos necessários para futuras contratações.
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="rounded-md border-2 max-w-[50%] bg-primary transition-all duration-300 border-primary p-8 font-bold flex items-center justify-center max-md:flex-col max-md:text-center">
                  <FileSearch size={36} weight="fill" className="md:mr-4" />
                  Filtragem avançada para qualquer tipo de currículo.
                </div>
              </div>
            </div>
            <div className="border border-gray-400 mt-20 w-full"></div>
            <h1 id="sobre-nos" className="font-bold sm:mt-20 mt-10 text-center">
              Sobre nós
            </h1>
            <div className="border-2 border-primary mt-10 mb-20 w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-primary font-semibold">
              <div className="flex justify-center items-center">
                <img src="img/logo/logo-only.svg" width="150px" />
              </div>
              <div>
                Bem-vindo ao TAHR (Technology Applied to Human Resources) nossa
                tecnologia de gestão de currículos é projetada para ajudar os
                profissionais de RH a encontrar os melhores candidatos que
                correspondam melhor as exigências que você procura. <br />
                <br />
                Estamos continuamente buscando maneiras de melhorar a nossa
                plataforma e a experiência do usuário. Estamos sempre abertos a
                feedback dos nossos usuários e usamos essas informações para
                impulsionar a inovação e melhorias em nossos serviços.
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
