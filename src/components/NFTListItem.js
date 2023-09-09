import { Grid } from "@mui/material";

const NFTListItem = ({ data }) => {
  return (
    <Grid item xs={12} md={4} lg={3} xl={2}>
      <img className="nft-img" src={data.image} alt={data.name} />
      <h4 className="nft-name">{data.name}</h4>
    </Grid>
  );
};

export default NFTListItem;
