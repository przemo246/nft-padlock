# IAaveIncentivesController

*Aave*

> IAaveIncentivesController

Defines the basic interface for an Aave Incentives Controller.*



## Methods

### DISTRIBUTION_END

```solidity
function DISTRIBUTION_END() external view returns (uint256)
```



*Gets the distribution end timestamp of the emissions*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### PRECISION

```solidity
function PRECISION() external view returns (uint8)
```

for backward compatibility with previous implementation of the Incentives controller




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | The precision used in the incentives controller |

### REWARD_TOKEN

```solidity
function REWARD_TOKEN() external view returns (address)
```

for backward compatibility with previous implementation of the Incentives controller




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the reward token |

### assets

```solidity
function assets(address asset) external view returns (uint128, uint128, uint256)
```

LEGACY **************************

*Returns the configuration of the distribution for a certain asset*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the reference asset of the distribution |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint128 | The asset index, the emission per second and the last updated timestamp* |
| _1 | uint128 | undefined |
| _2 | uint256 | undefined |

### claimRewards

```solidity
function claimRewards(address[] assets, uint256 amount, address to) external nonpayable returns (uint256)
```

Claims reward for a user, on the assets of the pool, accumulating the pending rewards



#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The assets to accumulate rewards for |
| amount | uint256 | Amount of rewards to claim |
| to | address | Address that will be receiving the rewards |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Rewards claimed* |

### claimRewardsOnBehalf

```solidity
function claimRewardsOnBehalf(address[] assets, uint256 amount, address user, address to) external nonpayable returns (uint256)
```

Claims reward for a user on its behalf, on the assets of the pool, accumulating the pending rewards.

*The caller must be whitelisted via &quot;allowClaimOnBehalf&quot; function by the RewardsAdmin role manager*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The assets to accumulate rewards for |
| amount | uint256 | The amount of rewards to claim |
| user | address | The address to check and claim rewards |
| to | address | The address that will be receiving the rewards |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The amount of rewards claimed* |

### configureAssets

```solidity
function configureAssets(address[] assets, uint256[] emissionsPerSecond) external nonpayable
```

Configure assets for a certain rewards emission



#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The assets to incentivize |
| emissionsPerSecond | uint256[] | The emission for each asset |

### getAssetData

```solidity
function getAssetData(address asset) external view returns (uint256, uint256, uint256)
```

Returns the configuration of the distribution for a certain asset



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the reference asset of the distribution |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The asset index |
| _1 | uint256 | The emission per second |
| _2 | uint256 | The last updated timestamp* |

### getClaimer

```solidity
function getClaimer(address user) external view returns (address)
```

Returns the whitelisted claimer for a certain address (0x0 if not set)



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The claimer address |

### getRewardsBalance

```solidity
function getRewardsBalance(address[] assets, address user) external view returns (uint256)
```

Returns the total of rewards of a user, already accrued + not yet accrued



#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The assets to accumulate rewards for |
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The rewards* |

### getUserAssetData

```solidity
function getUserAssetData(address user, address asset) external view returns (uint256)
```

Returns the user index for a specific asset



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |
| asset | address | The asset to incentivize |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The user index for the asset |

### getUserUnclaimedRewards

```solidity
function getUserUnclaimedRewards(address user) external view returns (uint256)
```

Returns the unclaimed rewards of the user



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The unclaimed user rewards |

### handleAction

```solidity
function handleAction(address asset, uint256 userBalance, uint256 totalSupply) external nonpayable
```

Called by the corresponding asset on any update that affects the rewards distribution



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the user |
| userBalance | uint256 | The balance of the user of the asset in the pool |
| totalSupply | uint256 | The total supply of the asset in the pool* |

### setClaimer

```solidity
function setClaimer(address user, address claimer) external nonpayable
```

Whitelists an address to claim the rewards on behalf of another address



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |
| claimer | address | The address of the claimer |



## Events

### ClaimerSet

```solidity
event ClaimerSet(address indexed user, address indexed claimer)
```



*Emitted during `setClaimer`*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | The address of the user |
| claimer `indexed` | address | The address of the claimer |

### RewardsAccrued

```solidity
event RewardsAccrued(address indexed user, uint256 amount)
```



*Emitted during `handleAction`, `claimRewards` and `claimRewardsOnBehalf`*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | The user that accrued rewards |
| amount  | uint256 | The amount of accrued rewards |

### RewardsClaimed

```solidity
event RewardsClaimed(address indexed user, address indexed to, address indexed claimer, uint256 amount)
```



*Emitted during `claimRewards` and `claimRewardsOnBehalf`*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | The address that accrued rewards |
| to `indexed` | address | The address that will be receiving the rewards |
| claimer `indexed` | address | The address that performed the claim |
| amount  | uint256 | The amount of rewards |



