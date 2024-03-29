"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import MediaItem from "@/components/songs/MediaItem";

import { Song } from "@/types";

import { useUser } from "@/hooks/useUser";
import LikedButton from "@/components/buttons/LikedButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const onPlay=useOnPlay(songs)
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className={"flex w-full flex-col gap-y-2 px-6 text-neutral-400"}>
        No liked songs.
      </div>
    );
  }

  return (
    <div className={"flex  w-full flex-col gap-y-2 p-6"}>
      {songs.map((song) => (
        <div key={song.id} className={"flex w-full items-center gap-x-4"}>
          <div className={"flex-1"}>
            <MediaItem song={song} onClick={(id:string)=>onPlay(id)} />
          </div>
            <LikedButton songId={song.id}/>
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
