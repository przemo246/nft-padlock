// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";

contract AaveManager {
    IPool private immutable pool;

    constructor(IPoolAddressesProvider _poolAddressProvider) {
        pool = IPool(_poolAddressProvider.getPool());
    }

    function deposit() external {
        
    }
}