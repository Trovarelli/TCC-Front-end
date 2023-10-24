import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserIdByToken = (token: string, secret: string): string | undefined => {
    const decoded = jwt.verify(token, secret as string) as JwtPayload
    return decoded?.key
}