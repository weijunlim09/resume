import { queryWithParams } from "../../utils/api/queryWithParams";

export default async function handler(req, res) {
  const query = req.query;

  const result = await queryWithParams("Skills", query);

  res.status(200).json(result);
}
