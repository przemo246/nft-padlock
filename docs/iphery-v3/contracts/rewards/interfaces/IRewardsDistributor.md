# IRewardsDistributor

*Aave*

> IRewardsDistributor

Defines the basic interface for a Rewards Distributor.



## Methods

### getAllUserRewards

```solidity
function getAllUserRewards(address[] assets, address user) external view returns (address[], uint256[])
```



*Returns a list all rewards of a user, including already accrued and unrealized claimable rewards*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | List of incentivized assets to check eligible distributions |
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address[] | The list of reward addresses |
| _1 | uint256[] | The list of unclaimed amount of rewards* |

### getAssetDecimals

```solidity
function getAssetDecimals(address asset) external view returns (uint8)
```



*Returns the decimals of an asset to calculate the distribution delta*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address to retrieve decimals |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | The decimals of an underlying asset |

### getDistributionEnd

```solidity
function getDistributionEnd(address asset, address reward) external view returns (uint256)
```



*Gets the end date for the distribution*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The incentivized asset |
| reward | address | The reward token of the incentivized asset |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The timestamp with the end of the distribution, in unix time format* |

### getEmissionManager

```solidity
function getEmissionManager() external view returns (address)
```



*Returns the address of the emission manager*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the EmissionManager |

### getRewardsByAsset

```solidity
function getRewardsByAsset(address asset) external view returns (address[])
```



*Returns the list of available reward token addresses of an incentivized asset*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The incentivized asset |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address[] | List of rewards addresses of the input asset* |

### getRewardsData

```solidity
function getRewardsData(address asset, address reward) external view returns (uint256, uint256, uint256, uint256)
```



*Returns the configuration of the distribution reward for a certain asset*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The incentivized asset |
| reward | address | The reward token of the incentivized asset |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The index of the asset distribution |
| _1 | uint256 | The emission per second of the reward distribution |
| _2 | uint256 | The timestamp of the last update of the index |
| _3 | uint256 | The timestamp of the distribution end* |

### getRewardsList

```solidity
function getRewardsList() external view returns (address[])
```



*Returns the list of available reward addresses*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address[] | List of rewards supported in this contract* |

### getUserAccruedRewards

```solidity
function getUserAccruedRewards(address user, address reward) external view returns (uint256)
```



*Returns the accrued rewards balance of a user, not including virtually accrued rewards since last distribution.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |
| reward | address | The address of the reward token |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Unclaimed rewards, not including new distributions* |

### getUserAssetIndex

```solidity
function getUserAssetIndex(address user, address asset, address reward) external view returns (uint256)
```



*Returns the index of a user on a reward distribution*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | Address of the user |
| asset | address | The incentivized asset |
| reward | address | The reward token of the incentivized asset |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The current user asset index, not including new distributions* |

### getUserRewards

```solidity
function getUserRewards(address[] assets, address user, address reward) external view returns (uint256)
```



*Returns a single rewards balance of a user, including virtually accrued and unrealized claimable rewards.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | List of incentivized assets to check eligible distributions |
| user | address | The address of the user |
| reward | address | The address of the reward token |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The rewards amount* |

### setDistributionEnd

```solidity
function setDistributionEnd(address asset, address reward, uint32 newDistributionEnd) external nonpayable
```



*Sets the end date for the distribution*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The asset to incentivize |
| reward | address | The reward token that incentives the asset |
| newDistributionEnd | uint32 | The end date of the incentivization, in unix time format* |

### setEmissionManager

```solidity
function setEmissionManager(address emissionManager) external nonpayable
```



*Updates the address of the emission manager*

#### Parameters

| Name | Type | Description |
|---|---|---|
| emissionManager | address | The address of the new EmissionManager |

### setEmissionPerSecond

```solidity
function setEmissionPerSecond(address asset, address[] rewards, uint88[] newEmissionsPerSecond) external nonpayable
```



*Sets the emission per second of a set of reward distributions*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The asset is being incentivized |
| rewards | address[] | List of reward addresses are being distributed |
| newEmissionsPerSecond | uint88[] | List of new reward emissions per second |



## Events

### Accrued

```solidity
event Accrued(address indexed asset, address indexed reward, address indexed user, uint256 assetIndex, uint256 userIndex, uint256 rewardsAccrued)
```



*Emitted when rewards of an asset are accrued on behalf of a user.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset `indexed` | address | The address of the incentivized asset |
| reward `indexed` | address | The address of the reward token |
| user `indexed` | address | The address of the user that rewards are accrued on behalf of |
| assetIndex  | uint256 | The index of the asset distribution |
| userIndex  | uint256 | The index of the asset distribution on behalf of the user |
| rewardsAccrued  | uint256 | The amount of rewards accrued |

### AssetConfigUpdated

```solidity
event AssetConfigUpdated(address indexed asset, address indexed reward, uint256 oldEmission, uint256 newEmission, uint256 oldDistributionEnd, uint256 newDistributionEnd, uint256 assetIndex)
```



*Emitted when the configuration of the rewards of an asset is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset `indexed` | address | The address of the incentivized asset |
| reward `indexed` | address | The address of the reward token |
| oldEmission  | uint256 | The old emissions per second value of the reward distribution |
| newEmission  | uint256 | The new emissions per second value of the reward distribution |
| oldDistributionEnd  | uint256 | The old end timestamp of the reward distribution |
| newDistributionEnd  | uint256 | The new end timestamp of the reward distribution |
| assetIndex  | uint256 | The index of the asset distribution |

### EmissionManagerUpdated

```solidity
event EmissionManagerUpdated(address indexed oldEmissionManager, address indexed newEmissionManager)
```



*Emitted when the emission manager address is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldEmissionManager `indexed` | address | The address of the old emission manager |
| newEmissionManager `indexed` | address | The address of the new emission manager |



