// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import "hardhat/console.sol";
import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import { IRewardsController } from "@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol";
import { AaveProtocolDataProvider } from "@aave/core-v3/contracts/misc/AaveProtocolDataProvider.sol";
import { IPool } from "@aave/core-v3/contracts/interfaces/IPool.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {
    address public owner;
    IERC20 public immutable weth;
    IPool public immutable pool;
    AaveProtocolDataProvider public immutable poolDataProvider;
    IRewardsController public immutable incentives;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        IERC20 _weth,
        IPool _pool,
        AaveProtocolDataProvider _poolDataProvider,
        IRewardsController _incentives
    ) {
        weth = _weth;
        pool = _pool;
        poolDataProvider = _poolDataProvider;
        incentives = _incentives;
    }

    function initOwner(address _owner) external {
        require(owner == address(0));
        owner = _owner;
    }

    function depositToAave(uint256 _amount) external onlyOwner {
        weth.transferFrom(msg.sender, address(this), _amount);
        weth.approve(address(pool), _amount);
        pool.deposit(address(weth), _amount, address(this), 0);
    }

    function withdraw() external onlyOwner returns (uint256 _amount) {
        (_amount, , , , , , , , ) = poolDataProvider.getUserReserveData(address(weth), address(this));
        pool.withdraw(address(weth), _amount, address(this));
        weth.transfer(owner, _amount);
    }

    function claimIncentives() external onlyOwner {
        address[] memory assets = new address[](1);
        assets[0] = address(weth);
        incentives.claimAllRewards(assets, owner);
    }
}
