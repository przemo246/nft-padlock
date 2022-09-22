# RewardsDistributor









## Methods

### getAllUserRewards

```solidity
function getAllUserRewards(address[] assets, address user) external view returns (address[] rewardsList, uint256[] unclaimedAmounts)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | undefined |
| user | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| rewardsList | address[] | undefined |
| unclaimedAmounts | uint256[] | undefined |

### getAssetDecimals

```solidity
function getAssetDecimals(address asset) external view returns (uint8)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### getDistributionEnd

```solidity
function getDistributionEnd(address asset, address reward) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | undefined |
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getEmissionManager

```solidity
function getEmissionManager() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### getRewardsByAsset

```solidity
function getRewardsByAsset(address asset) external view returns (address[])
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address[] | undefined |

### getRewardsData

```solidity
function getRewardsData(address asset, address reward) external view returns (uint256, uint256, uint256, uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | undefined |
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |
| _1 | uint256 | undefined |
| _2 | uint256 | undefined |
| _3 | uint256 | undefined |

### getRewardsList

```solidity
function getRewardsList() external view returns (address[])
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address[] | undefined |

### getUserAccruedRewards

```solidity
function getUserAccruedRewards(address user, address reward) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getUserAssetIndex

```solidity
function getUserAssetIndex(address user, address asset, address reward) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |
| asset | address | undefined |
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getUserRewards

```solidity
function getUserRewards(address[] assets, address user, address reward) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | undefined |
| user | address | undefined |
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### setDistributionEnd

```solidity
function setDistributionEnd(address asset, address reward, uint32 newDistributionEnd) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | undefined |
| reward | address | undefined |
| newDistributionEnd | uint32 | undefined |

### setEmissionManager

```solidity
function setEmissionManager(address emissionManager) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| emissionManager | address | undefined |

### setEmissionPerSecond

```solidity
function setEmissionPerSecond(address asset, address[] rewards, uint88[] newEmissionsPerSecond) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | undefined |
| rewards | address[] | undefined |
| newEmissionsPerSecond | uint88[] | undefined |



## Events

### Accrued

```solidity
event Accrued(address indexed asset, address indexed reward, address indexed user, uint256 assetIndex, uint256 userIndex, uint256 rewardsAccrued)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset `indexed` | address | undefined |
| reward `indexed` | address | undefined |
| user `indexed` | address | undefined |
| assetIndex  | uint256 | undefined |
| userIndex  | uint256 | undefined |
| rewardsAccrued  | uint256 | undefined |

### AssetConfigUpdated

```solidity
event AssetConfigUpdated(address indexed asset, address indexed reward, uint256 oldEmission, uint256 newEmission, uint256 oldDistributionEnd, uint256 newDistributionEnd, uint256 assetIndex)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset `indexed` | address | undefined |
| reward `indexed` | address | undefined |
| oldEmission  | uint256 | undefined |
| newEmission  | uint256 | undefined |
| oldDistributionEnd  | uint256 | undefined |
| newDistributionEnd  | uint256 | undefined |
| assetIndex  | uint256 | undefined |

### EmissionManagerUpdated

```solidity
event EmissionManagerUpdated(address indexed oldEmissionManager, address indexed newEmissionManager)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| oldEmissionManager `indexed` | address | undefined |
| newEmissionManager `indexed` | address | undefined |



