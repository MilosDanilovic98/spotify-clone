import GameStart from "@/app/guessingGame/components/GameStart";
import React from "react";

import { cookies } from "next/headers";

import Header from "@/components/layout/Header";

import { createServerClient } from "@supabase/ssr";
import SinglePlaylistResponse=SpotifyApi.SinglePlaylistResponse

async function getData({ params }: { params: { playlistId: string } }) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session?.provider_token)
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${params.playlistId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.provider_token,
        },
      }
    );

    return response.json();
  } catch (e) {
    console.log(e);
  }
}

const Page = async ({ params }: { params: { playlistId: string } }) => {
  const data:SinglePlaylistResponse = await getData({ params });

  const getSongsToPlay = () => {
    let songArray:(string)[]= [];
    if (data) {
      for (let i = 0; i < data?.tracks?.items?.length; i++) {
        if (data?.tracks?.items[i].track?.preview_url) {
            songArray.push(data?.tracks?.items[i].track?.preview_url as string);
        }
      }
    }

    return songArray;

  };

  function shuffleArray(array:(string|null|undefined)[]) {
    let shuffledArr=array
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr
  }

  let arrayOfSongsToPlay = shuffleArray(getSongsToPlay());

  return (
    <div
      className={
        "h-full w-full overflow-hidden overflow-y-auto rounded-lg  bg-neutral-900 pb-48"
      }
    >
      <Header className={"h-[40%] sm:h-[30%]"}>
        <div className={"mb-2 flex flex-col gap-y-6"}>
          <h1 className={"text-3xl font-semibold text-white"}>PLAY</h1>
        </div>
      </Header>
      <GameStart  data={data} songsToPlay={arrayOfSongsToPlay} />
    </div>
  );
};

export default Page;
