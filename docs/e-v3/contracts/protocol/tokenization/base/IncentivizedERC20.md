# IncentivizedERC20

*Aave, inspired by the Openzeppelin ERC20 implementation*

> IncentivizedERC20

Basic ERC20 implementation*



## Methods

### POOL

```solidity
function POOL() external view returns (contract IPool)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPool | undefined |

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```



*Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| spender | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### approve

```solidity
function approve(address spender, uint256 amount) external nonpayable returns (bool)
```



*Sets `amount` as the allowance of `spender` over the caller&#39;s tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender&#39;s allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```



*Returns the amount of tokens owned by `account`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### decimals

```solidity
function decimals() external view returns (uint8)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 subtractedValue) external nonpayable returns (bool)
```

Decreases the allowance of spender to spend _msgSender() tokens



#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | The user allowed to spend on behalf of _msgSender() |
| subtractedValue | uint256 | The amount being subtracted to the allowance |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | `true`* |

### getIncentivesController

```solidity
function getIncentivesController() external view returns (contract IAaveIncentivesController)
```

Returns the address of the Incentives Controller contract




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IAaveIncentivesController | The address of the Incentives Controller* |

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 addedValue) external nonpayable returns (bool)
```

Increases the allowance of spender to spend _msgSender() tokens



#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | The user allowed to spend on behalf of _msgSender() |
| addedValue | uint256 | The amount being added to the allowance |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | `true`* |

### name

```solidity
function name() external view returns (string)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### setIncentivesController

```solidity
function setIncentivesController(contract IAaveIncentivesController controller) external nonpayable
```

Sets a new Incentives Controller



#### Parameters

| Name | Type | Description |
|---|---|---|
| controller | contract IAaveIncentivesController | the new Incentives controller* |

### symbol

```solidity
function symbol() external view returns (string)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```



*Returns the amount of tokens in existence.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transfer

```solidity
function transfer(address recipient, uint256 amount) external nonpayable returns (bool)
```



*Moves `amount` tokens from the caller&#39;s account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| recipient | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferFrom

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external nonpayable returns (bool)
```



*Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller&#39;s allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| sender | address | undefined |
| recipient | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |



## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| spender `indexed` | address | undefined |
| value  | uint256 | undefined |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 value)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| to `indexed` | address | undefined |
| value  | uint256 | undefined |


