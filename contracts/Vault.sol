// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vault is Ownable {

    IERC20 public immutable weth;
    IPool public immutable pool;

    constructor(IERC20 _weth, IPool _pool) {
        weth = _weth;
        pool = _pool;
    }

    function depositToAave(uint256 _amount) external {
        weth.transferFrom(msg.sender, address(this), _amount);
        weth.approve(address(pool), _amount);
        pool.deposit(address(weth), _amount, address(this), 0);
    }

    function withdraw(uint256 _amount) external onlyOwner {
        pool.withdraw(address(weth), _amount, msg.sender);
    }

    function claimIncentives() external {

    }
}