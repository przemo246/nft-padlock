# NFT Padlock

![Vercel](https://vercelbadge.vercel.app/api/przemo246/nft-padlock)

NFT Padlock is an NFT arrangement that will make sure you never forget your anniversary again. Each lover deposits WETH, which is then redirected to the yield protocol, so that the fruits of your relationship will be visible to the naked eye.

The NFT padlock aims to solve the problem of hanging padlocks on brigades. It targets environmental protection by using blockchain technology. Our project combines aspects of defi and nft. Two chosen ones can express to save their relationship by creating an nft token representing their feelings in the form of a padlock. In order to create a relationship it is also necessary to deposit funds which are then transferred to AAVE to generate income. In such a way that the fruits of the relationship are visible - in this case financially.

## Development

Hardhat for smart contracts development, testing and deployment. IPFS for storing Padlock NFTs and also for hosting memories that couple wants to share. AAVE for DEFI part, that allows to generate yield on invested funds. Optimism for project launch. React, TypeScript, useDApp, The Graph and TailwindCSS on the front-end.

## Setup

To launch the application:

1. `cd frontend_client`
2. `npm start` to run the dev server on `localhost:3000`

The smart contracts are currently deployed on Optimism Goerli network. The contract addresses are as below:

```
  padlock: 0x866d6c77b6ce05Aaf1C72F4d9F47d973132C9b53
  vaultFactory: 0x522F1bFCEba0d004f1497D4AA46b6aCb44Ff3255
  ERC721NFT: 0x07C861fB76ea685F4A14b93c30FeDdCCBF395725
  ERC1155NFT: 0x05a6Afde647d44E439F0653FE0fa2534d5aE5fEe
  WETH: 0x09bADef78f92F20fd5f7a402dbb1d25d4901aAb2
```

Subgraph to query data from the blockchain can be found here:
[ttps://thegraph.com/hosted-service/subgraph/przemo246/nft-padlock](https://thegraph.com/hosted-service/subgraph/przemo246/nft-padlock)

To successfully interact with smart contracts, make sure you have chosen the right network (Optimism Goerli) and you have got some ETH / WETH on your account. ETH tokens can be obtained using one of the faucets. More information on that subject can be found here:

[https://community.optimism.io/docs/useful-tools/faucets/#testnet-faucets](https://community.optimism.io/docs/useful-tools/faucets/#testnet-faucets)

## Features to be added

- anniversary withdraw possibility
- relationship timeline
- UI / UX improvement
- auto-update of the NFT image on IPFS basing on relationship length
- sign in with Ethereum - [login.xyz](https://login.xyz/)
