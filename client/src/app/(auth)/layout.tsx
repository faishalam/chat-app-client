import { QueryProvider } from "@/components/QueryProviders/QueryClient";
import "../../app/globals.css";
import LayoutAuth from "@/components/layout/LayoutAuth";
import { AuthProviders } from "@/providers/authProviders/AuthProviders";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutAuth>
        <QueryProvider>
          <AuthProviders>
          {children}
          </AuthProviders>
          </QueryProvider>
      </LayoutAuth>
    </>
  );
}
