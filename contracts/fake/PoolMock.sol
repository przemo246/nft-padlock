// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { PoolDataProviderMock } from "./PoolDataProviderMock.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PoolMock {

    PoolDataProviderMock immutable poolDataProvider;
    
    constructor(PoolDataProviderMock _poolDataProvider) {
        poolDataProvider = _poolDataProvider;
    }

    function deposit(
        address _weth,
        uint256 _amount,
        address _onBehalf,
        uint16 _referal
    ) external {
        IERC20(_weth).transferFrom(msg.sender, address(this), _amount);
        poolDataProvider.setOwnerBalance(_onBehalf, _amount);
    }

    function withdraw(
        address _weth,
        uint256 _amount,
        address _to
    ) external returns (uint256) {
        IERC20(_weth).transfer(_to, _amount);
    }
}
