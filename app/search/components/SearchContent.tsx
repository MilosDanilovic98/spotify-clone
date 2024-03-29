"use client";

import React from "react";

import LikedButton from "@/components/buttons/LikedButton";
import MediaItem from "@/components/songs/MediaItem";

import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay=useOnPlay(songs)
  if (songs.length === 0) {
    return (
      <div className={"flex w-full flex-col gap-y-2 px-6 text-neutral-400"}>
        No songs found
      </div>
    );
  }

  return (
    <div className={"flex w-full flex-col gap-y-2 px-6"}>
      {songs.map((song) => (
        <div key={song.id} className={"flex w-full items-center gap-x-4"}>
          <div className={"flex-1"}>
            <MediaItem onClick={(id:string) => onPlay(id)} song={song} />
          </div>
          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
