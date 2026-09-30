import { UserDataSource } from "@/model/repositories/userDataSource";
import { authService } from "@/model/services/authService";
import { router } from "expo-router";
import { useState } from "react";

type LoginState = {
  email: string;
  pin: number | null;
  error: string | null;
  loading: boolean;
};

type LoginActions = {
  alterarEmail: (email: string) => void;
  alterarPin: (pin: string) => void;
  entrar: () => void;
};

// Criar o OBJETO do service aqui
const dataSource = new UserDataSource();
const service = new authService(dataSource);

export function useLoginViewModel(): [LoginState, LoginActions] {
  const [email, setEmail] = useState<string>("");
  const [pin, setPin] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function alterarEmail(email: string): void {
    setEmail(email);
  }

  function alterarPin(pin: string): void {
    const pinNumerico: number = Number(pin);

    setPin(pin == "" ? null : pinNumerico);
  }

  async function entrar(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      if (!email) {
        throw new Error("Informe o email");
      }

      if (!pin) {
        throw new Error("Informe o seu pin");
      }

      await service.login(email, pin);
      router.replace("/home");
    } catch (erro: unknown) {
      setEmail("");
      setPin(null)

      return erro instanceof Error
        ? setError(erro.message)
        : setError("Não foi possivel realizar o login");
    } finally {
      setLoading(false);
    }
  }

  const loginState: LoginState = {
    email,
    pin,
    error,
    loading,
  };

  const loginActions: LoginActions = {
    alterarEmail,
    alterarPin,
    entrar,
  };

  return [loginState, loginActions];
}
