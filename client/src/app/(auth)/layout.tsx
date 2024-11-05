import { QueryProvider } from "@/components/QueryProviders/QueryClient";
import "../../app/globals.css";
import LayoutAuth from "@/components/layout/LayoutAuth";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutAuth>
        <QueryProvider>{children}</QueryProvider>
      </LayoutAuth>
    </>
  );
}
