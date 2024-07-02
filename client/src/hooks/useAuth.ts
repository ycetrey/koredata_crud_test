import { useCallback, useState } from "react";
import { empty } from "../helpers";
import { api } from "../configs/axios.ts";
import axios from "axios";

export interface ErrorProps {
  error?: string | unknown;
  usuario?: boolean;
  senha?: boolean;
}

interface AuthState {
  token: string;
  usuario: string;
  image: string;
}

interface signInProps {
  usuario: string;
  senha: string;
}

interface signUpProps {
  nome: string;
  data_nascimento: string;
  email: string;
  senha: string;
  token?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<ErrorProps>({
    error: "",
    usuario: false,
    senha: false,
  });

  const [auth, setAuth] = useState<AuthState>(() => {
    const storagedUser = localStorage.getItem("@RAuth:usuario") || "";
    const storagedToken = localStorage.getItem("@RAuth:token") || "";
    const storagedImage = localStorage.getItem("@RAuth:userImage") || "";
    if (
      !empty(storagedUser) &&
      !empty(storagedToken) &&
      !empty(storagedImage)
    ) {
      return {
        token: storagedToken,
        usuario: storagedUser,
        image: storagedImage,
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(
    async (values: signInProps) => {
      let response;
      let mensagem = undefined;
      setError({
        error: "Aguarde...",
      });
      try {

        response = await api.post(
          `http://127.0.0.1:5000/login`, values);

        if (response.data.message) {
          throw new Error(response.data.message);
        }

      } catch (e) {
        mensagem = "";
        if (axios.isAxiosError(e)) {
          switch (e?.response?.status) {
            case 404:
              mensagem = "Nenhum usuário encontrado";
              break;
            default:
              mensagem = "Revise os dados e tente novamente";
          }
        } else {
          mensagem = (e as object).toString();
        }
        setError({
          error: mensagem,
        });
        return setAuth({ token: "", usuario: "", image: "" });
      }
      const image = "https://picsum.photos/60/60";
      const { token, nome } = response.data;

      const usuario = `${nome}`;
      setAuth({ token, usuario, image });
      localStorage.setItem("@RAuth:usuario", usuario);
      localStorage.setItem("@RAuth:token", token);
      localStorage.setItem("@RAuth:userImage", image);

      window.location.href = "/user";
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setError, user, setAuth],
  );

  const signUp = useCallback(
    async (values: signUpProps) => {
      setError({
        error: "Aguarde...",
      });
      try {
        await api.post(
          `http://127.0.0.1:5000/users`,
          values,
        );
      } finally {
        window.alert("Usuario cadastrado com sucesso, realize o login");
        window.location.href = "/login";
        setAuth({ token: "", usuario: "", image: "" });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setError, user, setAuth],
  );

  const deleteUser = useCallback(
    async (id: number) => {
      setError({
        error: "Aguarde...",
      });
      try {
        await api.delete(
          `http://127.0.0.1:5000/users/${id}`
        );
      } finally {
        window.alert("Usuario deletado com sucesso");
        window.location.href = "/user";
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setError, user, setAuth],
  );

  const createUser = useCallback(
    async (values: signUpProps) => {
      let response;
      let mensagem = undefined;
      setError({
        error: "Aguarde...",
      });
      try {
        response = await api.post(`http://127.0.0.1:5000/users`, values);
        if (response.data.message) {
          throw new Error(response.data.message);
        }
        window.alert("Usuario cadastrado com sucesso");
        window.location.href = "/user";
      } catch (e) {
        mensagem = "";
        if (axios.isAxiosError(e)) {
          switch (e?.response?.status) {
            case 404:
              mensagem = e?.response?.data?.message || "Nenhum usuário encontrado";
              break;
            default:
              mensagem = "Revise os dados e tente novamente";
          }
        } else {
          mensagem = (e as object).toString();
        }
        setError({
          error: mensagem,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setError, user, setAuth],
  );

  const editUser = useCallback(
    async (id:any, values: signUpProps) => {
      let response;
      let mensagem = undefined;
      setError({
        error: "Aguarde...",
      });
      try {
        response = await api.put(`http://127.0.0.1:5000/users/${id}`, values);
        if (response.data.message) {
          throw new Error(response.data.message);
        }
        window.alert("Usuario alterado com sucesso");
        window.location.href = "/user";
      } catch (e) {
        mensagem = "";
        if (axios.isAxiosError(e)) {
          switch (e?.response?.status) {
            case 404:
              mensagem = e?.response?.data?.message || "Nenhum usuário encontrado";
              break;
            default:
              mensagem = "Revise os dados e tente novamente";
          }
        } else {
          mensagem = (e as object).toString();
        }
        setError({
          error: mensagem,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setError, user, setAuth],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@RAuth:usuario");
    localStorage.removeItem("@RAuth:token");
    localStorage.removeItem("@RAuth:userImage");
    setUser(null);

    document.location.reload();
  }, []);
  return { auth, error, signIn, signUp, signOut, createUser, editUser, deleteUser };
};
