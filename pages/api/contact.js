import { queryWithoutParams } from "../../utils/api/queryWithoutParams";

export default async function handler(req, res) {
  const result = await queryWithoutParams("Contact");

  res.status(200).json(result);
}