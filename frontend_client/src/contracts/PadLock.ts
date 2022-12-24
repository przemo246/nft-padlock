import { Contract, utils } from "ethers";
import PadLockArtifacts from "../artifacts/contracts/PadLock.sol/PadLock.json";
import { addresses } from "./addresses";

const padlockInterface = new utils.Interface(PadLockArtifacts.abi);
export const PadLock = new Contract(addresses.padlock, padlockInterface);
