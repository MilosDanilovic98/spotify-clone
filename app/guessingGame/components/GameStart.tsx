"use client";

import React, { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { IoIosSkipForward } from "react-icons/io";
import { TbMusic } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import uniqid from "uniqid";
import useSound from "use-sound";

import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse;

type GameStartType = {
  data: SinglePlaylistResponse;
  songsToPlay: (string | null | undefined)[];
};

const GameStart: React.FC<GameStartType> = ({ data, songsToPlay }) => {
  const [counter, setCounter] = useState(1);
  const [points, setPoints] = useState(0);
  const [totalAllowedAttempts, setTotalAllowedAttempts] = useState(
    songsToPlay.length
  );
    const [remainingSongs, setRemainingSongs] = useState(
        songsToPlay.length
    );
  const [isPlaying, setIsPlaying] = useState(false);

  const [correctSongs, setCorrectSongs] = useState<
    (string | null | undefined)[]
  >([]);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  const [play, { stop }] = useSound(
    songsToPlay[0] ? songsToPlay[0] : "no-song-url",
    {
      format: ["mp3"],
    }
  );

  useEffect(() => {
    if (counter === 4) {
      setCounter(1);
      songsToPlay.shift();
      setRemainingSongs((prev)=>prev-1)
    }
  }, [counter]);

  const checkIfCorrectSong = (previewUlr: string | null | undefined) => {
    setTotalAllowedAttempts((prevState) => prevState - 1);
    if (songsToPlay[0] === previewUlr) {
      setCorrectSongs((prevState) => [...prevState, previewUlr]);
      setPoints((prevState) => prevState + 10);
      setCounter(4);

    }
  };

  const skipSong = () => {
    setCounter(1);
    setRemainingSongs((prev)=>prev-1)
    songsToPlay.shift();
  };

  return (
    <div className={"h-[60%]"}>
      <div className={"flex items-center"}>
        {" "}
        Remaining guesses: {Math.trunc(totalAllowedAttempts)}{" "}
        <FaRegQuestionCircle size={26} className={"inline pl-2"} />
      </div>

      <div className={"flex items-center"}>
        {" "}
        Remaining songs: {remainingSongs}{" "}
        <TbMusic size={26} className={"inline pl-2"} />
      </div>

      <div
        className={
          "flex h-[40%] w-full content-around justify-center gap-[50px] text-4xl"
        }
      >
        <div className={"flex items-center"}>Attempt:{counter}</div>
        <button
          disabled={isPlaying}
          onClick={() => {
            setIsPlaying(true);
            play();
            setTimeout(() => {
              stop();
              setCounter((prevState) => prevState + 1);
              setIsPlaying(false);
            }, 1000);
          }}
          className={
            " flex h-[100px] items-center justify-center rounded-full bg-green-500  drop-shadow-md group-hover:opacity-100  hover:scale-110"
          }
        >
          <Icon size={100} className="text-black" />
        </button>
        <div className={"flex items-center"}>
          <FiTarget size={70} className={"inline"} />:{points}
        </div>
        <button
          className={"text-xs"}
          onClick={() => {
            skipSong();
          }}
        >
          <IoIosSkipForward size={50} />
          Skip song
        </button>
      </div>
      <div className="flex h-[120%] w-full flex-wrap overflow-x-hidden   overflow-y-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-gray-500 ">
        {data?.tracks?.items.map((item) => {
          if (item?.track?.preview_url)
            return (
              <div
                className={twMerge(
                  "flex w-full cursor-pointer   items-center  gap-x-3 rounded-md p-2 hover:bg-neutral-800/50 sm:w-1/2 xl:w-1/3 ",
                  correctSongs.includes(item?.track?.preview_url) &&
                    "bg-green-800 hover:bg-green-800/50"
                )}
                key={uniqid()}
                onClick={() => checkIfCorrectSong(item?.track?.preview_url)}
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
