"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/Input";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState();

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
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {};

  return (
    <Modal
      isOpen={uploadModal.isOpen}
      onChange={onChange}
      title={"Add a song"}
      description={"Upload an mp3 file"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id={"title"}
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder={"Song title"}
        />
      </form>
    </Modal>
  );
};

export default UploadModal;
