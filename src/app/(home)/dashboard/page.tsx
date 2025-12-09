"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BriefcaseMetal, PlusCircle, UserList, Clock } from "phosphor-react";
import { LoadingScreen, DashboardCard } from "@/components";
import { useUserStore } from "@/store/user";
import { useCandidatos } from "@/hooks/useCandidatos";
import { useVagas } from "@/hooks/useVagas";
import { formatDate } from "@/utils/formatters";
import Link from "next/link";

const Dashboard = () => {
  const [dateInfo, setDateInfo] = useState<ReturnType<typeof formatDate> | null>(null);
  const { nome } = useUserStore().user;
  const { candidatos, loading: loadingCandidatos } = useCandidatos();
  const { vagas, loading: loadingVagas } = useVagas();

  useEffect(() => {
    setDateInfo(formatDate(new Date()));
  }, []);

  if (loadingCandidatos || loadingVagas) {
    return <LoadingScreen message="Carregando dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto py-12">
        {}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">
            Olá, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{nome}</span>
          </h1>
          <p className="text-xl text-gray-600">Seja bem-vindo ao seu painel de controle!</p>
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {}
          <DashboardCard
            href="/candidatos"
            icon={UserList}
            count={candidatos.length}
            label="Candidatos"
            variant="light"
          />

          {}
          <DashboardCard
            href="/vagas"
            icon={BriefcaseMetal}
            count={vagas.length}
            label="Vagas"
            variant="light"
          />

          {}
          <DashboardCard
            href="/candidatos"
            icon={PlusCircle}
            label="Adicionar novos candidatos"
            variant="primary"
            className="sm:col-span-2"
          />

          {}
          <div className="card group">
            <div className="flex flex-col items-center justify-center h-full">
              <Clock size={32} weight="fill" className="text-indigo-600 mb-3" />
              {dateInfo && (
                <>
                  <div className="text-lg font-semibold text-indigo-600 mb-1">
                    {dateInfo.dayOfWeek}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">{dateInfo.day}</span> {dateInfo.month}.
                    <span className="font-bold text-gray-900">{dateInfo.year}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-bold text-gray-900">{`${dateInfo.formattedHours}:${dateInfo.formattedMinutes}`}</span>{" "}
                    {dateInfo.amOrPm}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {}
          <Link href="/candidatos" className="group block">
            <div className="card-gradient h-full min-h-[180px] flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Gerenciar Candidatos</h3>
                <p className="text-white/90">
                  Visualize, edite e organize todos os candidatos cadastrados
                </p>
              </div>
              <div className="flex items-center text-sm font-semibold mt-4">
                Ver mais
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" weight="bold" />
              </div>
            </div>
          </Link>

          {}
          <Link href="/vagas" className="group block">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full min-h-[180px] flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-2">Criar Nova Vaga</h3>
                <p className="text-white/90">
                  Adicione novas vagas de emprego e encontre os melhores candidatos
                </p>
              </div>
              <div className="relative">
                <PlusCircle size={48} className="group-hover:scale-110 transition-transform" weight="fill" />
              </div>
            </div>
          </Link>
        </div>

        {}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Total de Candidatos",
              value: candidatos.length,
              change: "+12%",
              positive: true,
            },
            {
              label: "Vagas Ativas",
              value: vagas.filter((v) => v.ativo).length,
              change: "+8%",
              positive: true,
            },
            {
              label: "Candidatos Favoritos",
              value: candidatos.filter((c) => c.favorito).length,
              change: "+5%",
              positive: true,
            },
          ].map((stat, idx) => (
            <div key={idx} className="card">
              <div className="text-sm font-medium text-gray-600 mb-1">{stat.label}</div>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className={`text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

