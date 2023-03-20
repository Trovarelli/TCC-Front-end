import { Trash, User, House } from "phosphor-react";
import { ReactElement } from "react";

export default function getIcon(v: string): ReactElement<any, any> {
  switch (v) {
    case "trash":
      return <Trash />;
    case "home":
      return <House />;
    case "user":
      return <User />;
    default:
      return <></>;
  }
}
