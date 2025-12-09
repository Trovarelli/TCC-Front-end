export const handleVerifySpecialCharacters = (s: string) => {
  if(s === '') return true  
  if (s.length < 6) {
      return false;
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(s)) {
      return false;
    }
  
    if (!/[A-Z]/.test(s)) {
      return false;
    }
  
    if (!/[a-z]/.test(s)) {
      return false;
    }
  
    if (!/\d/.test(s)) {
      return false;
    }
  
    return true;
  };
  

