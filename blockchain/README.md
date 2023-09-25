# reberendus-NFT-ERC721
Dapp developed with Solidity, Next, Ganache and Hardhat in Ethereum blockchain

How to run?
--

1. Install dependencies

   `npm install`

2. Compile Smart Contracts (With or Without clean cache)

   `npx hardhat compile` or `npx hardhat compile --force`

Deploy contracts in Local Network Hardhat
--

1. Start a local node

   `npx hardhat node`

2. Deploy Smart Contracts in local node Hardhat

   `npx hardhat run --network localhost scripts/deploy.ts`

Deploy Smart Contracts in other networks
--

1. Deploy Smart Contracts

   `npx hardhat run --network <your-network> scripts/deploy.js`

Testing
--
1. Testing Smart Contracts

   ``