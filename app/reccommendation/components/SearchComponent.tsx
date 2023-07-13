"use client"

import useRecommendStore from "@/app/reccommendation/useReccommendStore";
import useReccommendStore from "@/app/reccommendation/useReccommendStore";
import SelectedSearchContent from "@/app/search/components/SelectedSearchContent";
import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsCheck2All } from "react-icons/bs";
import uniqid from "uniqid";

import useDebounce from "@/hooks/useDebounce";
import { useUser } from "@/hooks/useUser";

import AlbumSearchResponse = SpotifyApi.AlbumSearchResponse;
import ArtistSearchResponse = SpotifyApi.ArtistSearchResponse;
import TrackSearchResponse = SpotifyApi.TrackSearchResponse;

interface DataProp
  extends TrackSearchResponse,
    AlbumSearchResponse,
    ArtistSearchResponse {}

export default function SearchComponent({
  type,
}: {
  type: "albums" | "artists" | "tracks";
}) {
  const { spotifyToken, spotifyRefreshToken } = useUser();

  const [data, setData] = useState<DataProp>();
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce<string>(query, 500);

  const selectedData = useReccommendStore(
    (state) =>
      state[
        type === "albums" ? "albums" : type === "artists" ? "artists" : "tracks"
      ]
  );
  const setSelectedData = useRecommendStore(
    (state) =>
      state[
        type === "albums"
          ? "setAlbums"
          : type === "artists"
          ? "setArtists"
          : "setTracks"
      ]
  );

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${debouncedValue}&type=${
            type === "albums"
              ? "album"
              : type === "artists"
              ? "artist"
              : "track"
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

    if (spotifyToken && debouncedValue !== "") {
      fetchSearch();
    }
  }, [spotifyToken, spotifyRefreshToken, debouncedValue]);

  return (
    <div className="flex w-full flex-col">
      <Combobox
        className={"w-full"}
        // @ts-ignore
        multiple={true}
        value={selectedData}
        onChange={(v) => setSelectedData(v)}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="flex w-full rounded-md border border-transparent bg-neutral-700 px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                type === "albums"
                  ? "Search for albums"
                  : type === "artists"
                  ? "Search for artists"
                  : "Search for tracks"
              }
            />

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BiSearch size={16} />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data?.[type]?.items.length === 0 ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                data?.[type]?.items?.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative flex cursor-pointer items-center gap-x-3 rounded-md p-2 pl-12 hover:bg-neutral-800/50  ${
                        active ? "bg-neutral-800/50 text-white" : "text-green"
                      }`
                    }
                    value={
                      item.name +
                      "$$$" +
                      item.id +
                      "$$$" +
                      `${
                        item.type === "track"
                          ? item?.album?.images[item?.album?.images?.length - 1]
                              ?.url
                          : item?.images[item?.images?.length - 1]?.url
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "text-green font-medium" : "font-normal"
                          }`}
                        >
                          <img
                            className={"h-[64px] w-[64px]"}
                            height={64}
                            alt={"albumIMage"}
                            src={
                              item.type === "track"
                                ? item?.album?.images[
                                    item?.album?.images?.length - 1
                                  ]?.url
                                : item?.images[item?.images?.length - 1]?.url
                            }
                          />
                        </span>
                        {item.name}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <BsCheck2All size={26} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <SelectedSearchContent type={type} />
    </div>
  );
}
