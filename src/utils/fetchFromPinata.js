// To get the data from pinata we have to do it this way.
export const fetchDataFromPinata = async (token) => {
  const response = await fetch(`${modifyDataWithGateawayUrl(token)}`);
  let data = await response.json();
  data.image = modifyDataWithGateawayUrl(data.image);
  return data;
};

// We have to use ipfs/... instead of ipfs://...
// That's why we have to remove from url
const modifyDataWithGateawayUrl = (data) => {
  let modifiedData = data.replace(":/", "");
  return `https://ipfs.io/${modifiedData}`;
};
