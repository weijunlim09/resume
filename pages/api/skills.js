import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const database = client.db("Resume");

  const query = req.query;

  let result;

  if (Object.keys(query).length == 0) {
    result = await database.collection("Skills").find({}).toArray();
  } else {
    result = await database.collection("Skills").find(query).toArray();
  }

  res.status(200).json(result);
}
