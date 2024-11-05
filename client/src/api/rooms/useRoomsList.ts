import { HeroServices } from "@/services/HeroServices";
import {  useQuery } from "react-query";

const useRoomList = () => {
  const useRoomListFn = async () => {
    try {
      const response = await HeroServices.get(`/rooms`);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ["use-room-list"],
    queryFn: useRoomListFn,
    // enabled: !!localStorage.getItem("access_token"),
  });

  return { ...query };
};

export default useRoomList;
