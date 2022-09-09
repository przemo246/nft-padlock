// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PoolStub {
    function deposit(
        address _weth,
        uint256 _amount,
        address _onBehalf,
        uint16 _referal
    ) external pure {}

    function withdraw(
        address _weth,
        uint256 _amount,
        address _to
    ) external pure {}
}
