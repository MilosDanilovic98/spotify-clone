import React, {useEffect, useState} from 'react';
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import Modal from "@/components/modals/Modal";

import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";


const CreatePlaylistModal = () => {
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen,onSubmit } = useCreatePlaylistModal();
    const [playlistName,setPlaylistName]=useState<string>("MyPlaylist")


    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            title={"Create your playlist"}
            description={"Create a name for your playlist"}
        >
            <Input defaultValue={playlistName}  onChange={(e)=>setPlaylistName(e.target.value)} placeholder={"Enter playlist name"}/>
            <Button className={'mt-4'}  placeholder={"Create playlist"} onClick={()=> {
                onSubmit(playlistName)
                setPlaylistName("MyPlaylist")
            }}>
                Create playlist
            </Button>
        </Modal>
    );
};

export default CreatePlaylistModal;