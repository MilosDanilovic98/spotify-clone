"use client";

import React, {useEffect, useState} from 'react';
import uniqid from "uniqid";
import useSound from "use-sound";


const GameStart = ({data,songsToPlay}) => {
    let [counter,setCounter]=useState(0)
    const [play, { pause, sound,stop }] = useSound(songsToPlay[0], {
        format: ["mp3"],
    });

    console.log(counter)
    useEffect(() => {
        if (counter%3===0 && counter!==0){
            songsToPlay.shift()
        }
    }, [counter]);


    return (
        <div className="flex h-full w-full flex-wrap ">
            <div onClick={()=>{
                play()
                setTimeout(() => {
                  stop();
                  setCounter((prevState)=>prevState+1)
                }, 1000);
                
            }}>BLAAAAAAAAAAA</div>
            {data?.tracks?.items.map((item) => {
                if (item?.track?.preview_url)
                    return (
                        <div

                            className={
                                "flex  cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50 "
                            }
                            key={uniqid()}
                        >
                            <img
                                className={"h-[64px] w-[64px]"}
                                height={64}
                                alt={"albumIMage"}
                                src={
                                    item?.track?.album?.images[item?.track?.album?.images?.length - 1]
                                        ?.url
                                }
                            />
                            <div className={"flex flex-col gap-y-1 overflow-hidden"}>
                                <p className={"truncate text-white"}>{item?.track?.name}</p>
                                <p className={"truncate text-white"}>{item?.track?.preview_url}</p>
                            </div>
                        </div>
                    );
            })}
        </div>
    );
};

export default GameStart;