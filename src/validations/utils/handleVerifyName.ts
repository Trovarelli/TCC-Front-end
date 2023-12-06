export const handleVerifyName = (nome: string) => {
    if (nome.trim() === "") return false;
    const firstName = nome.split(" ")[0];
    const lastName = nome.split(" ")[1];
  
    if (!/^[\p{L}\s']+$/u.test(nome)) {
      return false;
    }
  
    return firstName?.length >= 3 && lastName?.length >= 3;
  }
  