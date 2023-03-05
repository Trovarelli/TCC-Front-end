import { ChangeEvent, FormEvent, useState } from "react";
import { CheckBox, PrimaryButton, TextInput } from "../../components";

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
        <div className="flex justify-center">
          <img src="src/assets/img/logo/logo-text.svg" width="250px"></img>
        </div>
        <h1 className="text-title text-center font-bold text-black mt-14">
          Entre em nossa plataforma
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
          <CheckBox
            label="Manter-se conectado."
            id="checkBox"
            onChange={(event) => console.log(event.target.checked)}
            sm
          />
          <PrimaryButton btnName="Entrar" onClick={fnHandleSubmit} fullWidth />
          <div className="text-primary text-sm text-center mt-4 cursor-pointer">
            Ainda não possui conta? Cadastre-se aqui!
          </div>
        </form>
      </div>
    </div>
  );
};
