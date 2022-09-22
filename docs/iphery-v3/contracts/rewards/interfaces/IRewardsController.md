# IRewardsController

*Aave*

> IRewardsController

Defines the basic interface for a Rewards Controller.



## Methods

### claimAllRewards

```solidity
function claimAllRewards(address[] assets, address to) external nonpayable returns (address[] rewardsList, uint256[] claimedAmounts)
```



*Claims all rewards for a user to the desired address, on all the assets of the pool, accumulating the pending rewards*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The list of assets to check eligible distributions before claiming rewards |
| to | address | The address that will be receiving the rewards |

#### Returns

| Name | Type | Description |
|---|---|---|
| rewardsList | address[] | List of addresses of the reward tokens |
| claimedAmounts | uint256[] | List that contains the claimed amount per reward, following same order as &quot;rewardList&quot;* |

### claimAllRewardsOnBehalf

```solidity
function claimAllRewardsOnBehalf(address[] assets, address user, address to) external nonpayable returns (address[] rewardsList, uint256[] claimedAmounts)
```



*Claims all rewards for a user on behalf, on all the assets of the pool, accumulating the pending rewards. The caller must be whitelisted via &quot;allowClaimOnBehalf&quot; function by the RewardsAdmin role manager*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The list of assets to check eligible distributions before claiming rewards |
| user | address | The address to check and claim rewards |
| to | address | The address that will be receiving the rewards |

#### Returns

| Name | Type | Description |
|---|---|---|
| rewardsList | address[] | List of addresses of the reward tokens |
| claimedAmounts | uint256[] | List that contains the claimed amount per reward, following same order as &quot;rewardsList&quot;* |

### claimAllRewardsToSelf

```solidity
function claimAllRewardsToSelf(address[] assets) external nonpayable returns (address[] rewardsList, uint256[] claimedAmounts)
```



*Claims all reward for msg.sender, on all the assets of the pool, accumulating the pending rewards*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The list of assets to check eligible distributions before claiming rewards |

#### Returns

| Name | Type | Description |
|---|---|---|
| rewardsList | address[] | List of addresses of the reward tokens |
| claimedAmounts | uint256[] | List that contains the claimed amount per reward, following same order as &quot;rewardsList&quot;* |

### claimRewards

```solidity
function claimRewards(address[] assets, uint256 amount, address to, address reward) external nonpayable returns (uint256)
```



*Claims reward for a user to the desired address, on all the assets of the pool, accumulating the pending rewards*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | List of assets to check eligible distributions before claiming rewards |
| amount | uint256 | The amount of rewards to claim |
| to | address | The address that will be receiving the rewards |
| reward | address | The address of the reward token |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The amount of rewards claimed* |

### claimRewardsOnBehalf

```solidity
function claimRewardsOnBehalf(address[] assets, uint256 amount, address user, address to, address reward) external nonpayable returns (uint256)
```



*Claims reward for a user on behalf, on all the assets of the pool, accumulating the pending rewards. The caller must be whitelisted via &quot;allowClaimOnBehalf&quot; function by the RewardsAdmin role manager*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The list of assets to check eligible distributions before claiming rewards |
| amount | uint256 | The amount of rewards to claim |
| user | address | The address to check and claim rewards |
| to | address | The address that will be receiving the rewards |
| reward | address | The address of the reward token |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The amount of rewards claimed* |

### claimRewardsToSelf

```solidity
function claimRewardsToSelf(address[] assets, uint256 amount, address reward) external nonpayable returns (uint256)
```



*Claims reward for msg.sender, on all the assets of the pool, accumulating the pending rewards*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The list of assets to check eligible distributions before claiming rewards |
| amount | uint256 | The amount of rewards to claim |
| reward | address | The address of the reward token |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The amount of rewards claimed* |

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

### getClaimer

```solidity
function getClaimer(address user) external view returns (address)
```



*Returns the whitelisted claimer for a certain address (0x0 if not set)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The claimer address |

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

### getRewardOracle

```solidity
function getRewardOracle(address reward) external view returns (address)
```



*Get the price aggregator oracle address*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reward | address | The address of the reward |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The price oracle of the reward |

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

### getTransferStrategy

```solidity
function getTransferStrategy(address reward) external view returns (address)
```



*Returns the Transfer Strategy implementation contract address being used for a reward address*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reward | address | The address of the reward |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the TransferStrategy contract |

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

### handleAction

```solidity
function handleAction(address user, uint256 userBalance, uint256 totalSupply) external nonpayable
```



*Called by the corresponding asset on any update that affects the rewards distribution*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |
| userBalance | uint256 | The user balance of the asset |
| totalSupply | uint256 | The total supply of the asset* |

### setClaimer

```solidity
function setClaimer(address user, address claimer) external nonpayable
```



*Whitelists an address to claim the rewards on behalf of another address*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |
| claimer | address | The address of the claimer |

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

### setRewardOracle

```solidity
function setRewardOracle(address reward, contract IEACAggregatorProxy rewardOracle) external nonpayable
```

At the moment of reward configuration, the Incentives Controller performs a check to see if the reward asset oracle is compatible with IEACAggregator proxy. This check is enforced for integrators to be able to show incentives at the current Aave UI without the need to setup an external price registry

*Sets an Aave Oracle contract to enforce rewards with a source of value.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reward | address | The address of the reward to set the price aggregator |
| rewardOracle | contract IEACAggregatorProxy | The address of price aggregator that follows IEACAggregatorProxy interface |

### setTransferStrategy

```solidity
function setTransferStrategy(address reward, contract ITransferStrategyBase transferStrategy) external nonpayable
```



*Sets a TransferStrategy logic contract that determines the logic of the rewards transfer*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reward | address | The address of the reward token |
| transferStrategy | contract ITransferStrategyBase | The address of the TransferStrategy logic contract |



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



*Emitted when a new address is whitelisted as claimer of rewards on behalf of a user*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | The address of the user |
| claimer `indexed` | address | The address of the claimer |

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



*Emitted when the reward oracle is updated*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reward `indexed` | address | The address of the token reward |
| rewardOracle `indexed` | address | The address of oracle |

### RewardsClaimed

```solidity
event RewardsClaimed(address indexed user, address indexed reward, address indexed to, address claimer, uint256 amount)
```



*Emitted when rewards are claimed*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | The address of the user rewards has been claimed on behalf of |
| reward `indexed` | address | The address of the token reward is claimed |
| to `indexed` | address | The address of the receiver of the rewards |
| claimer  | address | The address of the claimer |
| amount  | uint256 | The amount of rewards claimed |

### TransferStrategyInstalled

```solidity
event TransferStrategyInstalled(address indexed reward, address indexed transferStrategy)
```



*Emitted when a transfer strategy is installed for the reward distribution*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reward `indexed` | address | The address of the token reward |
| transferStrategy `indexed` | address | The address of TransferStrategy contract |



