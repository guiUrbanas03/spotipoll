import { title } from "process";
import prisma from "./prisma";

type Payload = {
  title: string;
  description?: string;
  max_tracks?: number;
  spotify_user_id: string;
  spotify_playlist_id: string;
};

export const createPoll = async (payload: Payload) => {
  const poll = await prisma.poll.create({
    data: {
      title: payload.title,
      description: payload.description,
      max_tracks: payload.max_tracks,
      spotify_user_id: payload.spotify_user_id,
      spotify_playlist_id: payload.spotify_playlist_id,
    },
  });

  await prisma.$disconnect();

  return poll;
};

export const getPoll = async (id: string) => {
  const poll = await prisma.poll.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  return poll;
};

export const getMyPolls = async (
  spotifyUserId: string,
  skip: number,
  take: number
) => {
  const polls = await prisma.poll.findMany({
    where: {
      spotify_user_id: spotifyUserId,
    },
    skip: skip,
    take: take,
  });

  await prisma.$disconnect();

  return polls;
};

export const deletePoll = async (id: string) => {};

export const setPollStatus = async (value: string) => {};

export const countMyPolls = async (spotifyUserId: string) => {
  const count = await prisma.poll.count({
    where: {
      spotify_user_id: spotifyUserId,
    },
  });

  await prisma.$disconnect();

  return count;
};
