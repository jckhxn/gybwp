import { NextApiResponse, NextApiRequest } from "next";
import { SPONSORS } from "../../../components/Pages/SponsorsPage/static-data";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  if (_req.method === "GET") {
    return res.status(200).json(SPONSORS);
  }
  if (_req.method === "POST") {
    //do the thing.
  }
}
