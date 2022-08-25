import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

const _queryWithParams = async (collectionName, query) => {
  const client = await clientPromise;
  const database = client.db("Resume");
  let sample;

  if (Object.keys(query).length == 0) {
    sample = await database.collection(collectionName).find({}).toArray();
  } else {
    sample = await database.collection(collectionName).find(query).toArray();
  }
  return sample;
};

export { _queryWithParams as queryWithParams };
