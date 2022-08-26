import { getApi } from "../utils/getApi.js";

const isConnected = ({ data }) => {
  return (
    <>
      <h1>{JSON.stringify(data)}</h1>
    </>
  );
};

export default isConnected;

export async function getStaticProps() {
  const data = await getApi("profile");

  return {
    props: {
      data,
    },
    revalidate: process.env.REVALIDATE_VALUE,
  };
}
