import React from 'react';
import uniqid from "uniqid";
import useReccommendStore from "@/app/reccommendation/useReccommendStore";
import useRecommendStore from "@/app/reccommendation/useReccommendStore";

interface SelectedSearchContentProps{

    type: "albums" | "artists" | "tracks";

}

const SelectedSearchContent: React.FC<SelectedSearchContentProps> = ({type,}) => {
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



    return (
        <div>
            {selectedData.length > 0 && (
                <>
                    <div className={"flex  w-full flex-col gap-y-6 bg-neutral-800/50"}>
                        <h1 className={"text-xl font-semibold text-white"}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}:
                        </h1>
                    </div>

                    <div className="flex w-full flex-wrap bg-neutral-800/40 p-2 ">
                        {selectedData.map((option, index) => {
                            let value = option.split("$$$");
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
                                    <img
                                        className={"h-[64px] w-[64px]"}
                                        height={64}
                                        alt={"albumIMage"}
                                        src={value[2]}
                                    />
                                    <div className={"flex flex-col gap-y-1 overflow-hidden"}>
                                        <p className={"truncate text-white"}>{value[0]}</p>
                                        {/* <p className={"truncate text-sm text-neutral-400"}>{value[0]}</p>*/}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectedSearchContent;