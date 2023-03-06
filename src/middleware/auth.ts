import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const authMiddleware = () => {
  const token = Cookies.get("token");
  if (!token) {
    return false;
  }
  const isValid = jwt.decode(token as string);
  if (isValid) {
    return true;
  }
  return false;
};
