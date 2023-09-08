# ADESSO NFT

This project is a NFT Minting dApp.

```bash
    git clone https://github.com/emreuzun1/nft-adesso
    cd nft-adesso
    npm i
    npm start
```

`If you have "Provider" error check for version of "ethers". It must be 5.7.2`

## For Hardhat Config (Optional)

- Create a .env file (if not exist)
- Set necessary key for hardhat.config

 `You have to change the version of "ethers" to 6.0.0`

- Compile the smart contract with `npx hardhat compile`
- Deploy the smart contract to the sepolia network with `npx hardhat run scripts/deploy.js --network sepolia`
- Get the smart contract address and change `"contractAddress" in interact.js`

### References

- [Pinata](https://www.pinata.cloud/)
- [Hardhat](https://hardhat.org/)
- [HashLips](https://hashlips.io/)
- [Opensea(Testnet)](https://testnets.opensea.io/collection/adessonft-1)
- [Etherscan](https://sepolia.etherscan.io/address/0xe6fecaf35a06f601d8afaaf52ca6c840b0f3f257)
