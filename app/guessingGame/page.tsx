"use client";

import GuessingGamePlayList from "@/app/guessingGame/components/GuessingGamePlayList";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/inputs/Select"
import React, { useEffect, useState } from "react";



import Header from "@/components/layout/Header";



import { useUser } from "@/hooks/useUser";


import ListOfFeaturedPlaylistsResponse = SpotifyApi.ListOfFeaturedPlaylistsResponse;
import MultipleCategoriesResponse = SpotifyApi.MultipleCategoriesResponse;




const Page = () => {
    const { spotifyToken, spotifyRefreshToken } = useUser();
    const [data, setData] = useState<ListOfFeaturedPlaylistsResponse>();
    const [categories,setCategories]=useState<MultipleCategoriesResponse>();
    const [selectedCategorie,setSelectedCategorie]=useState<string>('toplists');

    useEffect(() => {
        const fetchFeaturedPlaylists = async () => {
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/browse/categories/${selectedCategorie}/playlists`
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
    }, [spotifyToken, spotifyRefreshToken,selectedCategorie]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/browse/categories?limit=50`
                    ,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + spotifyToken,
                        },
                    }
                );
                setCategories(await response.json())


            } catch (e) {
                console.log(e);
            }
        };

        if (spotifyToken) {
            fetchCategories()
        }
    }, [spotifyToken, spotifyRefreshToken]);



    console.log(categories?.categories.items)

    return (<>
        <div className={"h-full w-full overflow-hidden overflow-y-auto rounded-lg  bg-neutral-900 pb-48"}>
            <Header>
                <div className={"mb-2 flex flex-col gap-y-6"}>
                    <h1 className={"text-3xl font-semibold text-white"}>Choose a playlist</h1>
                </div>
            </Header>
            <Select onValueChange={(value)=>setSelectedCategorie(value)}>
                <SelectTrigger className=" m-auto mb-12  flex w-3/4 sm:w-1/2 rounded-md border border-transparent bg-neutral-700 px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                    <SelectValue placeholder="Select a categorie" />
                </SelectTrigger>
                <SelectContent className={'  bg-neutral-700 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'}>
                    {categories?.categories?.items?.map((category)=>{
                        return  <SelectItem key={category.id} className={
                            `relative flex cursor-pointer items-center gap-x-3 rounded-md p-2 pl-12 hover:bg-neutral-800/50`
                        } value={category.id}>{category.name}</SelectItem>
                    })}

                </SelectContent>
            </Select>
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