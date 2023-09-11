import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  getMaxSupplyRequest,
  getTokensRequest,
  getTotalSupplyRequest,
  mint,
} from "./utils/interact";
import Navbar from "./components/Navbar";
import { fetchDataFromPinata } from "./utils/fetchFromPinata";
import NFTListItem from "./components/NFTListItem";
import { DataContext } from "./providers/DataContextProvider";
import BasicCarousel from "./components/Carousel";
import { Box, Button, Grid, Typography } from "@mui/material";

function App() {
  const { account, setSnackbar } = useContext(DataContext);
  const [amount, setAmount] = useState(1);
  const [tokens, setTokens] = useState([]);
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);

  // Gets the tokens and it's urls from pinata
  const getNfts = async () => {
    let tokenURIs = [];
    setTokens(tokenURIs);
    if (account) {
      await getTokensRequest(account).then((res) => (tokenURIs = res));
    }
    if (tokenURIs) {
      for (const uri of tokenURIs) {
        const data = await fetchDataFromPinata(uri);
        setTokens((oldArr) => [...oldArr, data]);
      }
    }
  };

  const getSupplies = async () => {
    setTotalSupply(await getTotalSupplyRequest());
    setMaxSupply(await getMaxSupplyRequest());
  };

  useEffect(() => {
    getNfts();
    getSupplies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const increment = () => {
    setAmount((value) => {
      if (value >= 5) return value;
      return value + 1;
    });
  };

  const decrement = () => {
    setAmount((value) => {
      if (value <= 1) return value;
      return value - 1;
    });
  };

  const _mint = async (e) => {
    e.preventDefault();
    const response = await mint(account, amount);
    if (response) {
      setSnackbar({
        open: true,
        message: response.message,
        severity: response.severity,
      });
    }
  };

  return (
    <Box>
      <Navbar />
      <Box className="container">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingY={2}
        >
          <Typography variant="h3" mb={2}>
            Adesso NFT Gallery
          </Typography>
          <BasicCarousel />
          <Typography variant="h4" mb={2}>
            {totalSupply} / {maxSupply}
          </Typography>
          <Box
            display="flex"
            mt={2}
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Button variant="text" size="large" onClick={decrement}>
              -
            </Button>
            <Typography variant="h3">{amount}</Typography>
            <Button variant="text" size="large" onClick={increment}>
              +
            </Button>
          </Box>
          <Button variant="contained" onClick={_mint}>
            Mint Now!
          </Button>
        </Box>
        {tokens.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            bgcolor="Background"
            p={3}
          >
            <Typography variant="h2" color="InfoText">
              Your Collection
            </Typography>
            <Grid container spacing={2} p={2}>
              {tokens.map((token) => (
                <NFTListItem data={token} key={token.dna} />
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
