# Vault









## Methods

### aVTokens

```solidity
function aVTokens(uint256) external view returns (address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### depositToAave

```solidity
function depositToAave(uint256 _amount) external nonpayable
```

pulling funds from padlockand deposit them to aave protocol



#### Parameters

| Name | Type | Description |
|---|---|---|
| _amount | uint256 | undefined |

### init

```solidity
function init(address _owner) external nonpayable
```

initiates the owner of the vaultand weth reserve address



#### Parameters

| Name | Type | Description |
|---|---|---|
| _owner | address | set up as padlock |

### owner

```solidity
function owner() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### pool

```solidity
function pool() external view returns (contract IPool)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPool | undefined |

### poolDataProvider

```solidity
function poolDataProvider() external view returns (contract AaveProtocolDataProvider)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract AaveProtocolDataProvider | undefined |

### rewardController

```solidity
function rewardController() external view returns (contract IRewardsController)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IRewardsController | undefined |

### weth

```solidity
function weth() external view returns (contract IERC20)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20 | undefined |

### withdraw

```solidity
function withdraw(uint256 _amount) external nonpayable
```

withdraw funds from aave protocol



#### Parameters

| Name | Type | Description |
|---|---|---|
| _amount | uint256 | of funds to withdraw |

### withdrawAll

```solidity
function withdrawAll() external nonpayable returns (uint256 _deposit, uint256 _incentives)
```

withdraw all funds from aave protocol




#### Returns

| Name | Type | Description |
|---|---|---|
| _deposit | uint256 | undefined |
| _incentives | uint256 | undefined |




