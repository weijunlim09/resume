import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

const _queryWithoutParams = async (collectionName) => {
  const client = await clientPromise;
  const database = client.db("Resume");
  const sample = await database.collection(collectionName).find({}).toArray();
  return sample;
};

export { _queryWithoutParams as queryWithoutParams };
