"use client";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 h-[100vh] mt-20">
      <div className="ml-[1.5rem] max-[600px]:mr-[1.5rem] py-10 max-[600px]:col-span-2 flex items-center">
        <div>
          <div className="text-4xl font-bold mb-5">
            Sua jornada com o recrutamento começa aqui!
          </div>
          <div className="text-xl font-light mb-5">
            Oferecemos um sistema de gerenciamento de Candidatos poderoso em uma
            única plataforma de recrutamento.
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="md:col-span-1 col-span-2">
              <Button
                onClick={() => router.push("/register")}
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
        className="mr-[1.5rem] min-h-[70vh] bg-no-repeat bg-center h-full w-[100%] bg-contain max-[600px]:hidden"
      ></div>
      <div className="col-span-2 w-full rounded-[50px] shadow-home h-[2000px]"></div>
    </div>
  );
}
