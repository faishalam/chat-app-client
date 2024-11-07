"use client";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "./Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const links = [
    {
      label: "Dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    Cookies.remove("Authorization");
    localStorage.removeItem("user_id");
    router.push("/login");
  };
  return (
    <div className="rounded-md flex flex-col md:flex-row bg-gray-100 w-full h-full flex-1 mx-auto border border-neutral-200 overflow-hidden">
      <Sidebar open={false} setOpen={() => {}}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <LogoIcon />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <button
                  className={cn(
                    "flex items-center justify-start gap-2  group/sidebar py-2"
                  )}
                  onClick={link.onClick}
                  key={idx}
                >
                  {link.icon}
                </button>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="/assets/chatting_man.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
