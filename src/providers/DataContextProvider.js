import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { connectWalletRequest } from "../utils/interact";

export const DataContext = React.createContext();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const DataContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const connectWallet = async () => {
      const res = await connectWalletRequest();
      if (res.success) setAccount(res.address);
      else {
        setSnackbar({ open: true, message: res.message, severity: "error" });
      }
    };
    connectWallet();
    walletListener();
  }, []);

  const walletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ open: false });
  };

  return (
    <DataContext.Provider value={{ account, setAccount, setSnackbar }}>
      <Snackbar
        open={snackbar.open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </DataContext.Provider>
  );
};
