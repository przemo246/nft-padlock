# AaveProtocolDataProvider

*Aave*

> AaveProtocolDataProvider

Peripheral contract to collect and pre-process information from the Pool.



## Methods

### ADDRESSES_PROVIDER

```solidity
function ADDRESSES_PROVIDER() external view returns (contract IPoolAddressesProvider)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPoolAddressesProvider | undefined |

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

### getAllATokens

```solidity
function getAllATokens() external view returns (struct AaveProtocolDataProvider.TokenData[])
```

Returns the list of the existing ATokens in the pool.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | AaveProtocolDataProvider.TokenData[] | The list of ATokens, pairs of symbols and addresses |

### getAllReservesTokens

```solidity
function getAllReservesTokens() external view returns (struct AaveProtocolDataProvider.TokenData[])
```

Returns the list of the existing reserves in the pool.

*Handling MKR and ETH in a different way since they do not have standard `symbol` functions.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | AaveProtocolDataProvider.TokenData[] | The list of reserves, pairs of symbols and addresses |

### getDebtCeiling

```solidity
function getDebtCeiling(address asset) external view returns (uint256)
```

Returns the debt ceiling of the reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The debt ceiling of the reserve* |

### getDebtCeilingDecimals

```solidity
function getDebtCeilingDecimals() external pure returns (uint256)
```

Returns the debt ceiling decimals




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The debt ceiling decimals* |

### getInterestRateStrategyAddress

```solidity
function getInterestRateStrategyAddress(address asset) external view returns (address irStrategyAddress)
```

Returns the address of the Interest Rate strategy



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| irStrategyAddress | address | The address of the Interest Rate strategy |

### getLiquidationProtocolFee

```solidity
function getLiquidationProtocolFee(address asset) external view returns (uint256)
```

Returns the protocol fee on the liquidation bonus



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The protocol fee on liquidation* |

### getPaused

```solidity
function getPaused(address asset) external view returns (bool isPaused)
```

Returns if the pool is paused



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| isPaused | bool | True if the pool is paused, false otherwise* |

### getReserveCaps

```solidity
function getReserveCaps(address asset) external view returns (uint256 borrowCap, uint256 supplyCap)
```

Returns the caps parameters of the reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| borrowCap | uint256 | The borrow cap of the reserve |
| supplyCap | uint256 | The supply cap of the reserve* |

### getReserveConfigurationData

```solidity
function getReserveConfigurationData(address asset) external view returns (uint256 decimals, uint256 ltv, uint256 liquidationThreshold, uint256 liquidationBonus, uint256 reserveFactor, bool usageAsCollateralEnabled, bool borrowingEnabled, bool stableBorrowRateEnabled, bool isActive, bool isFrozen)
```

Returns the configuration data of the reserve

*Not returning borrow and supply caps for compatibility, nor pause flag*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| decimals | uint256 | The number of decimals of the reserve |
| ltv | uint256 | The ltv of the reserve |
| liquidationThreshold | uint256 | The liquidationThreshold of the reserve |
| liquidationBonus | uint256 | The liquidationBonus of the reserve |
| reserveFactor | uint256 | The reserveFactor of the reserve |
| usageAsCollateralEnabled | bool | True if the usage as collateral is enabled, false otherwise |
| borrowingEnabled | bool | True if borrowing is enabled, false otherwise |
| stableBorrowRateEnabled | bool | True if stable rate borrowing is enabled, false otherwise |
| isActive | bool | True if it is active, false otherwise |
| isFrozen | bool | True if it is frozen, false otherwise* |

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

### getReserveEModeCategory

```solidity
function getReserveEModeCategory(address asset) external view returns (uint256)
```

Returns the efficiency mode category of the reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The eMode id of the reserve |

### getReserveTokensAddresses

```solidity
function getReserveTokensAddresses(address asset) external view returns (address aTokenAddress, address stableDebtTokenAddress, address variableDebtTokenAddress)
```

Returns the token addresses of the reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| aTokenAddress | address | The AToken address of the reserve |
| stableDebtTokenAddress | address | The StableDebtToken address of the reserve |
| variableDebtTokenAddress | address | The VariableDebtToken address of the reserve |

### getSiloedBorrowing

```solidity
function getSiloedBorrowing(address asset) external view returns (bool)
```

Returns the siloed borrowing flag



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the asset is siloed for borrowing* |

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

### getUnbackedMintCap

```solidity
function getUnbackedMintCap(address asset) external view returns (uint256)
```

Returns the unbacked mint cap of the reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The unbacked mint cap of the reserve* |

### getUserReserveData

```solidity
function getUserReserveData(address asset, address user) external view returns (uint256 currentATokenBalance, uint256 currentStableDebt, uint256 currentVariableDebt, uint256 principalStableDebt, uint256 scaledVariableDebt, uint256 stableBorrowRate, uint256 liquidityRate, uint40 stableRateLastUpdated, bool usageAsCollateralEnabled)
```

Returns the user data in a reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| currentATokenBalance | uint256 | The current AToken balance of the user |
| currentStableDebt | uint256 | The current stable debt of the user |
| currentVariableDebt | uint256 | The current variable debt of the user |
| principalStableDebt | uint256 | The principal stable debt of the user |
| scaledVariableDebt | uint256 | The scaled variable debt of the user |
| stableBorrowRate | uint256 | The stable borrow rate of the user |
| liquidityRate | uint256 | The liquidity rate of the reserve |
| stableRateLastUpdated | uint40 | The timestamp of the last update of the user stable rate |
| usageAsCollateralEnabled | bool | True if the user is using the asset as collateral, false         otherwise* |




