"use client";

import React, { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { SiMusicbrainz } from "react-icons/si";
import { GiGamepad } from "react-icons/gi";
import { twMerge } from "tailwind-merge";

import { usePathname } from "next/navigation";

import Box from "@/components/layout/Box";
import Library from "@/components/songs/Library";
import SidebarItem from "@/components/songs/SidebarItem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip/Tooltip";

import { Song } from "@/types";

import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();
  const { spotifyToken } = useUser();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname.includes("/search"),
        href: "/search",
      },

      {
        icon: SiMusicbrainz,
        label: "Recommendations",
        active: pathname === "/reccommendation",
        href: "/reccommendation",
      },
      {
        icon: GiGamepad,
        label: "Guessing Game",
        active: pathname === "/guessingGame",
        href: "/guessingGame",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        "flex h-full",
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-5">
            {routes.map((item) => {
              if (!spotifyToken && item.label === "Recommendations") {
                return (
                  <TooltipProvider delayDuration={0} key={item.label}>
                    <Tooltip>
                      <TooltipTrigger className={"w-fit"} >
                        <SidebarItem disabled={true} {...item} />
                      </TooltipTrigger>
                      <TooltipContent className={"bg-black  text-center"}>
                        Must log in with your spotify account to have access to this page
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              } else {
                return <SidebarItem key={item.label} {...item} />;
              }
            })}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
