"use client";

import SearchComponent from "@/app/reccommendation/components/SearchComponent";
import React from "react";
import Header from "@/components/layout/Header";;

import ComboBoxDropDown from "@/app/search/components/ComboBoxDropDown";
import GetRecommendations from "@/app/search/components/GetRecommendations";




const Page = () => {



  return (
    <div className={"h-full w-full overflow-hidden overflow-y-auto rounded-lg  bg-neutral-900 pb-48"}>
        <Header className={"from-bg-neutral-900"}>
            <div className={"mb-2 flex flex-col gap-y-6"}>
                <h1 className={"text-3xl font-semibold text-white"}>Recommend</h1>
            </div>
        </Header>
        <div className={"flex flex-col gap-2 px-5"}>
            <ComboBoxDropDown/>
            <SearchComponent type={"artists"} />
            <SearchComponent type={"tracks"} />
            <GetRecommendations/>
        </div>

    </div>
  );
};

export default Page;
