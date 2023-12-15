import { Song } from "@/types";


import {createBrowserClient} from "@supabase/ssr";

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (!song) {
    return "";
  }

  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);
  return songData.publicUrl;
};

export default useLoadSongUrl;
