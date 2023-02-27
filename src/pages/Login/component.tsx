import { ChangeEvent, FormEvent, useState } from "react";
import { PrimaryButton } from "../../components";
import { TextInput } from "../../components/Inputs/TextInput";
export const Require = (value: any) => {
  if (!value) return "Campo obrigatório";
};

export const LoginPage = () => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [event.target?.id]: event.target?.value });
    setErrors({ ...errors, [event.target?.id]: Require(event.target?.value) });
  };

  const fnHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(userLogin);
  };
  return (
    <div className="bg-login w-full h-[100vh] bg-no-repeat bg-cover flex sm:justify-start justify-center items-center">
      <div className="sm:h-full sm:w-[40vw] w-[100vw] h-[100vh] max-[639px]:rounded-md bg-white sm:p-16 p-10">
        <h1 className="text-primary text-title text-center font-bold">TAHR</h1>
        <h1 className="text-title text-center font-bold text-black mt-14">
          Entrar em nossa plataforma
        </h1>
        <form onSubmit={fnHandleSubmit}>
          <TextInput
            id="email"
            label="E-mail"
            value={userLogin.email}
            onChange={(e) => handleOnChange(e)}
            helperText={errors.email}
            state={errors.email ? "error" : undefined}
          />
          <TextInput
            id="password"
            label="Senha"
            value={userLogin.password}
            onChange={(e) => handleOnChange(e)}
            inputType="password"
            helperText={errors.password}
            state={errors.password ? "error" : undefined}
          />
          <PrimaryButton btnName="Entrar" onClick={fnHandleSubmit} fullWidth />
        </form>
      </div>
    </div>
  );
};
