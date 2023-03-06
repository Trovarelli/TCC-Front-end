import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const HandleLogout = () => {
  Cookies.remove("token");
  Cookies.remove("autoLogin");
  return <Navigate to={"/"} />;
};
