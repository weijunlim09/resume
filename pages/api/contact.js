import { queryWithoutParams } from "../../utils/api/queryWithoutParams";

export default async function handler(req, res) {
  try {
    const result = await queryWithoutParams("Contact");
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
}
