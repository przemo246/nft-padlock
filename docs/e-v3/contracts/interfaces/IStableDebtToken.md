# IStableDebtToken

*Aave*

> IStableDebtToken

Defines the interface for the stable debt token

*It does not inherit from IERC20 to save in code size**

## Methods

### UNDERLYING_ASSET_ADDRESS

```solidity
function UNDERLYING_ASSET_ADDRESS() external view returns (address)
```

Returns the address of the underlying asset of this stableDebtToken (E.g. WETH for stableDebtWETH)




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the underlying asset* |

### burn

```solidity
function burn(address from, uint256 amount) external nonpayable returns (uint256, uint256)
```

Burns debt of `user`

*The resulting rate is the weighted average between the rate of the new debt and the rate of the previous debtIn some instances, a burn transaction will emit a mint event if the amount to burn is less than the interest the user earned*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | The address from which the debt will be burned |
| amount | uint256 | The amount of debt tokens getting burned |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The total stable debt |
| _1 | uint256 | The average stable borrow rate* |

### getAverageStableRate

```solidity
function getAverageStableRate() external view returns (uint256)
```

Returns the average rate of all the stable rate loans.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The average stable rate* |

### getSupplyData

```solidity
function getSupplyData() external view returns (uint256, uint256, uint256, uint40)
```

Returns the principal, the total supply, the average stable rate and the timestamp for the last update




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The principal |
| _1 | uint256 | The total supply |
| _2 | uint256 | The average stable rate |
| _3 | uint40 | The timestamp of the last update* |

### getTotalSupplyAndAvgRate

```solidity
function getTotalSupplyAndAvgRate() external view returns (uint256, uint256)
```

Returns the total supply and the average stable rate




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The total supply |
| _1 | uint256 | The average rate* |

### getTotalSupplyLastUpdated

```solidity
function getTotalSupplyLastUpdated() external view returns (uint40)
```

Returns the timestamp of the last update of the total supply




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint40 | The timestamp* |

### getUserLastUpdated

```solidity
function getUserLastUpdated(address user) external view returns (uint40)
```

Returns the timestamp of the last update of the user



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint40 | The timestamp* |

### getUserStableRate

```solidity
function getUserStableRate(address user) external view returns (uint256)
```

Returns the stable rate of the user debt



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The stable rate of the user* |

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
function mint(address user, address onBehalfOf, uint256 amount, uint256 rate) external nonpayable returns (bool, uint256, uint256)
```

Mints debt token to the `onBehalfOf` address.

*The resulting rate is the weighted average between the rate of the new debt and the rate of the previous debt*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address receiving the borrowed underlying, being the delegatee in case of credit delegate, or same as `onBehalfOf` otherwise |
| onBehalfOf | address | The address receiving the debt tokens |
| amount | uint256 | The amount of debt tokens to mint |
| rate | uint256 | The rate of the debt being minted |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if it is the first borrow, false otherwise |
| _1 | uint256 | The total stable debt |
| _2 | uint256 | The average stable borrow rate* |

### principalBalanceOf

```solidity
function principalBalanceOf(address user) external view returns (uint256)
```

Returns the principal debt balance of the user



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The debt balance of the user since the last burn/mint action* |



## Events

### Burn

```solidity
event Burn(address indexed from, uint256 amount, uint256 currentBalance, uint256 balanceIncrease, uint256 avgStableRate, uint256 newTotalSupply)
```



*Emitted when new stable debt is burned*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | The address from which the debt will be burned |
| amount  | uint256 | The amount being burned (user entered amount - balance increase from interest) |
| currentBalance  | uint256 | The current balance of the user |
| balanceIncrease  | uint256 | The the increase in balance since the last action of the user |
| avgStableRate  | uint256 | The next average stable rate after the burning |
| newTotalSupply  | uint256 | The next total supply of the stable debt token after the action* |

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
event Mint(address indexed user, address indexed onBehalfOf, uint256 amount, uint256 currentBalance, uint256 balanceIncrease, uint256 newRate, uint256 avgStableRate, uint256 newTotalSupply)
```



*Emitted when new stable debt is minted*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | The address of the user who triggered the minting |
| onBehalfOf `indexed` | address | The recipient of stable debt tokens |
| amount  | uint256 | The amount minted (user entered amount + balance increase from interest) |
| currentBalance  | uint256 | The current balance of the user |
| balanceIncrease  | uint256 | The increase in balance since the last action of the user |
| newRate  | uint256 | The rate of the debt after the minting |
| avgStableRate  | uint256 | The next average stable rate after the minting |
| newTotalSupply  | uint256 | The next total supply of the stable debt token after the action* |



