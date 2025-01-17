"use client";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseMetal,
  PlusCircle,
  UserList,
} from "phosphor-react";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/component";
import { useUsertore } from "@/store";
import { GetAllCandidatos, GetAllVagas } from "@/api/requests";

const Dashboard = () => {
  const [renderLoading, setRenderLoading] = useState(true);
  const [data, setData] = useState<{
    dayOfWeek: string;
    day: number;
    month: string;
    year: number;
    formattedHours: number;
    formattedMinutes: string;
    amOrPm: string;
  } | null>(null);
  const [candidatos, setCandidatos] = useState<number>(0);
  const [vagas, setVagas] = useState<number>(0);
  const { nome, id } = useUsertore().user;

  const handleGetAllCandidatos = () => {
    GetAllCandidatos({ userId: id })
      .then((res) => setCandidatos(res.data.length))
      .catch((err) => console.error(err.message))
      .finally(() => setRenderLoading(false));
  };

  const handleGetAllVagas = () => {
    GetAllVagas({ userId: id })
      .then((res) => setVagas(res.data.length))
      .catch((err) => console.error(err.message))
      .finally(() => setRenderLoading(false));
  };

  useEffect(() => {
    handleGetAllCandidatos();
    handleGetAllVagas();
    handleGetDate();
  }, []);

  const handleGetDate = () => {
    const date = new Date();
    const weekdays = [
      "DOMINGO",
      "SEGUNDA",
      "TERÇA",
      "QUARTA",
      "QUINTA",
      "SEXTA",
      "SABADO",
    ];
    const months = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];
    const dayOfWeek = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    setData({
      dayOfWeek,
      day,
      month,
      year,
      formattedHours,
      formattedMinutes,
      amOrPm,
    });
  };

  return (
    <div className="bg-background p-4 min-h-screen flex justify-center">
      {renderLoading ? (
        <div className="flex h-screen w-full justify-center items-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <div className="md:p-20 flex flex-col max-w-[1000px] max-h-[1000px]">
          <div className="text-3xl">
            Olá <strong>{nome}</strong>,<br /> seja bem vindo!
          </div>
          <div className="grid sm:grid-cols-5 grid-cols-1 gap-4 mt-14 text-lg text-primary">
            <Link
              href="/candidatos"
              className="bg-white rounded-md p-4 flex justify-center items-center flex-col"
            >
              <UserList size={40} weight="fill" />
              <span className="text-black font-bold">{candidatos}</span>
              Candidatos
            </Link>
            <Link
              href="/vagas"
              className="bg-white cursor-pointer rounded-md p-4 flex justify-center items-center flex-col"
            >
              <BriefcaseMetal size={40} weight="fill" />
              <span className="text-black font-bold">{vagas}</span>
              Vagas
            </Link>
            <Link
              href={"/candidatos"}
              className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-center flex-col col-span-2"
            >
              Adicionar novos candidatos na base de currículos
              <PlusCircle size={32} className="mt-4" />
            </Link>
            <div className="bg-white max-sm:col-span-2 rounded-md p-4 flex justify-center flex-col items-center">
              {data?.dayOfWeek}
              <div>
                <span className="text-black">{data?.day}</span> {data?.month}.
                <span className="text-black">{data?.year}</span>
              </div>
              <div>
                <span className="text-black">{`${data?.formattedHours}:${data?.formattedMinutes}`}</span>{" "}
                {data?.amOrPm}
              </div>
            </div>

            <Link
              href="/candidatos"
              className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-center flex-col col-span-2"
            >
              Gerenciamento de candidatos existentes
              <div className="flex text-sm items-center mt-4">
                Ver mais
                <ArrowRight size={20} className="ml-2" />
              </div>
            </Link>
            <Link
              href="/vagas"
              className="bg-primary cursor-pointer text-white rounded-md p-4 flex justify-between flex-col col-span-2"
            >
              Adicionar novas vagas de emprego
              <PlusCircle size={32} className="mt-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
