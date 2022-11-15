import { NextApiRequest, NextApiResponse } from "next";
import { createPoll } from "../../../lib/polls";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const poll = await createPoll(JSON.parse(req.body));

    if (poll) {
      return res.status(200).json(poll);
    }

    return res.status(400).json({ error: "Form data error" });
  } catch (error) {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export default handler;
