import {
  AddMessage,
  RoomByIdResponse,
  useHomeContext,
} from "@/providers/rootProviders/HomeProviders";
import { SubmitHandler } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { formatMessageTime } from "@/lib/formatMessageTime";
import { useEffect, useRef, useState } from "react";
import cable from "@/lib/cable";
import { useQueryClient } from "react-query";
import ButtonHeadless from "@/components/button/ButtonHeadless";
import Cookies from "js-cookie"; 

export default function Chatting() {
  const {
    dataRoomById,
    isLoadingRoomById,
    mutateAddMessage,
    registerAddMessage,
    handleSubmitAddMessage,
    resetAddMessage,
    roomId,
    mutateDeleteMessage
  } = useHomeContext();

  const userId = Cookies.get("user_id");
  // const { userId } = useAuthContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<RoomByIdResponse>();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<AddMessage> = (data) => {
    const { content } = data;
    const payload = {
      content,
    };
    mutateAddMessage(payload);
    resetAddMessage();
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  useEffect(() => {
    if (dataRoomById) {
      setData(dataRoomById);
    }
  }, [dataRoomById]);

  useEffect(() => {
    const messagesChannel = cable.subscriptions.create("MessagesChannel", {
      received(newMessage) {
        if (newMessage.action === 'delete') {
          setData((prevData) => {
            if (prevData) {
              return {
                ...prevData,
                messages: prevData.messages.filter(msg => msg.id !== newMessage.id),
              };
            }
            return prevData;
          });
        } else {
          setData((prevData) => {
            if (prevData) {
              return {
                ...prevData,
                messages: [...prevData.messages, newMessage],
              };
            }
            return prevData;
          });
        }
      }
    });
    return () => {
      queryClient.refetchQueries({
        queryKey: ["use-room-by-id", { roomId: roomId }],
      });
      messagesChannel.unsubscribe();
    };
  }, []);

  const handleDelete = (id: number) => {
    const payload = {
      messageId: id,
      roomId: roomId 
    }
    mutateDeleteMessage(payload)
  };


  return (
    <>
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7794361/pexels-photo-7794361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="z-0 object-cover w-full h-full"
        />
      </div>
      {/* <div className="absolute inset-0 bg-black opacity-30 z-10"></div> */}

      {isLoadingRoomById ? (
        <div className="relative z-20 p-2 flex flex-col gap-4 flex-grow overflow-auto justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="z-20 p-2 flex flex-col gap-4 h-[800px] overflow-auto">
          {data?.messages?.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col gap-1 ${
                Number(userId) === item?.user?.id
                  ? "items-end justify-end"
                  : "items-start justify-start"
              }  max-w-full w-full`}
            >
              <p
                className={`text-black text-xs ${
                  Number(userId) === item?.user?.id ? "mr-4" : "ml-4"
                }`}
              >
                {item?.user?.username}
              </p>
              <div
                className={`relative max-w-lg rounded-lg flex justify-between gap-2 py-3 pr-3 px-1 shadow-md ${
                  Number(userId) === item?.user?.id
                    ? "mr-5 bg-green-300"
                    : "ml-5 bg-white"
                }`}
              >
                <div className="flex items-center justify-center z-50">
                  {Number(userId) === item?.user?.id && <ButtonHeadless onClick={() => handleDelete(item.id)}/>}
                </div>
                <p className="text-black text-sm">{item.content}</p>

                <p className="text-[10px] text-gray-400 flex justify-end items-end translate-y-2">
                  {formatMessageTime(new Date(item.created_at))}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="relative w-full max-w-full z-50 bg-gray-100 p-4 ">
        <form
          onSubmit={handleSubmitAddMessage(onSubmit)}
          className="w-full max-w-full flex items-center gap-4"
        >
          <input
            className="w-full p-2 px-3 rounded-2xl bg-white text-black placeholder-gray-400 text-sm border"
            type="text"
            placeholder="Type your message..."
            {...registerAddMessage("content")}
          />
          <IoSend
            type="submit"
            size={30}
            className="text-blue-600 hover:text-blue-700 transition-all cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}
