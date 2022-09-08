// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "./interfaces/IWETH.sol";

contract AaveManager {

    IPool public immutable pool;
    IWETH public immutable weth;

    constructor(IPoolAddressesProvider _poolAddressProvider, IWETH _weth) {
        pool = IPool(_poolAddressProvider.getPool());
        weth = _weth;
    }

    function depositCoupleFee(uint256 amount) external {
        weth.approve(address(pool), amount);
        pool.deposit(address(weth), amount, address(this), 0);
    }

    function withdraw() external {
        
    }

    function claimIncentives() external {

    }
}