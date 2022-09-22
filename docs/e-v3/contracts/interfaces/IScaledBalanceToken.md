# IScaledBalanceToken

*Aave*

> IScaledBalanceToken

Defines the basic interface for a scaledbalance token.*



## Methods

### getPreviousIndex

```solidity
function getPreviousIndex(address user) external view returns (uint256)
```

Returns last index interest was accrued to the user&#39;s balance



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The last index interest was accrued to the user&#39;s balance, expressed in ray* |

### getScaledUserBalanceAndSupply

```solidity
function getScaledUserBalanceAndSupply(address user) external view returns (uint256, uint256)
```

Returns the scaled balance of the user and the scaled total supply.



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The scaled balance of the user |
| _1 | uint256 | The scaled total supply* |

### scaledBalanceOf

```solidity
function scaledBalanceOf(address user) external view returns (uint256)
```

Returns the scaled balance of the user.

*The scaled balance is the sum of all the updated stored balance divided by the reserve&#39;s liquidity index at the moment of the update*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The user whose balance is calculated |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The scaled balance of the user* |

### scaledTotalSupply

```solidity
function scaledTotalSupply() external view returns (uint256)
```

Returns the scaled total supply of the scaled balance token. Represents sum(debt/index)




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The scaled total supply* |



## Events

### Burn

```solidity
event Burn(address indexed from, address indexed target, uint256 value, uint256 balanceIncrease, uint256 index)
```



*Emitted after scaled balance tokens are burned*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | The address from which the scaled tokens will be burned |
| target `indexed` | address | The address that will receive the underlying, if any |
| value  | uint256 | The amount being burned (user entered amount - balance increase from interest) |
| balanceIncrease  | uint256 | The increase in balance since the last action of the user |
| index  | uint256 | The next liquidity index of the reserve* |

### Mint

```solidity
event Mint(address indexed caller, address indexed onBehalfOf, uint256 value, uint256 balanceIncrease, uint256 index)
```



*Emitted after the mint action*

#### Parameters

| Name | Type | Description |
|---|---|---|
| caller `indexed` | address | The address performing the mint |
| onBehalfOf `indexed` | address | The address of the user that will receive the minted scaled balance tokens |
| value  | uint256 | The amount being minted (user entered amount + balance increase from interest) |
| balanceIncrease  | uint256 | The increase in balance since the last action of the user |
| index  | uint256 | The next liquidity index of the reserve* |



