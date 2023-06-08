import React from "react";
import { twMerge } from "tailwind-merge";

import { Figtree } from "next/font/google";

import Sidebar from "@/components/Sidebar";

import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/userProvider";

import getSongsByUserId from "@/actions/getSongsByUserId";

import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to some great music",
};
export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={twMerge(font.className, "h-full")}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
