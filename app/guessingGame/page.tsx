"use client"

import {useEffect, useState} from "react";
import {useUser} from "@/hooks/useUser";
import UsersSavedTracksResponse = SpotifyApi.UsersSavedTracksResponse;


const Page = () => {
    const { spotifyToken, spotifyRefreshToken } = useUser();
    const [data, setData] = useState<UsersSavedTracksResponse>();


    useEffect(() => {
        const fetchSearch = async () => {
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/me/tracks
                    }`,
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
            fetchSearch();
        }
    }, [spotifyToken, spotifyRefreshToken]);
    return (<>
        {data}
    </>)
};


export default Page;
