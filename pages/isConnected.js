import clientPromise from "../lib/mongodb.js";

const isConnected = ({ isConnected }) => {
  return (
    <>
      <h1>{isConnected.toString()}</h1>
    </>
  );
};

export default isConnected;

export async function getServerSideProps() {
  let isConnected;

  try {
    const client = await clientPromise;
    isConnected = true;
  } catch (e) {
    isConnected = false;
  }

  return {
    props: {
      isConnected,
    },
  };
}
