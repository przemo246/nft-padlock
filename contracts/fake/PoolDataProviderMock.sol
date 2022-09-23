// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { AaveProtocolDataProvider } from "@aave/core-v3/contracts/misc/AaveProtocolDataProvider.sol";

contract PoolDataProviderMock {
    
    mapping(address => uint256) ownerBalance;
    address reserveTokenAddress;

    function setOwnerBalance(address _owner, uint256 _amount) external {
        ownerBalance[_owner] += _amount;
    }

    function setReserveTokensAddresses(address _reserveTokenAddress) external {
        reserveTokenAddress = _reserveTokenAddress;
    }

    function getUserReserveData(address, address _owner)
        external
        view
        returns (
            uint256 currentATokenBalance,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint40,
            bool
        )
    {
        currentATokenBalance = ownerBalance[_owner];
    }

    function getReserveTokensAddresses(address asset) external view returns (
        address aTokenAddress,
        address,
        address
    ) {
        aTokenAddress = reserveTokenAddress;
    }
}
