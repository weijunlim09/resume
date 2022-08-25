import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const database = client.db("Resume");
  const sample = await database.collection("Contact").find({}).toArray();

  res.status(200).json(sample);
}
