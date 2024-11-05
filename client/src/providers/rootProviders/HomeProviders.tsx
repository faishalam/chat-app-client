"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import useRoomsList from "../../api/rooms/useRoomsList";
import { useForm, UseFormReturn } from "react-hook-form";
import { AlertError, AlertSuccess } from "@/components/alert/AlertToastify";
import useAddRoom from "../../api/rooms/useAddRoom";
import { useQueryClient } from "react-query";
import useRoomById from "@/api/rooms/useRoomById";
import useAddMessage from "@/api/message/useAddMessage";
import useDeleteRoom from "@/api/rooms/useDeleteMessage";

export interface InputCreateRoom {
  name: string;
}

export type TypeError = {
  response?: {
    data?: {
      message?: string
    };
  };
}

export interface HomeProvidersProps {
  children: ReactNode;
}

export interface DataRoomsResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string; //
}

export interface Message {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  user: User;
}

export interface AddMessage {
  content: string;
}

export interface RoomByIdResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface DataDeleteResponse {
  message: string;
}

export interface DeleteRoom {
  id: number;
}

interface HomeContextProps {
  dataRooms: DataRoomsResponse[];
  isLoadingRooms: boolean;
  openModalAddRoom: boolean;
  setOpenModalAddRoom: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormReturn<InputCreateRoom>["register"];
  handleSubmit: UseFormReturn<InputCreateRoom>["handleSubmit"];
  mutateAddRoom: (data: InputCreateRoom) => void;
  isLoadingAddRoom: boolean;
  roomId: number | null;
  setRoomId: React.Dispatch<React.SetStateAction<number | null>>;
  dataRoomById: RoomByIdResponse;
  isLoadingRoomById: boolean;
  mutateAddMessage: (data: AddMessage) => void;
  isLoadingAddMessage: boolean;
  registerAddMessage: UseFormReturn<AddMessage>["register"];
  handleSubmitAddMessage: UseFormReturn<AddMessage>["handleSubmit"];
  resetAddMessage: UseFormReturn<AddMessage>["reset"];
  mutateDeleteMessage: (data: DeleteRoom) => void;
  isLoadingDeleteMessage: boolean;
}

const AuthContext = createContext<HomeContextProps | undefined>(undefined);

function useHomeContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("HomeContext must be used within an HomeProviders");
  }
  return context;
}

const HomeProviders = ({ children }: HomeProvidersProps) => {
  const { register, handleSubmit, reset } = useForm<InputCreateRoom>();
  const {
    register: registerAddMessage,
    handleSubmit: handleSubmitAddMessage,
    reset: resetAddMessage,
  } = useForm<AddMessage>();
  const [openModalAddRoom, setOpenModalAddRoom] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [roomId, setRoomId] = useState<number | null>(null);

  const { data: dataRooms, isLoading: isLoadingRooms } = useRoomsList();

  const { data: dataRoomById, isLoading: isLoadingRoomById } = useRoomById({
    params: {
      roomId: roomId,
    },
  });

  const { mutate: mutateAddRoom, isLoading: isLoadingAddRoom } = useAddRoom({
    onSuccess: () => {
      queryClient.refetchQueries("use-room-list");
      setOpenModalAddRoom(false);
      reset();
    },
    onError: () => {
      AlertError('Room Error');
    },
  });

  const { mutate: mutateAddMessage, isLoading: isLoadingAddMessage } =
    useAddMessage({
      params: {
        roomId: roomId,
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["use-room-by-id", { roomId: roomId }],
          exact: true,
        });
      },
      onError: () => {
        AlertError("Error add message");
      },
    });

  const { mutate: mutateDeleteMessage, isLoading: isLoadingDeleteMessage } =
    useDeleteRoom({
      onSuccess: (data: DataDeleteResponse) => {
        queryClient.refetchQueries({
          queryKey: ["use-room-by-id", { roomId: roomId }],
          exact: true,
        });
        AlertSuccess(data.message);
      },
      onError: () => {
        AlertError("Error delete message");
      },
    });

  return (
    <AuthContext.Provider
      value={{
        dataRooms,
        isLoadingRooms,
        openModalAddRoom,
        setOpenModalAddRoom,
        register,
        handleSubmit,
        mutateAddRoom,
        isLoadingAddRoom,
        roomId,
        setRoomId,
        dataRoomById,
        isLoadingRoomById,
        mutateAddMessage,
        isLoadingAddMessage,
        registerAddMessage,
        handleSubmitAddMessage,
        resetAddMessage,
        mutateDeleteMessage,
        isLoadingDeleteMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useHomeContext, HomeProviders };
