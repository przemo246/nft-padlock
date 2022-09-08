// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PoolProviderMock {
    
    address poolAddress;

    function setPoolAddress(address _poolAddress) external {
        poolAddress = _poolAddress;
    }
    
    function getPool() external view returns(address) {
        return poolAddress;
    }
}