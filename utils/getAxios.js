import axios from "axios";

const _getAxios = async (endpoints, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  const response = await axios.get(
    `${process.env.API_URL}${endpoints}${
      Object.keys(params).length !== 0 ? `?${queryString}` : ""
    }`
  );
  const data = await response.data;

  return data;
};

export { _getAxios as getAxios };
