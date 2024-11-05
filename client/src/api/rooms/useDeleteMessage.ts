import { TypeError } from "@/providers/authProviders/AuthProviders";
import { DataDeleteResponse, DeleteRoom } from "@/providers/rootProviders/HomeProviders";
import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

interface Props {
  onSuccess?: (data: DataDeleteResponse) => void;
  onError?: (error: TypeError) => void;
}


const useDeleteMessage = (props: Props) => {
  const useDeleteMessageFn = async ({id}: DeleteRoom) => {
    try {
      const response = await HeroServices.delete(`/rooms/${id}`);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation({
    mutationKey: ["use-delete-room"],
    mutationFn: useDeleteMessageFn,
    ...props,
  });

  return { ...mutation };
};

export default useDeleteMessage;
