# IACLManager

*Aave*

> IACLManager

Defines the basic interface for the ACL Manager*



## Methods

### ADDRESSES_PROVIDER

```solidity
function ADDRESSES_PROVIDER() external view returns (contract IPoolAddressesProvider)
```

Returns the contract address of the PoolAddressesProvider




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPoolAddressesProvider | The address of the PoolAddressesProvider |

### ASSET_LISTING_ADMIN_ROLE

```solidity
function ASSET_LISTING_ADMIN_ROLE() external view returns (bytes32)
```

Returns the identifier of the AssetListingAdmin role




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | The id of the AssetListingAdmin role |

### BRIDGE_ROLE

```solidity
function BRIDGE_ROLE() external view returns (bytes32)
```

Returns the identifier of the Bridge role




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | The id of the Bridge role |

### EMERGENCY_ADMIN_ROLE

```solidity
function EMERGENCY_ADMIN_ROLE() external view returns (bytes32)
```

Returns the identifier of the EmergencyAdmin role




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | The id of the EmergencyAdmin role |

### FLASH_BORROWER_ROLE

```solidity
function FLASH_BORROWER_ROLE() external view returns (bytes32)
```

Returns the identifier of the FlashBorrower role




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | The id of the FlashBorrower role |

### POOL_ADMIN_ROLE

```solidity
function POOL_ADMIN_ROLE() external view returns (bytes32)
```

Returns the identifier of the PoolAdmin role




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | The id of the PoolAdmin role |

### RISK_ADMIN_ROLE

```solidity
function RISK_ADMIN_ROLE() external view returns (bytes32)
```

Returns the identifier of the RiskAdmin role




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | The id of the RiskAdmin role |

### addAssetListingAdmin

```solidity
function addAssetListingAdmin(address admin) external nonpayable
```

Adds a new admin as AssetListingAdmin



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address of the new admin |

### addBridge

```solidity
function addBridge(address bridge) external nonpayable
```

Adds a new address as Bridge



#### Parameters

| Name | Type | Description |
|---|---|---|
| bridge | address | The address of the new Bridge |

### addEmergencyAdmin

```solidity
function addEmergencyAdmin(address admin) external nonpayable
```

Adds a new admin as EmergencyAdmin



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address of the new admin |

### addFlashBorrower

```solidity
function addFlashBorrower(address borrower) external nonpayable
```

Adds a new address as FlashBorrower



#### Parameters

| Name | Type | Description |
|---|---|---|
| borrower | address | The address of the new FlashBorrower |

### addPoolAdmin

```solidity
function addPoolAdmin(address admin) external nonpayable
```

Adds a new admin as PoolAdmin



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address of the new admin |

### addRiskAdmin

```solidity
function addRiskAdmin(address admin) external nonpayable
```

Adds a new admin as RiskAdmin



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address of the new admin |

### isAssetListingAdmin

```solidity
function isAssetListingAdmin(address admin) external view returns (bool)
```

Returns true if the address is AssetListingAdmin, false otherwise



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the given address is AssetListingAdmin, false otherwise |

### isBridge

```solidity
function isBridge(address bridge) external view returns (bool)
```

Returns true if the address is Bridge, false otherwise



#### Parameters

| Name | Type | Description |
|---|---|---|
| bridge | address | The address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the given address is Bridge, false otherwise |

### isEmergencyAdmin

```solidity
function isEmergencyAdmin(address admin) external view returns (bool)
```

Returns true if the address is EmergencyAdmin, false otherwise



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the given address is EmergencyAdmin, false otherwise |

### isFlashBorrower

```solidity
function isFlashBorrower(address borrower) external view returns (bool)
```

Returns true if the address is FlashBorrower, false otherwise



#### Parameters

| Name | Type | Description |
|---|---|---|
| borrower | address | The address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the given address is FlashBorrower, false otherwise |

### isPoolAdmin

```solidity
function isPoolAdmin(address admin) external view returns (bool)
```

Returns true if the address is PoolAdmin, false otherwise



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the given address is PoolAdmin, false otherwise |

### isRiskAdmin

```solidity
function isRiskAdmin(address admin) external view returns (bool)
```

Returns true if the address is RiskAdmin, false otherwise



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address to check |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the given address is RiskAdmin, false otherwise |

### removeAssetListingAdmin

```solidity
function removeAssetListingAdmin(address admin) external nonpayable
```

Removes an admin as AssetListingAdmin



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address of the admin to remove |

### removeBridge

```solidity
function removeBridge(address bridge) external nonpayable
```

Removes an address as Bridge



#### Parameters

| Name | Type | Description |
|---|---|---|
| bridge | address | The address of the bridge to remove |

### removeEmergencyAdmin

```solidity
function removeEmergencyAdmin(address admin) external nonpayable
```

Removes an admin as EmergencyAdmin



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address of the admin to remove |

### removeFlashBorrower

```solidity
function removeFlashBorrower(address borrower) external nonpayable
```

Removes an admin as FlashBorrower



#### Parameters

| Name | Type | Description |
|---|---|---|
| borrower | address | The address of the FlashBorrower to remove |

### removePoolAdmin

```solidity
function removePoolAdmin(address admin) external nonpayable
```

Removes an admin as PoolAdmin



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address of the admin to remove |

### removeRiskAdmin

```solidity
function removeRiskAdmin(address admin) external nonpayable
```

Removes an admin as RiskAdmin



#### Parameters

| Name | Type | Description |
|---|---|---|
| admin | address | The address of the admin to remove |

### setRoleAdmin

```solidity
function setRoleAdmin(bytes32 role, bytes32 adminRole) external nonpayable
```

Set the role as admin of a specific role.

*By default the admin role for all roles is `DEFAULT_ADMIN_ROLE`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role | bytes32 | The role to be managed by the admin role |
| adminRole | bytes32 | The admin role |




