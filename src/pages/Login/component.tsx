import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckBox, PrimaryButton, TextInput } from "../../components";

export const Require = (value: any) => {
  if (!value) return "Campo obrigatório";
};

export const Login = () => {
  const remember = Cookies.get("autoLogin");
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    remember: !!remember,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [event.target?.id]: event.target?.value });
    setErrors({ ...errors, [event.target?.id]: Require(event.target?.value) });
  };

  const fnHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (userLogin.remember && !remember) {
      Cookies.set("autoLogin", `${userLogin.remember}`, { expires: 1200 });
    }

    axios
      .post("http://localhost:3000/auth/login", {
        email: userLogin.email,
        password: userLogin.password,
      })
      .then((res) => {
        Cookies.set("token", res.data.token, {
          expires: userLogin.remember ? 1200 : 1,
        });
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="bg-login w-full h-[100vh] bg-no-repeat bg-cover flex sm:justify-start justify-center items-center">
      <div className="sm:h-full md:w-[40vw] w-[100vw] h-[100vh] bg-white sm:p-16 p-10">
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
            checked={userLogin.remember}
            onChange={(event) =>
              setUserLogin({ ...userLogin, remember: event.target?.checked })
            }
            sm
          />
          <PrimaryButton
            btnName="Entrar"
            onClick={fnHandleSubmit}
            fullWidth
            loading={loading}
          />
          <div className="text-primary text-sm text-center mt-4 cursor-pointer">
            Ainda não possui conta? Cadastre-se aqui!
          </div>
        </form>
      </div>
    </div>
  );
};
