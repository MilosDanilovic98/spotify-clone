import React from "react";

import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/skeleton/Skeleton";
import ListItem from "@/components/songs/ListItem";


const Loading = () => {
  return (
    <main className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
        <Header>

            <div className="mb-2">
                <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <ListItem
                        image="/images/liked.png"
                        name={"Liked Songs"}
                        href={"liked"}
                    />
                </div>
            </div>
        </Header>

      <div className="mb-7 mt-2 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Newest songs</h1>
        </div>
          <div className={"mt-2 flex flex-col gap-y-6"}>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
          </div>
      </div>
    </main>
  );
};

export default Loading;
