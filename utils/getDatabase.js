import clientPromise from "../lib/mongodb";

let resumeDatabase;

async function getDatabase() {
  const client = await clientPromise;
  resumeDatabase = client.db("sample");
}
getDatabase();

export default resumeDatabase;
