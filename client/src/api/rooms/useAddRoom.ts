import { TypeError } from "@/providers/authProviders/AuthProviders";
import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

interface Props {
  onSuccess?: () => void;
  onError?: (error: TypeError) => void;
}

type FormCreate = {
  name: string;
};

const useAddRoom = (props: Props) => {
  const useAddRoomFn = async (formCreate: FormCreate) => {
    try {
      const response = await HeroServices.post(`/rooms`, formCreate);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation({
    mutationKey: ["use-add-room"],
    mutationFn: useAddRoomFn,
    ...props,
  });

  return { ...mutation };
};

export default useAddRoom;
