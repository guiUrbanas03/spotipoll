import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { SpotifyPlaylist } from "../../types/SpotifyPlaylist";
import CreatePollForm from "../create-poll-form/CreatePollForm";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useSession } from "next-auth/react";
import { useDefaultToast } from "../../hooks/useDefaultToast";
import { useRouter } from "next/router";
import { Poll } from "@prisma/client";

type CreatePollModalProps = {
  playlist: SpotifyPlaylist;
  isOpen: boolean;
  onClose: () => void;
};

type CreatePoll = {
  title: string;
  description?: string;
  max_tracks?: number;
  spotify_user_id: string;
  spotify_playlist_id: string;
};

const CreatePollModal: React.FC<CreatePollModalProps> = ({
  playlist,
  isOpen,
  onClose,
}) => {
  const form = useForm<CreatePoll>();
  const { data: session } = useSession();
  const toast = useDefaultToast();
  const router = useRouter();

  const handleCreatePoll: SubmitHandler<CreatePoll> = async (data) => {
    const res = await fetch("/api/polls", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        max_tracks: Number(data.max_tracks),
        spotify_user_id: session?.user.id,
        spotify_playlist_id: playlist.id,
      }),
    });

    if (res && res.status === 200) {
      toast({
        title: "Poll created successfully",
        status: "success",
      });

      const poll: Poll = await res.json();

      form.reset();
      onClose();
      router.push(`/polls/${poll.id}`);
    } else {
      toast({
        title: "Error creating poll",
        status: "error",
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="secondary">
          <form onSubmit={form.handleSubmit(handleCreatePoll)}>
            <ModalHeader color="white">
              <Text
                borderBottomWidth={1}
                borderColor="primary"
                width="fit-content"
              >
                {playlist.name}
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody color="white">
              {playlist.description && (
                <Box mb={8}>
                  <Text
                    fontSize="md"
                    color="whiteAlpha.600"
                    fontWeight="normal"
                  >
                    {playlist.description}
                  </Text>
                </Box>
              )}

              <CreatePollForm form={form} />
            </ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                onClick={onClose}
                variant="outline"
                color="white"
                borderColor="primary"
                _hover={{ bgColor: "#222" }}
              >
                Close
              </Button>
              <Button type="submit" variant="solid" bgColor="primary">
                Create poll
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePollModal;
