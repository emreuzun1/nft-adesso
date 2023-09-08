# ADESSO NFT

This project is a NFT Minting dApp.

```ruby
    git clone https://github.com/emreuzun1/nft-adesso
    cd nft-adesso
    npm i
    npm start
```

## For Hardhat Config (Optional)

- Create a .env file (if not exist)
- Set necessary key for hardhat.config

  [!NOTE] You have to change

- Compile the smart contract with `npx hardhat compile`
- Deploy the smart contract to the sepolia network with `npx hardhat run scripts/deploy.js --network sepolia`
- Get the smart contract address and change `"contractAddress" in interact.js`

### References

- [Pinata](https://www.pinata.cloud/)
- [Hardhat](https://hardhat.org/)
- [HashLips](https://hashlips.io/)
- [Opensea(Testnet)](https://testnets.opensea.io/collection/adessonft-1)
- [Etherscan](https://sepolia.etherscan.io/address/0xe6fecaf35a06f601d8afaaf52ca6c840b0f3f257)
