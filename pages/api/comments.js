// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const database = client.db("sample_airbnb");
  const sample = await database
    .collection("listingsAndReviews")
    .find({})
    .limit(5)
    .toArray();

  res.status(200).json(sample);
}
