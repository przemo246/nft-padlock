# IPoolAddressesProvider

*Aave*

> IPoolAddressesProvider

Defines the basic interface for a Pool Addresses Provider.*



## Methods

### getACLAdmin

```solidity
function getACLAdmin() external view returns (address)
```

Returns the address of the ACL admin.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the ACL admin |

### getACLManager

```solidity
function getACLManager() external view returns (address)
```

Returns the address of the ACL manager.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the ACLManager |

### getAddress

```solidity
function getAddress(bytes32 id) external view returns (address)
```

Returns an address by its identifier.

*The returned address might be an EOA or a contract, potentially proxiedIt returns ZERO if there is no registered address with the given id*

#### Parameters

| Name | Type | Description |
|---|---|---|
| id | bytes32 | The id |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the registered for the specified id |

### getMarketId

```solidity
function getMarketId() external view returns (string)
```

Returns the id of the Aave market to which this contract points to.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | The market id* |

### getPool

```solidity
function getPool() external view returns (address)
```

Returns the address of the Pool proxy.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The Pool proxy address* |

### getPoolConfigurator

```solidity
function getPoolConfigurator() external view returns (address)
```

Returns the address of the PoolConfigurator proxy.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The PoolConfigurator proxy address* |

### getPoolDataProvider

```solidity
function getPoolDataProvider() external view returns (address)
```

Returns the address of the data provider.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the DataProvider |

### getPriceOracle

```solidity
function getPriceOracle() external view returns (address)
```

Returns the address of the price oracle.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the PriceOracle |

### getPriceOracleSentinel

```solidity
function getPriceOracleSentinel() external view returns (address)
```

Returns the address of the price oracle sentinel.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the PriceOracleSentinel |

### setACLAdmin

```solidity
function setACLAdmin(address newAclAdmin) external nonpayable
```

Updates the address of the ACL admin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newAclAdmin | address | The address of the new ACL admin |

### setACLManager

```solidity
function setACLManager(address newAclManager) external nonpayable
```

Updates the address of the ACL manager.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newAclManager | address | The address of the new ACLManager* |

### setAddress

```solidity
function setAddress(bytes32 id, address newAddress) external nonpayable
```

Sets an address for an id replacing the address saved in the addresses map.

*IMPORTANT Use this function carefully, as it will do a hard replacement*

#### Parameters

| Name | Type | Description |
|---|---|---|
| id | bytes32 | The id |
| newAddress | address | The address to set |

### setAddressAsProxy

```solidity
function setAddressAsProxy(bytes32 id, address newImplementationAddress) external nonpayable
```

General function to update the implementation of a proxy registered with certain `id`. If there is no proxy registered, it will instantiate one and set as implementation the `newImplementationAddress`.

*IMPORTANT Use this function carefully, only for ids that don&#39;t have an explicit setter function, in order to avoid unexpected consequences*

#### Parameters

| Name | Type | Description |
|---|---|---|
| id | bytes32 | The id |
| newImplementationAddress | address | The address of the new implementation |

### setMarketId

```solidity
function setMarketId(string newMarketId) external nonpayable
```

Associates an id with a specific PoolAddressesProvider.

*This can be used to create an onchain registry of PoolAddressesProviders to identify and validate multiple Aave markets.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newMarketId | string | The market id |

### setPoolConfiguratorImpl

```solidity
function setPoolConfiguratorImpl(address newPoolConfiguratorImpl) external nonpayable
```

Updates the implementation of the PoolConfigurator, or creates a proxy setting the new `PoolConfigurator` implementation when the function is called for the first time.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newPoolConfiguratorImpl | address | The new PoolConfigurator implementation* |

### setPoolDataProvider

```solidity
function setPoolDataProvider(address newDataProvider) external nonpayable
```

Updates the address of the data provider.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newDataProvider | address | The address of the new DataProvider* |

### setPoolImpl

```solidity
function setPoolImpl(address newPoolImpl) external nonpayable
```

Updates the implementation of the Pool, or creates a proxy setting the new `pool` implementation when the function is called for the first time.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newPoolImpl | address | The new Pool implementation* |

### setPriceOracle

