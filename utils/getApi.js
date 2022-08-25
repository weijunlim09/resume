import axios from "axios";

const _getApi = async (apiEndpoint, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");

  const domainUri =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/";

  let response;
  let data;
  let result;

  try {
    const api = `${domainUri}api/${apiEndpoint}?${queryString}`;
    response = await axios.get(api);
    data = await response.data;
    result = JSON.parse(JSON.stringify(data));
  } catch (error) {}
  return result;
};

export { _getApi as getApi };
