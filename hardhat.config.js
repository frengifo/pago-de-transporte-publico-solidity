require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
      timeout:0,
      gas:"auto",
      gasPrice:"auto"
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};