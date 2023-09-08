const { ethers } = require("ethers");
const adessoNFT = require("./Adesso.json");

const contractAddress = "0xe6FeCAF35A06F601D8AFAaF52CA6c840B0f3F257";

let provider, signer, contract;

if (!window.ethereum) {
  console.log("Please install Metamask!");
} else {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, adessoNFT.abi, signer);
}

export const getWalletRequest = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return {
      address: accounts[0],
      success: true,
    };
  } else {
    return {
      success: false,
      message: "Please connect your Metamask.",
    };
  }
};

export const connectWalletRequest = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      return {
        address: accounts[0],
        success: true,
      };
    } catch (err) {
      return { success: false, message: "Please connect your Metamask." };
    }
  } else {
    return { success: false, message: "Please connect your Metamask." };
  }
};

export const mint = async (account, amount) => {
  let abi = ["function mint(uint256 _quantity) public payable"];
  let iface = new ethers.utils.Interface(abi);
  const params = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    gasLimit: 0,
    value: parseInt(
      ethers.utils.parseUnits((0.01 * amount).toString(), "ether")
    ).toString(16),
    data: iface.encodeFunctionData("mint", [amount]),
  };
  if (window.ethereum) {
    try {
      const response = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      return {
        success: true,
        message: `You can view your transaction details in https://sepolia.etherscan.io/tx/${response}`,
        severity: "success",
      };
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong!",
        severity: "error",
      };
    }
  } else {
    return { success: false, message: "Please connect your Metamask." };
  }
};

export const getBalance = async (address) => {
  if (window.ethereum) {
    const response = await contract.balanceOf(address);
    console.log(ethers.utils.formatUnits(response));
  }
};

export const getTokensRequest = async (address) => {
  if (window.ethereum) {
    try {
      const response = await contract.tokensOfOwner(address);
      const result = [];
      for (const token of response) {
        const tokenURI = await contract.tokenURI(parseInt(token));
        result.push(tokenURI);
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  }
};
