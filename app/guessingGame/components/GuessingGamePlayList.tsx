"use client"
import React from 'react';
import PlaylistObjectSimplified=SpotifyApi.PlaylistObjectSimplified
import Image from "next/image";
import PlayButton from "@/components/buttons/PlayButton";
import Link from "next/link";

type PlayListType={
    playlist:PlaylistObjectSimplified
}
type UserSavedPlaylist={
    playlist:{name:string,images:[{url:string}],id:string}
}


const GuessingGamePlayList: React.FC<PlayListType | UserSavedPlaylist> = ({playlist}) => {


    return (
        <Link
            href={`guessingGame/${playlist.id}`}

            className={
                "group relative flex flex-col items-center justify-center gap-x-4 h-52 w-40   " +
                "cursor-pointer overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
            }

        >
            <div
                className={
                    "relative aspect-square h-full w-full overflow-hidden rounded-md"
                }
            >
                <Image
                    className={"object-cover"}
                    src={playlist.images[0].url}
                    fill
                    alt={"Cover image"}
                />
            </div>
            <div className={"flex w-full flex-col items-start gap-y-1 pt-4"}>
                <p className={"w-full truncate font-semibold"}>{playlist.name}</p>
            </div>
            <div
                className="
          absolute
          bottom-10
          right-5
        "
            >
                <PlayButton />
            </div>
        </Link>
    );
};

export default GuessingGamePlayList;