import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Poll } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import PollItem from "../../components/poll-item/PollItem";
import { countMyPolls, getMyPolls } from "../../lib/polls";

type PrismaPagination = { skip: number; take: number };

type PollsPageProps = {
  initialPolls: Poll[];
  count: number;
};

const PollsPage: NextPage<PollsPageProps> = ({ initialPolls, count }) => {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [pagination, setPagination] = useState<PrismaPagination>({
    skip: 5,
    take: 5,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const hasMore = polls.length < count;
  const handleLoadMorePolls = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(
      `/api/polls/list?${new URLSearchParams({
        skip: pagination.skip.toString(),
        take: pagination.take.toString(),
      })}`
    );
    const morePolls = await res.json();

    setPolls([...polls, ...morePolls]);

    setPagination({
      skip: pagination.take + 5,
      take: 5,
    });

    setLoading(false);
  };

  if (!polls || polls == null) {
    return (
      <Container maxW="7xl" my={12}>
        <Center>
          <Spinner size="xl" color="primary" />
        </Center>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" my={12}>
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        w="full"
        gap={8}
      >
        {polls &&
          polls.map((poll) => (
            <PollItem isLink={true} key={poll.id} poll={poll} />
          ))}
      </Grid>
      {hasMore && (
        <Center my={8}>
          <Button
            isLoading={loading}
            px={8}
            bgColor="primary"
            onClick={handleLoadMorePolls}
          >
            Load more polls
          </Button>
        </Center>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  let polls: Poll[] = [];
  let count: number = 0;

  if (session?.user.id) {
    polls = await getMyPolls(session?.user.id, 0, 5);
    count = await countMyPolls(session?.user.id);
  }

  return {
    props: {
      initialPolls: polls,
      count: count,
    },
  };
};

export default PollsPage;
