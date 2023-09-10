// To get the data from pinata we have to do it this way.
export const fetchDataFromPinata = async (token) => {
  const response = await fetch("https://" + token);
  let data = await response.json();
  return data;
};
