# UiIncentiveDataProviderV3









## Methods

### getFullReservesIncentiveData

```solidity
function getFullReservesIncentiveData(contract IPoolAddressesProvider provider, address user) external view returns (struct IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[], struct IUiIncentiveDataProviderV3.UserReserveIncentiveData[])
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| provider | contract IPoolAddressesProvider | undefined |
| user | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[] | undefined |
| _1 | IUiIncentiveDataProviderV3.UserReserveIncentiveData[] | undefined |

### getReservesIncentivesData

```solidity
function getReservesIncentivesData(contract IPoolAddressesProvider provider) external view returns (struct IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[])
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| provider | contract IPoolAddressesProvider | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[] | undefined |

### getUserReservesIncentivesData

```solidity
function getUserReservesIncentivesData(contract IPoolAddressesProvider provider, address user) external view returns (struct IUiIncentiveDataProviderV3.UserReserveIncentiveData[])
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| provider | contract IPoolAddressesProvider | undefined |
| user | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IUiIncentiveDataProviderV3.UserReserveIncentiveData[] | undefined |




