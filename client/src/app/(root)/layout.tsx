import { SidebarDemo } from "@/components/sidebar/SidebarDemo";
import React from "react";
import "../../app/globals.css";
import { QueryProvider } from "@/components/QueryProviders/QueryClient";

export const metadata = {
  title: "KPP Monitoring",
  description: "KPP Monitoring Assets Management System",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-full w-full h-screen bg-gray-100">
        <QueryProvider>
            <SidebarDemo>{children}</SidebarDemo>
        </QueryProvider>
      </div>
    </>
  );
}
