import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../pages/_app";

const useFetch = (endpoint) => {
  const { api } = useContext(AppContext);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    refetch(api, endpoint);
  }, [api, endpoint]);

  async function refetch(api, endpoint) {
    setIsLoading(true);
    try {
      let response = await Axios.get(`${api}${endpoint}`);
      setData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, isLoading, error, refetch };
};

export default useFetch;
