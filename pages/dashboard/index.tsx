import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import SpotifyPlaylist from "../../components/spotify-playlist/SpotifyPlaylist";
import CreatePollModal from "../../components/create-poll-modal/CreatePollModal";
import { useDashboard } from "./useDashboard";

const Dashboard: NextPage = () => {
  const disclosure = useDisclosure();

  const {
    playlists,
    selectedPlaylist,
    handleClickOpenPoll,
    fetchPlaylists,
    loading,
    hasMore,
  } = useDashboard(disclosure);

  if (!playlists || playlists.length === 0) {
    return (
      <Container maxW="7xl" my={12}>
        <Center>
          <Spinner size="xl" color="primary" />
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Box my={10}>
        <Container maxW="7xl">
          <Flex alignItems="center" justifyContent="space-between">
            <Text
              color="white"
              fontSize="xl"
              borderBottomWidth={1}
              borderColor="primary"
            >
              Select a playlist:
            </Text>
          </Flex>
          <Box mt={10}>
            <Grid
              gridTemplateColumns={{
                base: "1fr 1fr",
                sm: '1fr 1fr 1fr',
                md: '1fr 1fr 1fr 1fr',
                lg: "1fr 1fr 1fr 1fr 1fr",
              }}
              gap={4}
              w="full"
            >
              {playlists
                ? playlists.map((playlist) => (
                    <SpotifyPlaylist
                      key={playlist.id}
                      playlist={playlist}
                      onClick={() => handleClickOpenPoll(playlist)}
                    />
                  ))
                : null}
            </Grid>
          </Box>
          {hasMore && (
            <Center my={8}>
              <Button
                isLoading={loading}
                onClick={() => fetchPlaylists(10)}
                px={8}
                bgColor="primary"
              >
                Load more playlists
              </Button>
            </Center>
          )}
        </Container>
      </Box>
      {selectedPlaylist ? (
        <CreatePollModal
          playlist={selectedPlaylist}
          isOpen={disclosure.isOpen}
          onClose={disclosure.onClose}
        />
      ) : null}
    </>
  );
};

export default Dashboard;
