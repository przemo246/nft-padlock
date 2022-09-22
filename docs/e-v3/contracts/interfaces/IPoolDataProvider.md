# IPoolDataProvider









## Methods

### getATokenTotalSupply

```solidity
function getATokenTotalSupply(address asset) external view returns (uint256)
```

Returns the total supply of aTokens for a given asset



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The total supply of the aToken* |

### getReserveData

```solidity
function getReserveData(address asset) external view returns (uint256 unbacked, uint256 accruedToTreasuryScaled, uint256 totalAToken, uint256 totalStableDebt, uint256 totalVariableDebt, uint256 liquidityRate, uint256 variableBorrowRate, uint256 stableBorrowRate, uint256 averageStableBorrowRate, uint256 liquidityIndex, uint256 variableBorrowIndex, uint40 lastUpdateTimestamp)
```

Returns the reserve data



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| unbacked | uint256 | The amount of unbacked tokens |
| accruedToTreasuryScaled | uint256 | The scaled amount of tokens accrued to treasury that is to be minted |
| totalAToken | uint256 | The total supply of the aToken |
| totalStableDebt | uint256 | The total stable debt of the reserve |
| totalVariableDebt | uint256 | The total variable debt of the reserve |
| liquidityRate | uint256 | The liquidity rate of the reserve |
| variableBorrowRate | uint256 | The variable borrow rate of the reserve |
| stableBorrowRate | uint256 | The stable borrow rate of the reserve |
| averageStableBorrowRate | uint256 | The average stable borrow rate of the reserve |
| liquidityIndex | uint256 | The liquidity index of the reserve |
| variableBorrowIndex | uint256 | The variable borrow index of the reserve |
| lastUpdateTimestamp | uint40 | The timestamp of the last update of the reserve* |

### getTotalDebt

```solidity
function getTotalDebt(address asset) external view returns (uint256)
```

Returns the total debt for a given asset



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The total debt for asset* |




