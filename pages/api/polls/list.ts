import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { createPoll, getMyPolls } from "../../../lib/polls";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const id = session?.user.id as string;
  const { skip, take } = req.query;

  try {
    const polls = await getMyPolls(id, Number(skip), Number(take));

    if (polls) {
      return res.status(200).json(polls);
    }

    return res.status(400).json({ error: "Form data error" });
  } catch (error) {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export default handler;
