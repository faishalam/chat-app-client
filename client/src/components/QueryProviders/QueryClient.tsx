"use client";

import { AuthProviders } from "@/providers/authProviders/AuthProviders";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <AuthProviders>{children}</AuthProviders> */}
      <ToastContainer />
    </QueryClientProvider>
  );
};
