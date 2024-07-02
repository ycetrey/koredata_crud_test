import React, { createContext, useState } from "react";

interface AuthContextProps {
  auth: object | undefined;
  setAuth: object | undefined;
}

interface AuthUser {
  email: string;
  senha: string;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState<AuthUser>();
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
