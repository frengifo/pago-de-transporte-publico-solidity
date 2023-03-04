// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

/**
  * Proxy Address: 0xD1BD53f3159702a53D41D4DFF085dFEc618905d5
  * Implementation Address: 0xe8784132494b02E0Dea7cb582B8a52bd4BD32900
 */

async function main() {
  
  const MetroToken = await hre.ethers.getContractFactory("MetroToken");
  const token = await hre.upgrades.deployProxy(MetroToken,{
    kind:"uups",
  });

  var tx = await token.deployed();

  await tx.deployTransaction.wait(2);
  
  var implementationAddress = await upgrades.erc1967.getImplementationAddress(token.address);
  console.log("Proxy Address:", token.address);
  console.log("Implementation Address:", implementationAddress);

  await hre.run("verify:verify",{
    address: implementationAddress, // Address Contrato Implementacion
    constructorArguments:[], //
  });

}


async function upgrade() {
  
  const proxyAddress = "0xD1BD53f3159702a53D41D4DFF085dFEc618905d5"; //Proxy Address
  const MetroToken = await hre.ethers.getContractFactory("MetroTokenUpgradeable");

  var token2 = await hre.upgrades.upgradeProxy(proxyAddress, MetroToken);

  // await tx.deployTransaction.wait(2);
  
  var implementationAddress = await upgrades.erc1967.getImplementationAddress(token2.address);
  console.log("Proxy Address:", token2.address);
  console.log("Implementation Address:", implementationAddress);

  // await hre.run("verify:verify",{
  //   address: implementationAddress, // Address Contrato Implementacion
  //   constructorArguments:[], //
  // });

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
upgrade().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
