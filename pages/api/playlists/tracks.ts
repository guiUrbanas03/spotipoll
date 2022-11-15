import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { getMyPlaylistTracks } from "../../../lib/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const token = session?.token as string;
  const playlistId = req.query.id?.toString() ?? "";
  const limitReq = Number(req.query.limit);
  const offsetReq = Number(req.query.offset);

  const response = await getMyPlaylistTracks(
    token,
    playlistId,
    limitReq,
    offsetReq
  );

  const { items, next, offset } = await response.json();

  const ids = items.map((item: any) => item.track.id);

  console.log("ids: ", ids);

  // const query = await prisma.$queryRaw``;

  const votes = await prisma.pollVote.findMany({
    where: {
      spotify_track_id: {
        in: ids,
      },
    },
  });

  prisma.$disconnect();

  const sortedVotes = votes.reduce((result: any, vote) => {
    if (result[vote.spotify_track_id] == null) {
      result[vote.spotify_track_id] = 1;
    } else {
      result[vote.spotify_track_id] = result[vote.spotify_track_id] + 1;
    }

    return result;
  }, {});

  const tracks = items
    .map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      votes: sortedVotes[item.track.id] ?? 0
        
    }))
    .sort((a: any, b: any) => {
      if (sortedVotes[a.id] < sortedVotes[b.id] || (sortedVotes[a.id] == null && sortedVotes[b.id] != null)) {
        return 1;
      }
      if (sortedVotes[a.id] > sortedVotes[b.id]  || (sortedVotes[a.id] != null && sortedVotes[b.id] == null)) {
        return -1;
      }

      return 0;
    });

  console.log("tracks: ", tracks.map((track: any) => ([track.id, track.votes])));
  console.log("votes: ", sortedVotes);

  return res.status(200).json({ items, next, offset });
};

export default handler;
