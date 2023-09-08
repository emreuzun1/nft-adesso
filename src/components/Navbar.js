import { useContext } from "react";
import { getWalletRequest } from "../utils/interact";
import { DataContext } from "../providers/DataContextProvider";
import { Box, Button, Typography } from "@mui/material";

const Navbar = () => {
  const { account, setAccount, setSnackbar } = useContext(DataContext);
  const connect = async () => {
    const res = await getWalletRequest();
    if (!res.success)
      setSnackbar({ open: true, message: res.message, severity: "error" });
    else setAccount(res.address);
  };

  return (
    <nav>
      <img src="adesso.png" alt="Adesso" />
      <Box>
        {account ? (
          <Typography variant="h4">{account}</Typography>
        ) : (
          <Button onClick={() => connect()}>Connect Wallet</Button>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
