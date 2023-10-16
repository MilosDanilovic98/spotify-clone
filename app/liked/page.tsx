import React from "react";

import Image from "next/image";

import Header from "@/components/layout/Header";

import getLikedSongs from "@/actions/getLikedSongs";
import LikedContent from "@/app/liked/components/LikedContent";

export const revalidate = 0;
const Liked = async () => {
  const songs = await getLikedSongs();
  return (
    <div
      className={
        "h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900"
      }
    >
      <Header>
        <div className={"mt-20"}>
          <div className={"flex flex-col items-center gap-x-5 md:flex-row"}>
            <div className={"relative h-32 w-32 lg:h-24 lg:w-24"}>
              <Image
                src={"/images/liked.png"}
                alt={"Playtlist"}
                className={"object-cover"}
                fill
              />
            </div>
            <div className={"mt-4 flex flex-col gap-y-2 md:mt-0"}>
              <p className={"hidden text-sm font-semibold md:block"}>
                Playlist
              </p>
              <h1
                className={
                  "text-4xl font-bold text-white sm:text-5xl lg:text-7xl"
                }
              >
                Liked songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
        <LikedContent songs={songs}/>
    </div>
  );
};

export default Liked;
