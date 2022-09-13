// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PoolProviderMock {
    address poolAddress;
    address poolDataProviderAddress;

    function setPoolAddress(address _poolAddress) external {
        poolAddress = _poolAddress;
    }

    function setPoolDataProvider(address _poolDataProviderAddress) external {
        poolDataProviderAddress = _poolDataProviderAddress;
    }

    function getPool() external view returns (address) {
        return poolAddress;
    }

    function getPoolDataProvider() external view returns (address) {
        return poolDataProviderAddress;
    }
}
