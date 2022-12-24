import { Contract, utils } from "ethers";
import ERC1155Artifacts from "../artifacts/contracts/nfts/ERC721NFT.sol/ERC721NFT.json";
import { addresses } from "./addresses";

const erc1155Interface = new utils.Interface(ERC1155Artifacts.abi);
export const ERC1155 = new Contract(addresses.ERC1155NFT, erc1155Interface);
