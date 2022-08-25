// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const query = req.query["id"];

  const client = await clientPromise;
  const database = client.db("sample");
  const sample = await database
    .collection("comments")
    .findOne({ _id: new ObjectId(query) });
  // const sample = await database.collection("comments").find({}).toArray();

  res.status(200).json(sample);
}
