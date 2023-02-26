import { useState } from "react";
import { TextInput } from "../../components/Inputs/TextInput";

export const LoginPage = () => {
  const [value, setValue] = useState(undefined);
  return (
    <div className="bg-login w-full h-[100vh] bg-no-repeat bg-cover flex sm:justify-start justify-center items-center">
      <div className="sm:h-full sm:w-[40vw] w-[90vw] h-[90vh] max-[639px]:rounded-md bg-white sm:p-16 p-10">
        <h1 className="text-primary text-title text-center font-bold">CVMVC</h1>
        <h1 className="text-title text-center font-bold text-black mt-14">
          Entrar em nossa plataforma
        </h1>
        <form>
          <TextInput
            label="Nome"
            value={value}
            onChange={(e) => setValue(e.target?.value)}
          />
        </form>
      </div>
    </div>
  );
};
