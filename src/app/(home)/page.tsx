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
  Sparkle,
  RocketLaunch,
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
    <div className="mt-16">
      {}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full">
                <Sparkle size={20} weight="fill" className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">
                  Plataforma de Recrutamento Inteligente
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Sua jornada com o recrutamento
                <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  começa aqui!
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Oferecemos um sistema de gerenciamento de Candidatos poderoso em uma única plataforma de recrutamento moderna e intuitiva.
              </p>

              {!hasToken && (
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => router.push("/cadastro")}
                    className="btn-primary group"
                  >
                    <RocketLaunch size={20} weight="fill" className="mr-2 group-hover:animate-bounce" />
                    Começar Agora
                  </button>
                  <button
                    onClick={() => router.push("/login")}
                    className="btn-secondary"
                  >
                    Já tenho uma conta
                  </button>
                </div>
              )}
            </div>

            {}
            <div className="relative hidden lg:block">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
              <div
                style={{ backgroundImage: "url('img/person.png')" }}
                className="relative h-[600px] bg-no-repeat bg-center bg-contain animate-float"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nossas Vantagens</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra como nossa plataforma transforma o processo de recrutamento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Database,
                title: "Gestão Completa",
                description: "Gestão e manutenção de bases de currículos de forma organizada.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: DeviceMobile,
                title: "Acesso Universal",
                description: "Acesso a partir de qualquer dispositivo, em qualquer momento.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: ChartBar,
                title: "Análise Inteligente",
                description: "Análise automatizada de currículos com IA avançada.",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: Heart,
                title: "100% Gratuito",
                description: "Totalmente online e gratuito para sua empresa.",
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group card hover:scale-105 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} weight="fill" className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="py-24 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nossos Recursos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas para otimizar seu processo de contratação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: UserList,
                title: "Visualização Eficiente",
                description: "Visualização eficiente de todos os currículos em um só lugar.",
              },
              {
                icon: FloppyDiskBack,
                title: "Arquivamento Inteligente",
                description: "Arquivamento de currículos necessários para futuras contratações.",
              },
              {
                icon: FileSearch,
                title: "Filtragem Avançada",
                description: "Filtragem avançada para diversos tipos de currículos e competências.",
              },
            ].map((resource, idx) => (
              <div
                key={idx}
                className="card-gradient shine-effect group cursor-pointer"
              >
                <resource.icon
                  size={48}
                  weight="fill"
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold mb-3">{resource.title}</h3>
                <p className="text-white/90 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Sobre Nós</h2>
          </div>

          <div className="card max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                  <Image
                    src="img/logo/logo-only.svg"
                    width={200}
                    height={200}
                    alt="Logo TAHR"
                    className="relative"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-indigo-600">
                  TAHR - Technology Applied to Human Resources
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  TAHR é uma tecnologia que visa auxiliar os profissionais de Recursos Humanos na identificação dos candidatos mais qualificados, alinhados de maneira precisa com as exigências específicas de cada vaga de emprego disponibilizada pela organização.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Buscamos constantemente oportunidades de aprimorar a plataforma e a experiência do usuário. Estamos sempre abertos para receber feedback dos usuários, e utilizamos essas informações como base para impulsionar inovações e implementar melhorias nos serviços prestados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

