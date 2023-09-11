import axios from "axios";

// To get the data from pinata we have to do it this way.
export const fetchDataFromPinata = async (token) => {
  const { data } = await axios.get(
    "https://ipfs.io/" + token.replace("://", "/")
  );
  return data;
};
