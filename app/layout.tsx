import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import {twMerge} from "tailwind-merge";
import React from "react";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to some great music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge(font.className,'h-full')}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
