import {create} from "zustand";

interface PlayerStore {
    albums: string[];
    artists: string[]
    tracks: string[]
    genres: string[]
    setAlbums: (albums:string[]) => void;
    setArtists: (artists:string[]) => void;
    setTracks: (tracks:string[]) => void;
    setGenres: (genres:string[]) => void;

}

const useRecommendStore = create<PlayerStore>((set) => ({
    albums: [],
    artists: [],
    tracks: [],
    genres: [],
    setAlbums: (albums:string[]) => set({ albums: albums }),
    setArtists: (artists:string[]) => set({ artists: artists }),
    setTracks: (tracks:string[]) => set({ tracks: tracks }),
    setGenres: (genres:string[]) => set({genres:genres})
}))

export default useRecommendStore