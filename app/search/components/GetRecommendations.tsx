import useReccommendStore from "@/app/reccommendation/useReccommendStore";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import uniqid from "uniqid";

import Button from "@/components/buttons/Button";

import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";

import RecommendationsObject = SpotifyApi.RecommendationsObject;
import toast from "react-hot-toast";

const GetRecommendations = () => {
  const { spotifyToken, spotifyRefreshToken, user } = useUser();
  const player = usePlayer();
  const tracks = useReccommendStore((state) => state.tracks);
  const artists = useReccommendStore((state) => state.artists);
  const genres = useReccommendStore((state) => state.genres);

  const [data, setData] = useState<RecommendationsObject>();
  const [isGenerating, setIsGenerating] = useState(false);
  const[isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)

  const fetchSearch = async () => {
    setIsGenerating(true);
    const seperatedArtistArray = artists.map((artist) => {
      let value = artist.split("$$$");
      return value[1];
    });

    const artistSeeds = queryString.stringify(
      { seed_artists: seperatedArtistArray },
      { arrayFormat: "comma" }
    );

    const seperatedTracksArray = tracks.map((track) => {
      let value = track.split("$$$");
      return value[1];
    });
    const trackSeeds = queryString.stringify(
      { seed_tracks: seperatedTracksArray },
      { arrayFormat: "comma" }
    );

    const genreSeeds = queryString.stringify(
      { seed_genres: genres },
      { arrayFormat: "comma" }
    );

    if (genres.length > 0 || artists.length > 0 || tracks.length > 0)
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?limit=100&${artistSeeds}&${genreSeeds}&${trackSeeds}`,
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
    setIsGenerating(false);
  };

  const createPlaylist = async () => {
    setIsCreatingPlaylist(true)
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${user?.user_metadata?.provider_id}/playlists`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + spotifyToken,
          },

          body: JSON.stringify({
            name: "Cool Playlist",
            description: "New playlist description",
            public: false,
          }),
        }
      );
      const playlistData=await response.json();
      const bla =data?.tracks.map((track) => {
        return track.uri
      })

      const response2 = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistData?.id}/tracks`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + spotifyToken,
            },

            body: JSON.stringify({
              uris: bla,
              position: 0
            }),
          }
      );

    toast.success("Playlist created")
      setIsCreatingPlaylist(false)
    } catch (e) {
      console.log(e);
    }
  };

  if(genres.length+tracks.length+artists.length>5){
    return<div className={"w-full text-center text-3xl mt-4"}>You can only combine 5 seeds combined (genres,tracks and artists) :(</div>
  }



  return (
    <>
      {(genres.length > 0 || artists.length > 0 || tracks.length > 0) && (
        <Button
          className={"text-center"}
          disabled={isGenerating}
          onClick={() => fetchSearch()}
        >
          {isGenerating ? <FaSpinner /> : "Generate recommendations"}
        </Button>
      )}
      {data && data?.tracks?.length > 0 && (
        <Button
          className={"text-center"}
          disabled={isCreatingPlaylist}
          onClick={() => createPlaylist()}
        >
          {isCreatingPlaylist ? <FaSpinner /> : "Create playlist"}
        </Button>
      )}

      <div className="flex h-full w-full flex-wrap ">
        {data?.tracks?.map((option) => {
          if (option.preview_url)
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
                    option?.album?.images[option?.album?.images?.length - 1]
                      ?.url
                  }
                />
                <div className={"flex flex-col gap-y-1 overflow-hidden"}>
                  <p className={"truncate text-white"}>{option.name}</p>
                </div>
              </div>
            );
        })}
      </div>
    </>
  );
};

export default GetRecommendations;
