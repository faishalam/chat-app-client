import { TypeError } from "@/providers/authProviders/AuthProviders";
import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

interface Props {
  params: {
    roomId: number | null;
  };
  onSuccess?: () => void;
  onError?: (error: TypeError) => void;
}

type FormCreate = {
  content: string;
};

const useAddMessage = (props: Props) => {
  const useAddMessageFn = async (formCreate: FormCreate) => {
    try {
        const response = await HeroServices.post(`/rooms/${props?.params?.roomId}/messages`, formCreate);
        const { status } = response;
        if (status !== 200) return;
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation({
    mutationKey: ["use-add-message"],
    mutationFn: useAddMessageFn,
    ...props,
  });

  return { ...mutation };
};

export default useAddMessage;
