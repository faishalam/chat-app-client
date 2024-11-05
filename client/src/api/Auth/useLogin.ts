import { DataLogin, TypeError } from "@/providers/authProviders/AuthProviders";
import { AuthServices } from "@/services/AuthServices";
import { useMutation } from "react-query";

interface Props {
  onSuccess?: (data: DataLogin) => void;
  onError?: (error: TypeError) => void;
}

type FormLogin = {
  email: string;
  password: string;
};

const useLogin = (props: Props) => {
  const useLoginFn = async (formLogin: FormLogin) => {
    console.log(formLogin);
    try {
      const response = await AuthServices.post(`/users/login`, formLogin);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation({
    mutationKey: ["user-login"],
    mutationFn: useLoginFn,
    ...props,
  });

  return { ...mutation };
};

export default useLogin;
