// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PoolDataProviderMock {
    
    mapping(address => uint256) ownerBalance;

    function setOwnerBalance(address _owner, uint256 _amount) external {
        ownerBalance[_owner] += _amount;
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
}
