// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import { IPool } from "@aave/core-v3/contracts/interfaces/IPool.sol";
import { Vault } from "./Vault.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VaultFactory {
    address public immutable padlock;
    IPool public immutable pool;
    IERC20 public immutable weth;

    constructor(
        address _padlock,
        IPoolAddressesProvider _poolAddressProvider,
        IERC20 _weth
    ) {
        padlock = _padlock;
        pool = IPool(_poolAddressProvider.getPool());
        weth = _weth;
    }

    function create() external returns (Vault vault) {
        vault = new Vault(weth, pool);
        vault.transferOwnership(padlock);
    }
}
