// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import { AaveProtocolDataProvider } from "@aave/core-v3/contracts/misc/AaveProtocolDataProvider.sol";
import { IRewardsController } from "@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol";
import { IPool } from "@aave/core-v3/contracts/interfaces/IPool.sol";
import { Vault } from "./Vault.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

contract VaultFactory {
    address public immutable padlock;
    address public immutable vaultOriginAddress;

    constructor(
        address _padlock,
        IERC20 _weth,
        IPoolAddressesProvider _poolAddressProvider,
        AaveProtocolDataProvider _poolDataProvider,
        IRewardsController _incentives
    ) {
        padlock = _padlock;
        vaultOriginAddress = address(new Vault(_weth, IPool(_poolAddressProvider.getPool()), _poolDataProvider, _incentives, _padlock));
    }

    function create() external returns (Vault vault) {
        vault = Vault(Clones.clone(vaultOriginAddress));
    }
}
