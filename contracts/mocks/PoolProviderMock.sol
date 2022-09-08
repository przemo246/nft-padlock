// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PoolProviderMock {
    function getPool() external pure returns(address) {
        return address(0);
    }
}