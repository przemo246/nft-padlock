# RewardsController









## Methods

### REVISION

```solidity
function REVISION() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### claimAllRewards

```solidity
function claimAllRewards(address[] assets, address to) external nonpayable returns (address[] rewardsList, uint256[] claimedAmounts)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | undefined |
| to | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| rewardsList | address[] | undefined |
| claimedAmounts | uint256[] | undefined |

### claimAllRewardsOnBehalf

```solidity
function claimAllRewardsOnBehalf(address[] assets, address user, address to) external nonpayable returns (address[] rewardsList, uint256[] claimedAmounts)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | undefined |
| user | address | undefined |
| to | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| rewardsList | address[] | undefined |
| claimedAmounts | uint256[] | undefined |

### claimAllRewardsToSelf

```solidity
function claimAllRewardsToSelf(address[] assets) external nonpayable returns (address[] rewardsList, uint256[] claimedAmounts)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| rewardsList | address[] | undefined |
| claimedAmounts | uint256[] | undefined |

### claimRewards

```solidity
function claimRewards(address[] assets, uint256 amount, address to, address reward) external nonpayable returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | undefined |
| amount | uint256 | undefined |
| to | address | undefined |
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### claimRewardsOnBehalf

```solidity
function claimRewardsOnBehalf(address[] assets, uint256 amount, address user, address to, address reward) external nonpayable returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | undefined |
| amount | uint256 | undefined |
| user | address | undefined |
| to | address | undefined |
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### claimRewardsToSelf

```solidity
function claimRewardsToSelf(address[] assets, uint256 amount, address reward) external nonpayable returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | undefined |
| amount | uint256 | undefined |
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### configureAssets

```solidity
function configureAssets(RewardsDataTypes.RewardsConfigInput[] config) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| config | RewardsDataTypes.RewardsConfigInput[] | undefined |

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

### getClaimer

```solidity
function getClaimer(address user) external view returns (address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

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

### getRewardOracle

```solidity
function getRewardOracle(address reward) external view returns (address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| reward | address | undefined |

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

### getTransferStrategy

```solidity
function getTransferStrategy(address reward) external view returns (address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| reward | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

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

### handleAction

```solidity
function handleAction(address user, uint256 totalSupply, uint256 userBalance) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |
| totalSupply | uint256 | undefined |
| userBalance | uint256 | undefined |

### initialize

```solidity
function initialize(address emissionManager) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| emissionManager | address | undefined |

### setClaimer

```solidity
function setClaimer(address user, address caller) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |
| caller | address | undefined |

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

### setRewardOracle

```solidity
function setRewardOracle(address reward, contract IEACAggregatorProxy rewardOracle) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| reward | address | undefined |
| rewardOracle | contract IEACAggregatorProxy | undefined |

### setTransferStrategy

```solidity
function setTransferStrategy(address reward, contract ITransferStrategyBase transferStrategy) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| reward | address | undefined |
| transferStrategy | contract ITransferStrategyBase | undefined |



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

### ClaimerSet

```solidity
event ClaimerSet(address indexed user, address indexed claimer)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| claimer `indexed` | address | undefined |

### EmissionManagerUpdated

```solidity
event EmissionManagerUpdated(address indexed oldEmissionManager, address indexed newEmissionManager)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| oldEmissionManager `indexed` | address | undefined |
| newEmissionManager `indexed` | address | undefined |

### RewardOracleUpdated

```solidity
event RewardOracleUpdated(address indexed reward, address indexed rewardOracle)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| reward `indexed` | address | undefined |
| rewardOracle `indexed` | address | undefined |

### RewardsClaimed

```solidity
event RewardsClaimed(address indexed user, address indexed reward, address indexed to, address claimer, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| reward `indexed` | address | undefined |
| to `indexed` | address | undefined |
| claimer  | address | undefined |
| amount  | uint256 | undefined |

### TransferStrategyInstalled

```solidity
event TransferStrategyInstalled(address indexed reward, address indexed transferStrategy)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| reward `indexed` | address | undefined |
| transferStrategy `indexed` | address | undefined |



