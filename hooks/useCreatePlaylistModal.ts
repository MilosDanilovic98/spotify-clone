import { create } from "zustand";

interface CreatePlayListStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit:(playlistName:string)=>void;
}

const useCreatePlayListModal = create<CreatePlayListStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onSubmit: (()=>{})

}));

export default useCreatePlayListModal;
