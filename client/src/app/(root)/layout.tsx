import { SidebarDemo } from "@/components/sidebar/SidebarDemo";
import React from "react";
import "../../app/globals.css";
import { QueryProvider } from "@/components/QueryProviders/QueryClient";
import { HomeProviders } from "@/providers/rootProviders/HomeProviders";

export const metadata = {
  title: "Chat Web App",
  description: "Chat Web App - Pick Any Topic",
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-full w-full h-screen bg-gray-100">
        <QueryProvider>
          <SidebarDemo>
            <HomeProviders>{children}</HomeProviders>
          </SidebarDemo>
        </QueryProvider>
      </div>
    </>
  );
}
