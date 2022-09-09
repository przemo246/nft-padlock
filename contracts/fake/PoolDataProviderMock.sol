
pragma solidity ^0.8.0;

contract PoolDataProviderMock {
    uint256 amount;

    function setAmount(uint256 _amount) external {
        amount = _amount;
    }

    function getPool() external view returns (
      uint256 currentATokenBalance,
      uint256,
      uint256,
      uint256,
      uint256,
      uint256,
      uint256,
      uint40,
      bool
    ) {
        currentATokenBalance = amount;
    }
}