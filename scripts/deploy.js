const hre = require("hardhat");

async function main() {
  const AdessoNFT = await hre.ethers.getContractFactory("Adesso");
  const adessoNFT = await AdessoNFT.deploy();

  await adessoNFT.waitForDeployment();

  console.log("Deployed to:", adessoNFT);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
