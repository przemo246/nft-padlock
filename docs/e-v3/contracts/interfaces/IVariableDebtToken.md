# IVariableDebtToken

*Aave*

> IVariableDebtToken

Defines the basic interface for a variable debt token.*



## Methods

### UNDERLYING_ASSET_ADDRESS

```solidity
function UNDERLYING_ASSET_ADDRESS() external view returns (address)
```

Returns the address of the underlying asset of this debtToken (E.g. WETH for variableDebtWETH)




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the underlying asset* |

### burn

```solidity
function burn(address from, uint256 amount, uint256 index) external nonpayable returns (uint256)
```

Burns user variable debt

*In some instances, a burn transaction will emit a mint event if the amount to burn is less than the interest that the user accrued*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | The address from which the debt will be burned |
| amount | uint256 | The amount getting burned |
| index | uint256 | The variable debt index of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The scaled total debt of the reserve* |

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

### initialize

```solidity
function initialize(contract IPool pool, address underlyingAsset, contract IAaveIncentivesController incentivesController, uint8 debtTokenDecimals, string debtTokenName, string debtTokenSymbol, bytes params) external nonpayable
```

Initializes the debt token.



#### Parameters

| Name | Type | Description |
|---|---|---|
| pool | contract IPool | The pool contract that is initializing this contract |
| underlyingAsset | address | The address of the underlying asset of this aToken (E.g. WETH for aWETH) |
| incentivesController | contract IAaveIncentivesController | The smart contract managing potential incentives distribution |
| debtTokenDecimals | uint8 | The decimals of the debtToken, same as the underlying asset&#39;s |
| debtTokenName | string | The name of the token |
| debtTokenSymbol | string | The symbol of the token |
| params | bytes | A set of encoded parameters for additional initialization |

### mint

```solidity
function mint(address user, address onBehalfOf, uint256 amount, uint256 index) external nonpayable returns (bool, uint256)
```

Mints debt token to the `onBehalfOf` address



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address receiving the borrowed underlying, being the delegatee in case of credit delegate, or same as `onBehalfOf` otherwise |
| onBehalfOf | address | The address receiving the debt tokens |
| amount | uint256 | The amount of debt being minted |
| index | uint256 | The variable debt index of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the previous balance of the user is 0, false otherwise |
| _1 | uint256 | The scaled total debt of the reserve* |

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





#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| target `indexed` | address | undefined |
| value  | uint256 | undefined |
| balanceIncrease  | uint256 | undefined |
| index  | uint256 | undefined |

### Initialized

```solidity
event Initialized(address indexed underlyingAsset, address indexed pool, address incentivesController, uint8 debtTokenDecimals, string debtTokenName, string debtTokenSymbol, bytes params)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| underlyingAsset `indexed` | address | undefined |
| pool `indexed` | address | undefined |
| incentivesController  | address | undefined |
| debtTokenDecimals  | uint8 | undefined |
| debtTokenName  | string | undefined |
| debtTokenSymbol  | string | undefined |
| params  | bytes | undefined |

### Mint

```solidity
event Mint(address indexed caller, address indexed onBehalfOf, uint256 value, uint256 balanceIncrease, uint256 index)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller `indexed` | address | undefined |
| onBehalfOf `indexed` | address | undefined |
| value  | uint256 | undefined |
| balanceIncrease  | uint256 | undefined |
| index  | uint256 | undefined |



