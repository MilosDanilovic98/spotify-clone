import SearchContent from "@/app/search/components/SearchContent";
import React from "react";

import LikedButton from "@/components/buttons/LikedButton";
import SearchInput from "@/components/inputs/SearchInput";
import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/skeleton/Skeleton";
import MediaItem from "@/components/songs/MediaItem";

const Loading = () => {
  return (
    <div
      className={
        "h-full w-full overflow-hidden overflow-y-auto rounded-lg  bg-neutral-900"
      }
    >
      <Header className={"from-bg-neutral-900"}>
        <div className={"mb-2 flex flex-col gap-y-6"}>
          <h1 className={"text-3xl font-semibold text-white"}>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <div className={"flex w-full flex-col gap-y-2 px-6"}>
        <div className={"flex flex-col gap-y-4  w-full items-center gap-x-4"}>

          <Skeleton className={"h-12 w-full"} />
          <Skeleton className={"h-12 w-full"} />
          <Skeleton className={"h-12 w-full"} />
          <Skeleton className={"h-12 w-full"} />
          <Skeleton className={"h-12 w-full"} />
          <Skeleton className={"h-12 w-full"} />

        </div>
      </div>
    </div>
  );
};

export default Loading;
