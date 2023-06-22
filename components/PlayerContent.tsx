"use client";

import { id } from "postcss-selector-parser";
import React, { useState } from "react";
import { Simulate } from "react-dom/test-utils";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import LikedButton from "@/components/LikedButton";
import MediaItem from "@/components/MediaItem";
import Slider from "@/components/Slider";

import { Song } from "@/types";

import usePlayer from "@/hooks/usePlayer";

import play = Simulate.play;

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(prevSong);
  };

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song} />
          <LikedButton songId={song.id} />
        </div>
      </div>
      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div
          onClick={() => {}}
          className={
            "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
          }
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
        <AiFillStepBackward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={onPlayPrevious}
        />
        <div
          onClick={() => {}}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>

      <div className={"hidden w-full  justify-end py-2 md:flex"}>
        <div className={"flex w-[120px] items-center gap-x-2"}>
          <VolumeIcon size={34} className={"cursor-pointer"} />
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
