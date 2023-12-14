"use client";

import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import useSound from "use-sound";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse;

type GameStartType = {
  data: SinglePlaylistResponse;
  songsToPlay: (string|null|undefined)[];
};

const GameStart: React.FC<GameStartType> = ({ data, songsToPlay }) => {
  let [counter, setCounter] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  const [play, { pause, sound, stop }] = useSound(
    songsToPlay[0] ? songsToPlay[0] : "no-song-url",
    {
      format: ["mp3"],
    }
  );

  console.log(counter);
  useEffect(() => {
    if (counter ===4) {
        setCounter(1)
      songsToPlay.shift();
    }
  }, [counter]);


  return (
      <div className={'h-[60%]'}>
          <div className={"flex h-[40%] justify-center gap-[50px] content-around w-full text-4xl"}>
              <div>Attempt:{counter}</div>
          <button
              disabled={isPlaying}
              onClick={() => {
                  setIsPlaying(true)
                  play();
                  setTimeout(() => {
                      stop();
                      setCounter((prevState) => prevState + 1);
                      setIsPlaying(false)

                  }, 1000);
              }}
              className={
                  " h-[120px] flex items-center justify-center rounded-full bg-green-500  drop-shadow-md transition hover:scale-110  group-hover:opacity-100"}
          >
              <Icon size={120} className="text-black" />

          </button>
              <div>Points 20</div>
          </div>

    <div className="flex h-[120%] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black   overflow-y-scroll overflow-x-hidden w-full flex-wrap ">
      {data?.tracks?.items.map((item) => {
        if (item?.track?.preview_url)
          return (
            <div
              className={
                "flex w-full sm:w-1/2   xl:w-1/3  cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50 "
              }
              key={uniqid()}
            >
              <img
                className={"h-[64px] w-[64px]"}
                height={64}
                alt={"albumIMage"}
                src={
                  item?.track?.album?.images[
                    item?.track?.album?.images?.length - 1
                  ]?.url
                }
              />
              <div className={"flex flex-col gap-y-1  overflow-hidden"}>
                <p className={"truncate text-white "}>{item?.track?.name}</p>
              </div>
            </div>
          );
      })}
    </div>
      </div>
  );
};

export default GameStart;
