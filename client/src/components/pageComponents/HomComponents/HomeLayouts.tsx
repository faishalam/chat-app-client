"use client";
import { useHomeContext } from "@/providers/rootProviders/HomeProviders";
import { IoMdAdd } from "react-icons/io";
import CardRooms from "./CardRooms";
import ModalAddRooms from "@/components/modal/ModalAddRooms";
import { timeAgo } from "@/lib/timeAgo";
import Chatting from "./Chatting";
import { HiMiniUsers } from "react-icons/hi2";
import { useEffect, useState } from "react";
import LoadingSkeletonRoomList from "@/components/loading/LoadingSkeletonRoomList";

export default function HomeLayout() {
  const {
    openModalAddRoom,
    setOpenModalAddRoom,
    register,
    handleSubmit,
    mutateAddRoom,
    isLoadingAddRoom,
    dataRoomById,
    roomId,
    isLoadingRooms,
  } = useHomeContext();

  const [openChatting, setOpenChatting] = useState<boolean>(false);

  useEffect(() => {
    if (roomId) {
      setOpenChatting(true);
    }
  }, [roomId]);

  return (
    <>
      <div className="flex flex-1 h-full bg-gray-100">
        <div className="px-2 py-4 rounded-tl-2xl border border-neutral-200 bg-white flex flex-col gap-2 flex-1 w-full h-full overflow-hidden">
          <div className="flex max-w-full w-full gap-2">
            <div className="flex w-full max-w-xl justify-between items-center p-2">
              <p className="text-3xl font-semibold text-black">Chat Rooms</p>
              <IoMdAdd
                size={35}
                className="text-black hover:text-gray-500 transition-all cursor-pointer"
                onClick={() => setOpenModalAddRoom(true)}
              />
            </div>

            <div
              className={`flex w-full max-w-full rounded-md bg-gray-100 px-4 shadow-sm justify-start items-center gap-2 ${
                openChatting ? "block" : "hidden"
              }`}
            >
              <div className="w-8 h-8 rounded-full border flex items-center justify-center bg-gray-400">
                <HiMiniUsers size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-black flex items-center">
                  {dataRoomById?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {timeAgo(new Date(dataRoomById?.created_at))}
                </p>
              </div>
            </div>
          </div>

          <div className="flex max-w-full w-full gap-2 h-full">
            <div className="max-w-xl w-full h-full text-white overflow-y-scroll">
              {isLoadingRooms ? <LoadingSkeletonRoomList /> : <CardRooms />}
            </div>

            {!openChatting ? (
              <div className="flex justify-center items-center max-w-full w-full text-gray-400">
                Choose Any Room
              </div>
            ) : (
              <div
                className={`relative flex flex-col max-w-full w-full rounded-md overflow-hidden shadow`}
              >
                <Chatting />
              </div>
            )}
          </div>
        </div>

        {openModalAddRoom && (
          <ModalAddRooms
            openModal={openModalAddRoom}
            setOpenModal={setOpenModalAddRoom}
            register={register}
            handleSubmit={handleSubmit}
            mutateAddRoom={mutateAddRoom}
            isLoadingAddRoom={isLoadingAddRoom}
          />
        )}
      </div>
    </>
  );
}