```solidity
function setPriceOracle(address newPriceOracle) external nonpayable
```

Updates the address of the price oracle.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newPriceOracle | address | The address of the new PriceOracle |

### setPriceOracleSentinel

```solidity
function setPriceOracleSentinel(address newPriceOracleSentinel) external nonpayable
```

Updates the address of the price oracle sentinel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newPriceOracleSentinel | address | The address of the new PriceOracleSentinel* |



## Events

### ACLAdminUpdated

```solidity
event ACLAdminUpdated(address indexed oldAddress, address indexed newAddress)
```



*Emitted when the ACL admin is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldAddress `indexed` | address | The old address of the ACLAdmin |
| newAddress `indexed` | address | The new address of the ACLAdmin |

### ACLManagerUpdated

```solidity
event ACLManagerUpdated(address indexed oldAddress, address indexed newAddress)
```



*Emitted when the ACL manager is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldAddress `indexed` | address | The old address of the ACLManager |
| newAddress `indexed` | address | The new address of the ACLManager |

### AddressSet

```solidity
event AddressSet(bytes32 indexed id, address indexed oldAddress, address indexed newAddress)
```



*Emitted when a new non-proxied contract address is registered.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| id `indexed` | bytes32 | The identifier of the contract |
| oldAddress `indexed` | address | The address of the old contract |
| newAddress `indexed` | address | The address of the new contract |

### AddressSetAsProxy

```solidity
event AddressSetAsProxy(bytes32 indexed id, address indexed proxyAddress, address oldImplementationAddress, address indexed newImplementationAddress)
```



*Emitted when the implementation of the proxy registered with id is updated*

#### Parameters

| Name | Type | Description |
|---|---|---|
| id `indexed` | bytes32 | The identifier of the contract |
| proxyAddress `indexed` | address | The address of the proxy contract |
| oldImplementationAddress  | address | The address of the old implementation contract |
| newImplementationAddress `indexed` | address | The address of the new implementation contract |

### MarketIdSet

```solidity
event MarketIdSet(string indexed oldMarketId, string indexed newMarketId)
```



*Emitted when the market identifier is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldMarketId `indexed` | string | The old id of the market |
| newMarketId `indexed` | string | The new id of the market |

### PoolConfiguratorUpdated

```solidity
event PoolConfiguratorUpdated(address indexed oldAddress, address indexed newAddress)
```



*Emitted when the pool configurator is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldAddress `indexed` | address | The old address of the PoolConfigurator |
| newAddress `indexed` | address | The new address of the PoolConfigurator |

### PoolDataProviderUpdated

```solidity
event PoolDataProviderUpdated(address indexed oldAddress, address indexed newAddress)
```



*Emitted when the pool data provider is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldAddress `indexed` | address | The old address of the PoolDataProvider |
| newAddress `indexed` | address | The new address of the PoolDataProvider |

### PoolUpdated

```solidity
event PoolUpdated(address indexed oldAddress, address indexed newAddress)
```



*Emitted when the pool is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldAddress `indexed` | address | The old address of the Pool |
| newAddress `indexed` | address | The new address of the Pool |

### PriceOracleSentinelUpdated

```solidity
event PriceOracleSentinelUpdated(address indexed oldAddress, address indexed newAddress)
```



*Emitted when the price oracle sentinel is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldAddress `indexed` | address | The old address of the PriceOracleSentinel |
| newAddress `indexed` | address | The new address of the PriceOracleSentinel |

### PriceOracleUpdated

```solidity
event PriceOracleUpdated(address indexed oldAddress, address indexed newAddress)
```



*Emitted when the price oracle is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldAddress `indexed` | address | The old address of the PriceOracle |
| newAddress `indexed` | address | The new address of the PriceOracle |

### ProxyCreated

```solidity
event ProxyCreated(bytes32 indexed id, address indexed proxyAddress, address indexed implementationAddress)
```



*Emitted when a new proxy is created.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| id `indexed` | bytes32 | The identifier of the proxy |
| proxyAddress `indexed` | address | The address of the created proxy contract |
| implementationAddress `indexed` | address | The address of the implementation contract |



