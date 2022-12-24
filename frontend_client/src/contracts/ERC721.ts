import { Contract, utils } from "ethers";
import ERC721NFTArtifacts from "../artifacts/contracts/nfts/ERC721NFT.sol/ERC721NFT.json";
import { addresses } from "./addresses";

const erc721Interface = new utils.Interface(ERC721NFTArtifacts.abi);
export const ERC721 = new Contract(addresses.ERC721NFT, erc721Interface);
