import { Contract, utils } from "ethers";
import PadLockArtifacts from "../artifacts/contracts/PadLock.sol/PadLock.json";

const padlockInterface = new utils.Interface(PadLockArtifacts.abi);
export const padlockContractAddress =
  "0x38BBF60b8BB3CaC1cC685E9D69Ecb744FA9B2cA7";
export const PadLock = new Contract(padlockContractAddress, padlockInterface);
