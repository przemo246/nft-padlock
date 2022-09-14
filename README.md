# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# TheGraph

1. Create a Hosted Service account https://thegraph.com/hosted-service


2. Store the Access Token

```shell
graph auth --product hosted-service [ACESS_TOKEN]
```


3. Create a Subgraph on the Hosted Service

```shell
npx hardhat graph init --network optimism-goerli --contract-name PadLock --address [contract_address]
 ```


4. Deploy a Subgraph on the Hosted Service

```shell
graph deploy --product hosted-service tomasz90/10c-hackathon-padlock
 ```