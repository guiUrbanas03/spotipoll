import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getMyPlaylists } from "../../../lib/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const token = session?.token as string;
  const query = req.query;

  const response = await getMyPlaylists(token, query);
  const { items, limit, next, previous, total, offset } = await response.json();

  return res.status(200).json({ items, limit, next, previous, total, offset });
};

export default handler;
