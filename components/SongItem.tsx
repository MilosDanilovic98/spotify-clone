"use client";
import React from "react";
import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";
interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className={
        "flex group relative flex-col items-center justify-center gap-x-4 " +
        "cursor-pointer overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
      }
    >
      <div
        className={
          "relative aspect-square h-full w-full overflow-hidden rounded-md"
        }
      >
        <Image className={"object-cover"} src={imagePath || '/images/liked.png'} fill alt={"Cover image"}/>

      </div>
      <div className={"flex flex-col items-start w-full pt-4 gap-y-1"}>
        <p className={"font-semibold truncate w-full"}>{data.title}</p>
        <p className={"text-neutral-400 text-sm pb-4 w-full truncate"}>By {data.author}</p>
      </div>
      <div
          className="
          absolute
          bottom-24
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
