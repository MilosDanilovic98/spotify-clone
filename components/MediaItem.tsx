"use client";
import React from "react";
import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}
const MediaItem: React.FC<MediaItemProps> = ({ song, onClick }) => {
  const imageUrl = useLoadImage(song);
  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }

    //TUrn on player
  };
  return (
    <div
      onClick={handleClick}
      className={
        "flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50 "
      }
    >
      <div
        className={
          "relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md"
        }
      >
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt={"Media Item"}
          className={"object-cover"}
        />
      </div>
        <div className={"flex-col flex gap-y-1 overflow-hidden"}>
            <p className={"text-white truncate"}>{song.title}</p>
            <p className={"text-neutral-400 text-sm truncate"}>{song.author}</p>
        </div>
    </div>
  );
};

export default MediaItem;
