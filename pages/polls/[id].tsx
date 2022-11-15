import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Poll } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaCheck, FaMusic, FaPlus, FaRegClock } from "react-icons/fa";
import PollItem from "../../components/poll-item/PollItem";
import { getPoll } from "../../lib/polls";
import { SpotifyPagination } from "../../types/SpotifyPagination";
import { millisToMinutesAndSeconds } from "../../utils/millisToMinutesAndSeconds";

type PollPageProps = {
  poll: Poll;
};

const CreatePollPage: NextPage<PollPageProps> = ({ poll }) => {
  const router = useRouter();
  const [tracks, setTracks] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<SpotifyPagination>({
    next: "",
    offset: 0,
  });

  const hasMore = pagination.next != null;

  const fetchTracks = useCallback(
    async (limit: number) => {
      setLoading(true);
      if (!hasMore) return;

      const res = await fetch(
        `/api/playlists/tracks?${new URLSearchParams({
          id: poll.spotify_playlist_id,
          limit: limit.toString(),
          offset: pagination.offset.toString(),
        })}`
      );

      if (res && res.status === 200) {
        const { items, next, offset } = await res.json();

        if (items) {
          setTracks([...tracks, ...items]);

          setPagination({
            next: next,
            offset: offset + 20,
          });
        }

        setLoading(false);
      }
    },
    [pagination]
  );

  useEffect(() => {
    fetchTracks(20);
  }, []);

  if (!poll || !tracks || tracks.length === 0)
    return (
      <Container maxW="7xl" my={12}>
        <Center>
          <Spinner size="xl" color="primary" />
        </Center>
      </Container>
    );

  return (
    <Container maxW="7xl" my={12}>
      <Box>
        <PollItem poll={poll} />
        <TableContainer whiteSpace="pre-wrap" overflowY="auto">
          <Table variant="striped" colorScheme="blackAlpha" size="sm">
            <Thead>
              <Tr>
                <Th color="primary">Title</Th>
                <Th color="primary">Album</Th>
                <Th color="primary">
                  <FaRegClock />
                </Th>
                <Th color="primary">Vote</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tracks &&
                tracks.map((track: any) => (
                  <Tr key={track.track.id} color="white">
                    <Td>
                      <Flex gap={4}>
                        {track.track.album.images[0] ? (
                          <Image
                            src={track.track.album.images[0].url}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <Box bgColor="secondary" rounded="sm" p="15px">
                            <FaMusic />
                          </Box>
                        )}
                        <Box>
                          <Box textOverflow="ellipsis" mb={1}>
                            {track.track.name}
                          </Box>
                          <Box opacity={0.5}>{track.track.artists[0].name}</Box>
                        </Box>
                      </Flex>
                    </Td>
                    <Td textOverflow="ellipsis">{track.track.album.name}</Td>
                    <Td>
                      {millisToMinutesAndSeconds(track.track.duration_ms)}
                    </Td>
                    <Td color="white" fontWeight="bold">
                      <ButtonGroup
                        width="100%"
                        size="sm"
                        isAttached
                        variant="outline"
                      >
                        <Button flex={1}>
                          {Math.floor(Math.random() * 100)}
                        </Button>
                        <IconButton
                          flex={1}
                          aria-label="Add to friends"
                          icon={
                            Math.random() > 0.7 ? (
                              <FaPlus />
                            ) : (
                              <FaCheck color="#1DB954" />
                            )
                          }
                        />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        {hasMore && (
          <Center>
            <Button  my={4} bgColor='primary' isLoading={loading} onClick={() => fetchTracks(20)}>
              Load more tracks
            </Button>
          </Center>
        )}
      </Box>
      {/* <Box
        position="fixed"
        w="100vw"
        bgColor="secondary"
        py={4}
        bottom={0}
        color="white"
        left={0}
        right={0}
      >
        <Center>
          <Flex textAlign="center">
            <Box>{" < "}</Box>
            <Box>{" 1 / 5 "}</Box>
            <Box>{" > "}</Box>
          </Flex>
        </Center>
      </Box> */}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const poll = await getPoll(params?.id as string);

  return {
    props: {
      poll,
    },
  };
};

export default CreatePollPage;
