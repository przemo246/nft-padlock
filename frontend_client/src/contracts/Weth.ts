import { addresses } from "./addresses";
import { Contract, utils } from "ethers";
import ERC20Artifacts from "./artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";

const wethInterface = new utils.Interface(ERC20Artifacts.abi);
export const Weth = new Contract(addresses.WETH, wethInterface);
