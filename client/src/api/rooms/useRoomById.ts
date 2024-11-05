import { HeroServices } from "@/services/HeroServices";
import { useQuery } from "react-query";

interface Params {
  roomId: number | null;
}

type Props = {
  params: Params;
};

const useRoomById = (props: Props) => {
  console.log(props)
  const useRoomByIdFn = async () => {
    try {
      const response = await HeroServices.get(
        `rooms/${props?.params?.roomId}`
      );

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ["use-room-by-id", props?.params],
    queryFn: useRoomByIdFn,
    enabled: Boolean(props?.params?.roomId !== null),
  });

  return { ...query };
};

export default useRoomById;
