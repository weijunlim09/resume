import { getApi } from "../utils/getApi.js";

const isConnected = ({ serialized }) => {
  return (
    <>
      <h1>{JSON.stringify(serialized)}</h1>
    </>
  );
};

export default isConnected;

export async function getStaticProps() {
  const data = {};
  return {
    props: {
      data,
    },
    revalidate: Number(process.env.REVALIDATE_VALUE),
  };
}
