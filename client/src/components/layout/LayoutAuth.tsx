import Image from "next/image";
import ContinueWith from "../pageComponents/AuthComponents/ContinueWith";

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-full w-full bg-white flex min-h-screen mx-auto">
        <section className="max-w-full w-full flex flex-col justify-center items-center">
          <div className="w-48 h-40">
            <Image
              src="/assets/chat.png"
              alt="logo"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          {children}
          <div className="max-w-full md:max-w-md w-full space-y-3 px-10 lg:px-0">
            <ContinueWith />
          </div>
        </section>

        <section className="hidden md:flex md:justify-center md:items-center md:relative md:max-w-full md:w-full ">
          <Image
            src="/assets/chatting_man.png"
            alt="logo"
            width={550}
            height={550}
            className="object-cover" 
          />

        </section>
      </div>
    </>
  );
}
