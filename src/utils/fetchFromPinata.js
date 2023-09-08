const GATEAWAY_DOMAIN = "https://beige-effective-frog-364.mypinata.cloud";
const PINATA_GATEAWAY_TOKEN =
  "Q4UfotrXq1KU8LDUI8tzd4GhgKSINk1FgV7UKaA2rSE1xbZ_DgIFU5tA_M8u86zP";

// To get the data from pinata we have to do it this way.
export const fetchDataFromPinata = async (token) => {
  const response = await fetch(`${modifyDataWithGateawayUrl(token)}`);
  let data = await response.json();
  data.image = modifyDataWithGateawayUrl(data.image);
  return data;
};

// We have to use ipfs/... instead of ipfs://... because of gateaway
// That's why we have to remove from url
const modifyDataWithGateawayUrl = (data) => {
  let modifiedData = data.replace(":/", "");
  return `${GATEAWAY_DOMAIN}/${modifiedData}?pinataGatewayToken=${PINATA_GATEAWAY_TOKEN}`;
};
