"use client";

import useReccommendStore from "@/app/reccommendation/useReccommendStore";
import useRecommendStore from "@/app/reccommendation/useReccommendStore";
import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsCheck2All } from "react-icons/bs";
import uniqid from "uniqid";

import useDebounce from "@/hooks/useDebounce";
import { useUser } from "@/hooks/useUser";

const ComboBoxDropDown = () => {
  const selectedData = useReccommendStore((state) => state.genres);
  const setSelectedData = useRecommendStore((state) => state.setGenres);

  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query, 500);
  const { spotifyToken, spotifyRefreshToken } = useUser();

  const [data, setData] = useState();

  const filteredData =
    query === ""
      ? data?.genres
      : data?.genres?.filter((genre) => {
          return genre.toLowerCase().includes(debouncedValue.toLowerCase());
        });

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const tse = await fetch(
          `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + spotifyToken,
            },
          }
        );

        setData(await tse.json());
      } catch (e) {
        console.log(e);
      }
    };

    if (spotifyToken) {
      fetchSearch();
    }
  }, [spotifyToken]);

  return (
    <div className="flex w-full flex-col flex-wrap">
      <Combobox
        multiple={true}
        value={selectedData}
        onChange={(v) => setSelectedData(v)}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="flex w-full rounded-md border border-transparent bg-neutral-700 px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={"Select genres"}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredData?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData?.map((person) => (
                  <Combobox.Option
                    key={person}
                    className={({ active }) =>
                      `relative flex cursor-pointer items-center gap-x-3 rounded-md p-2 pl-12 hover:bg-neutral-800/50  ${
                        active ? "bg-neutral-800/50 text-white" : "text-green"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "text-green font-medium" : "font-normal"
                          }`}
                        >
                          {person}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <BsCheck2All
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
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
      <div>
        {selectedData.length > 0 && (
          <>
            <div className={"flex  w-full flex-col gap-y-6 bg-neutral-800/50"}>
              <h1 className={"text-xl font-semibold text-white"}>Genres</h1>
            </div>

            <div className="flex w-full flex-wrap bg-neutral-800/40 p-2 ">
              {selectedData.map((option, index) => {
                return (
                  <div
                    onClick={() => {
                      let temp = [...selectedData];
                      temp.splice(index, 1);
                      setSelectedData(temp);
                    }}
                    className={
                      "flex  cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50 "
                    }
                    key={uniqid()}
                  >
                    <div className={"flex flex-col gap-y-1 overflow-hidden"}>
                      <p className={"truncate text-white"}>{option}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComboBoxDropDown;
