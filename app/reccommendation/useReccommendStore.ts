import {create} from "zustand";

interface PlayerStore {
    albums: string[];
    artists: string[]
    tracks: string[]
    setAlbums: (albums:string[]) => void;
    setArtists: (artists:string[]) => void;
    setTracks: (tracks:string[]) => void;

}

const useRecommendStore = create<PlayerStore>((set) => ({
    albums: [],
    artists: [],
    tracks: [],
    setAlbums: (albums:string[]) => set({ albums: albums }),
    setArtists: (artists:string[]) => set({ artists: artists }),
    setTracks: (tracks:string[]) => set({ tracks: tracks }),
}))

export default useRecommendStore