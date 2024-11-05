import { TypeError } from "@/providers/authProviders/AuthProviders";
import { AuthServices } from "@/services/AuthServices";
import { useMutation } from "react-query";

interface Props {
  onSuccess?: (data: FormRegister) => void;
  onError?: (error: TypeError) => void;
}

type FormRegister = {
  email: string;
  password: string;
  username: string;
};

const useRegister = (props: Props) => {
  const useRegisterFn = async (formRegister: FormRegister) => {
    try {
      const response = await AuthServices.post(`/users/register`, formRegister);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation({
    mutationKey: ["user-register"],
    mutationFn: useRegisterFn,
    ...props,
  });

  return { ...mutation };
};

export default useRegister;
