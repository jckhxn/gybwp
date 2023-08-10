import { NextApiResponse, NextApiRequest } from "next";
import { SPONSORS } from "../../../components/Pages/SponsorsPage/static-data";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  return res.status(200).json(SPONSORS);
}
