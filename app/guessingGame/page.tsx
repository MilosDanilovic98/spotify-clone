"use client"

import React, {useEffect, useState} from "react";
import {useUser} from "@/hooks/useUser";
import ListOfFeaturedPlaylistsResponse = SpotifyApi.ListOfFeaturedPlaylistsResponse;
import UsersSavedTracksResponse=SpotifyApi.UsersSavedTracksResponse
import Header from "@/components/layout/Header";

import GuessingGamePlayList from "@/app/guessingGame/components/GuessingGamePlayList";


const Page = () => {
    const { spotifyToken, spotifyRefreshToken } = useUser();
    const [data, setData] = useState<ListOfFeaturedPlaylistsResponse>();

    useEffect(() => {
        const fetchFeaturedPlaylists = async () => {
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/browse/featured-playlists?limit=50`
                   ,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + spotifyToken,
                        },
                    }
                );

                setData(await response.json());
            } catch (e) {
                console.log(e);
            }
        };


        if (spotifyToken) {
            fetchFeaturedPlaylists();
        }
    }, [spotifyToken, spotifyRefreshToken]);

    console.log(data)
    return (<>
        <div className={"h-full w-full overflow-hidden overflow-y-auto rounded-lg  bg-neutral-900 pb-48"}>
            <Header className={"from-bg-neutral-900"}>
                <div className={"mb-2 flex flex-col gap-y-6"}>
                    <h1 className={"text-3xl font-semibold text-white"}>Choose a playlist</h1>
                </div>
            </Header>

            <div className={"flex  gap-10 flex-wrap flex-row px-5 justify-center sm:justify-start"}>
                <GuessingGamePlayList key={"likedSongs"} playlist={{name:"Liked songs",images:[{url: "/images/liked.png"}],id:"userLikedSongs"}}/>
                {data?.playlists?.items.map((playlist,index)=>{
                    return <GuessingGamePlayList key={index} playlist={playlist} />
                })}

            </div>

        </div>
    </>)
};


export default Page;
