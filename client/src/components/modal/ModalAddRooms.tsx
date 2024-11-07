import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ButtonSubmit from '../button/ButtonSubmit';
import React from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { InputCreateRoom } from '@/providers/rootProviders/HomeProviders';

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    register: UseFormReturn<InputCreateRoom>["register"];
    handleSubmit: UseFormReturn<InputCreateRoom>["handleSubmit"];
    mutateAddRoom: (data: InputCreateRoom) => void;
    isLoadingAddRoom: boolean;
}

export default function ModalAddRooms({openModal, setOpenModal, register, handleSubmit, mutateAddRoom, isLoadingAddRoom} : Props) {
    const onSubmit: SubmitHandler<InputCreateRoom> = (data) => {
      const { name } = data;
      const payload = {
        name
      };
      mutateAddRoom(payload);
    }

  return (
    <>
      <Dialog open={openModal} onClose={setOpenModal} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed max-w-full inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex max-w-full min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in max-w-sm w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3 text-center sm:mt-5 p-4">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-black"
                  >
                    Create Room
                  </DialogTitle>
                  <input
                    className="mt-2 border w-full rounded placeholder:text-xs p-2 bg-gray-100 text-black placeholder:text-gray-500"
                    placeholder="enter name/room.."
                    {...register("name", { required: true })}
                  />
                </div>

                <div className="mt-5 sm:mt-6 p-4">
                  <ButtonSubmit
                    type="submit"
                    classname="inline-flex w-full justify-center rounded-md bg-neutral-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    btnText="Create"
                    btnLoading={isLoadingAddRoom}
                  />
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
