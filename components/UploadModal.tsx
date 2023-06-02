"use client";
import React from "react";
import Modal from "@/components/Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, useForm } from "react-hook-form";

const UploadModal = () => {
  const uploadModal = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose();
    }
  };
  return (
    <Modal
      isOpen={uploadModal.isOpen}
      onChange={onChange}
      title={"Add a song"}
      description={"Upload an mp3 file"}
    >
      Form
    </Modal>
  );
};

export default UploadModal;
