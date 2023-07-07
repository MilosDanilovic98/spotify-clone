"use client";

import SearchComponent from "@/app/reccommendation/components/SearchComponent";
import React, {useEffect} from "react";
import Header from "@/components/layout/Header";;
import useReccommendStore from "@/app/reccommendation/useReccommendStore";




const Page = () => {
    const albums = useReccommendStore((state) => state.albums)
    const tracks = useReccommendStore((state) => state.tracks)
    const artists = useReccommendStore((state) => state.artists)
    console.log(albums, tracks, artists)


  return (
    <div className={"h-full w-full overflow-hidden overflow-y-auto rounded-lg  bg-neutral-900"}>
        <Header className={"from-bg-neutral-900"}>
            <div className={"mb-2 flex flex-col gap-y-6"}>
                <h1 className={"text-3xl font-semibold text-white"}>Reccommend</h1>
            </div>
        </Header>
        <div className={"flex flex-col gap-2"}>
            <SearchComponent type={"albums"} />
            <SearchComponent type={"artists"} />
            <SearchComponent type={"tracks"} />
        </div>

    </div>
  );
};

export default Page;
