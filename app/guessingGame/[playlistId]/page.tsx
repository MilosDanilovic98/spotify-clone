
import React from 'react';
import Header from "@/components/layout/Header";
import SinglePlaylistResponse=SpotifyApi.SinglePlaylistResponse
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import uniqid from "uniqid";
import PlayerContent from "@/components/player/PlayerContent";
import useSound from "use-sound";
import GameStart from "@/app/guessingGame/components/GameStart";


async function getData(params) {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${params.playlistId}`
            ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + "BQD2EWmahWT8uNi3-Cy2j6XPzNJwgszzban-etyKs_R1UORaH_B0u4Jr91oiiq0hJ64mvI5_0NGc5B_oWQ1mMA4QnQ_lBjjlHxVXZA0leO5oyvUG-9TbbXgFU2PDMShxeTmE7YZM6sUwmAUo8DrGh9MinveWr_6dDc0P1NYFGCoB5gh2QZzmdTwxRcVIs0GNiLAsAGa-s5QLCVhUBJ2FzVO74iUE2wMiT0F0_zaNqSphKwrMKClYUAbm3bb-LRegh300z98BCs6gRETxDQ",
                },
            }
        );

        return  response.json()
    } catch (e) {
        console.log(e);
    }
}


const Page =async ({ params }: { params: { playlistId: string } }) => {

    const data = await getData(params)


    const getSongsToPlay=() => {
        let songArray=[]
        if (data)
        for (let i = 0; i < data?.tracks?.items?.length; i++) {
            if(data?.tracks?.items[i].track?.preview_url){
                songArray.push(data?.tracks?.items[i].track?.preview_url)
            }
        }


        return songArray
    }
    let test=getSongsToPlay()






    // const [play, { pause, sound,stop }] = useSound(kkk[0], {
    //     format: ["mp3"],
    // });






    return (
        <div className={"h-full w-full overflow-hidden overflow-y-auto rounded-lg  bg-neutral-900 pb-48"}>
            <Header className={"from-bg-neutral-900"}>
                <div className={"mb-2 flex flex-col gap-y-6"}>
                    <h1 className={"text-3xl font-semibold text-white"}>PLAY</h1>
                </div>
            </Header>

            PLAY
            {params.playlistId}
            <div >TESTING</div>
            <GameStart data={data} songsToPlay={test}/>

        </div>
    );
};

export default Page;