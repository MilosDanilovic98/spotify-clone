import useReccommendStore from "@/app/reccommendation/useReccommendStore";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

import { useUser } from "@/hooks/useUser";

const GetRecommendations = () => {
  const { spotifyToken, spotifyRefreshToken } = useUser();
  const tracks = useReccommendStore((state) => state.tracks);
  const artists = useReccommendStore((state) => state.artists);
  const genres = useReccommendStore((state) => state.genres);

  const [data, setData] = useState();

  const fetchSearch = async () => {
    const seperatedArtistArray = artists.map((artist) => {
      let value = artist.split("$$$");
      return value[1];
    });

    const artistSeeds = queryString.stringify(
      { seed_artists: seperatedArtistArray },
      { arrayFormat: "separator", arrayFormatSeparator: "%" }
    );

    const seperatedTracksArray = tracks.map((track) => {
      let value = track.split("$$$");
      return value[1];
    });
    const trackSeeds = queryString.stringify(
      { seed_tracks: seperatedTracksArray },
      { arrayFormat: "separator", arrayFormatSeparator: "%" }
    );

    const genreSeeds = queryString.stringify(
      { seed_genres: genres },
      { arrayFormat: "separator", arrayFormatSeparator: "%" }
    );

    if (genres.length > 0 || artists.length > 0 || tracks.length > 0)
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?${artistSeeds}&${genreSeeds}&${trackSeeds}`,
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

  return (
      <>
    <div onClick={() => fetchSearch()} className={"h-24 w-full bg-white"}>

    </div>

    <div className="flex w-full flex-wrap h-full ">
        {data?.tracks.map((option) => {

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
                        src={option?.album?.images[option?.album?.images?.length - 1]?.url}
                    />
                    <div className={"flex flex-col gap-y-1 overflow-hidden"}>
                        <p className={"truncate text-white"}>{option.name}</p>
                        {/* <p className={"truncate text-sm text-neutral-400"}>{value[0]}</p>*/}
                    </div>
                </div>
            );
        })}
    </div>
      </>
  );
};

export default GetRecommendations;
