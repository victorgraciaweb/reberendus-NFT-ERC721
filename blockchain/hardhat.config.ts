import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  //defaultNetwork: "hardhat",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // See its defaults
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  solidity: {
    version: "0.8.19"
  },
};

export default config;
