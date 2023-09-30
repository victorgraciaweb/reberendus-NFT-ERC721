# reberendus-NFT-ERC721
Dapp developed with Solidity, Next, Ganache and Hardhat in Ethereum blockchain

How to run?
--

1. Install dependencies

   `npm install`

2. Compile Smart Contracts (With or Without force compile again Smart Contract)

   `npx hardhat compile` or `npx hardhat compile --force`

Deploy contracts in Local Network Hardhat
--

1. Start a local node

   `npx hardhat node`

2. Deploy Smart Contracts in local node Hardhat

   `npx hardhat run --network localhost scripts/deploy.ts`

For stop hardhat node
--

1. Install kill-port

   `npm i kill-port`

2. Stop node (If it was up in 8545 port)

   `npx kill-port 8545`

Deploy Smart Contracts in other networks
--

1. Deploy Smart Contracts

   `npx hardhat run --network <your-network> scripts/deploy.ts`

Testing all Smart Contracts
--
1. Testing all

   `npx hardhat test`

Testing only 1 Smart Contract
--
1. Testing only 1 file

   `npx hardhat test <location-file-name>`