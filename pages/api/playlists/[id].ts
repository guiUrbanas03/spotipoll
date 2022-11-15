import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getPlaylist } from "../../../lib/spotify";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const token = session?.token as string;

  const { id } = req.query;

  if (!id) {
    throw new Error("Playlist id not found");
  }

  const response = await getPlaylist(token, id);

  return res.status(200).json({ response });
};
