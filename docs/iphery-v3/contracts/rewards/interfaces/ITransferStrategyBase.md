# ITransferStrategyBase









## Methods

### emergencyWithdrawal

```solidity
function emergencyWithdrawal(address token, address to, uint256 amount) external nonpayable
```



*Perform an emergency token withdrawal only callable by the Rewards admin*

#### Parameters

| Name | Type | Description |
|---|---|---|
| token | address | Address of the token to withdraw funds from this contract |
| to | address | Address of the recipient of the withdrawal |
| amount | uint256 | Amount of the withdrawal |

### getIncentivesController

```solidity
function getIncentivesController() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | Returns the address of the Incentives Controller |

### getRewardsAdmin

```solidity
function getRewardsAdmin() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | Returns the address of the Rewards admin |

### performTransfer

```solidity
function performTransfer(address to, address reward, uint256 amount) external nonpayable returns (bool)
```



*Perform custom transfer logic via delegate call from source contract to a TransferStrategy implementation*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | Account to transfer rewards |
| reward | address | Address of the reward token |
| amount | uint256 | Amount to transfer to the &quot;to&quot; address parameter |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns true bool if transfer logic succeeds |



## Events

### EmergencyWithdrawal

```solidity
event EmergencyWithdrawal(address indexed caller, address indexed token, address indexed to, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller `indexed` | address | undefined |
| token `indexed` | address | undefined |
| to `indexed` | address | undefined |
| amount  | uint256 | undefined |



