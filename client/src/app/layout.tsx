import React from "react";

export const metadata = {
  title: "Chat Web App",
  description: "Chat Web App - Pick Any Topic",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body className="max-w-full min-h-screen">{children}</body>
      </html>
    </>
  );
}
