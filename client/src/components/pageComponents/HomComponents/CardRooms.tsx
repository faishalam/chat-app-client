// import roomsChannel from "@/lib/roomChannel";
import { timeAgo } from "@/lib/timeAgo";
import {
  DataRoomsResponse,
  useHomeContext,
} from "@/providers/rootProviders/HomeProviders";
import { useEffect, useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import cable from "@/lib/cable";

export default function CardRooms() {
  const { dataRooms, setRoomId } = useHomeContext();
  const [data, setData] = useState<DataRoomsResponse[]>([]);

  useEffect(() => {
    const messagesChannel = cable.subscriptions.create("RoomsChannel", {
      received(newRoom) {
        setData((prevData) => [...prevData, newRoom]);
      },
    });

    return () => {
      messagesChannel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (dataRooms) {
      setData(dataRooms);
    }
  }, [dataRooms]);

  return (
    <>
      <div className="flex flex-col w-full p-2 gap-1 ">
        {data?.map((item: DataRoomsResponse) => (
          <div
            className="w-full p-4 border-gray-500 shadow-sm hover:bg-neutral-300 transition-all cursor-pointer border-l-transparent border-r-transparent bg-gray-100 rounded-lg"
            key={item.id}
            onClick={() => setRoomId(item.id)}
          >
            <div className="relative flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full border flex items-end justify-center bg-gray-400">
                  <HiMiniUsers size={20} />
                </div>
                <p className="text-md font-medium text-black">{item.name}</p>
              </div>
              <p className="text-xs text-gray-500">
                {timeAgo(new Date(item.created_at))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
