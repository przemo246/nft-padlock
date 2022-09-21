import { Contract, utils } from "ethers";
import PadLockArtifacts from "../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";

const wethInterface = new utils.Interface(PadLockArtifacts.abi);
export const wethAddress = "0x09bADef78f92F20fd5f7a402dbb1d25d4901aAb2";
export const Weth = new Contract(wethAddress, wethInterface);
