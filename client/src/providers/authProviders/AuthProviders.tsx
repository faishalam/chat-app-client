"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import useLogin from "@/api/Auth/useLogin";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";
import useRegister from "@/api/Auth/useRegister";
import Cookies from "js-cookie";

export type InputsLogin = {
  email: string;
  password: string;
};

export type InputsRegister = {
  email: string;
  password: string;
  username: string;
};

interface AuthContextProps {
  registerLogin: UseFormReturn<InputsLogin>["register"];
  handleSubmitLogin: UseFormReturn<InputsLogin>["handleSubmit"];
  resetLogin: UseFormReturn<InputsLogin>["reset"];
  resetFieldLogin: UseFormReturn<InputsLogin>["resetField"];
  errorsLogin: UseFormReturn<InputsLogin>["formState"]["errors"];
  mutateLogin: (data: InputsLogin) => void;
  isLoadingLogin: boolean;

  registerRegister: UseFormReturn<InputsRegister>["register"];
  handleSubmitRegister: UseFormReturn<InputsRegister>["handleSubmit"];
  resetRegister: UseFormReturn<InputsRegister>["reset"];
  resetFieldRegister: UseFormReturn<InputsRegister>["resetField"];
  errorsRegister: UseFormReturn<InputsRegister>["formState"]["errors"];
  mutateRegister: (data: InputsRegister) => void;
  isLoadingRegister: boolean;
  userId: string
}

interface AuthProvidersProps {
  children: ReactNode;
}

export interface DataLogin {
  access_token: string;
  role: string;
  user: {
    id: number;
    username: string;
  };
}

export type TypeError = {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthProviders");
  }
  return context;
}

const AuthProviders = ({ children }: AuthProvidersProps) => {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
    resetField: resetFieldLogin,
  } = useForm<InputsLogin>();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
    reset: resetRegister,
    resetField: resetFieldRegister,
  } = useForm<InputsRegister>();
  
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useLogin({
    onSuccess: (data : DataLogin) => {
      localStorage.setItem("user_id", data?.user?.id.toString());
      Cookies.set('Authorization', `Bearer ${data?.access_token}`, { expires: 7 });  // expires: 7 is optional, you can adjust the expiration
      router.push("/")
    },
    onError: (error : TypeError) => {
      AlertError(error?.response?.data?.message || "Unknown error occurred");
      resetFieldLogin("password");
    },
  });

  const {mutate: mutateRegister, isLoading:isLoadingRegister}= useRegister({
    onSuccess: () => {
      AlertSuccess("Register Success")
      router.push("/login")
    },
    onError: (error : TypeError) => {
      AlertError(error?.response?.data?.message || "Unknown error occurred");
    },
  })

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setUserId(user_id);
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        registerLogin,
        handleSubmitLogin,
        resetLogin,
        resetFieldLogin,
        errorsLogin,
        mutateLogin,
        isLoadingLogin,
        registerRegister,
        handleSubmitRegister,
        resetRegister,
        resetFieldRegister,
        errorsRegister,
        mutateRegister,
        isLoadingRegister,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthProviders };
