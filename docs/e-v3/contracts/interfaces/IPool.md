# IPool

*Aave*

> IPool

Defines the basic interface for an Aave Pool.*



## Methods

### ADDRESSES_PROVIDER

```solidity
function ADDRESSES_PROVIDER() external view returns (contract IPoolAddressesProvider)
```

Returns the PoolAddressesProvider connected to this contract




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPoolAddressesProvider | The address of the PoolAddressesProvider* |

### BRIDGE_PROTOCOL_FEE

```solidity
function BRIDGE_PROTOCOL_FEE() external view returns (uint256)
```

Returns the part of the bridge fees sent to protocol




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The bridge fee sent to the protocol treasury |

### FLASHLOAN_PREMIUM_TOTAL

```solidity
function FLASHLOAN_PREMIUM_TOTAL() external view returns (uint128)
```

Returns the total fee on flash loans




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint128 | The total fee on flashloans |

### FLASHLOAN_PREMIUM_TO_PROTOCOL

```solidity
function FLASHLOAN_PREMIUM_TO_PROTOCOL() external view returns (uint128)
```

Returns the part of the flashloan fees sent to protocol




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint128 | The flashloan fee sent to the protocol treasury |

### MAX_NUMBER_RESERVES

```solidity
function MAX_NUMBER_RESERVES() external view returns (uint16)
```

Returns the maximum number of reserves supported to be listed in this Pool




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint16 | The maximum number of reserves supported |

### MAX_STABLE_RATE_BORROW_SIZE_PERCENT

```solidity
function MAX_STABLE_RATE_BORROW_SIZE_PERCENT() external view returns (uint256)
```

Returns the percentage of available liquidity that can be borrowed at once at stable rate




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The percentage of available liquidity to borrow, expressed in bps |

### backUnbacked

```solidity
function backUnbacked(address asset, uint256 amount, uint256 fee) external nonpayable
```



*Back the current unbacked underlying with `amount` and pay `fee`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset to back |
| amount | uint256 | The amount to back |
| fee | uint256 | The amount paid in fees* |

### borrow

```solidity
function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external nonpayable
```

Allows users to borrow a specific `amount` of the reserve underlying asset, provided that the borrower already supplied enough collateral, or he was given enough allowance by a credit delegator on the corresponding debt token (StableDebtToken or VariableDebtToken) - E.g. User borrows 100 USDC passing as `onBehalfOf` his own address, receiving the 100 USDC in his wallet   and 100 stable/variable debt tokens, depending on the `interestRateMode`



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset to borrow |
| amount | uint256 | The amount to be borrowed |
| interestRateMode | uint256 | The interest rate mode at which the user wants to borrow: 1 for Stable, 2 for Variable |
| referralCode | uint16 | The code used to register the integrator originating the operation, for potential rewards.   0 if the action is executed directly by the user, without any middle-man |
| onBehalfOf | address | The address of the user who will receive the debt. Should be the address of the borrower itself calling the function if he wants to borrow against his own collateral, or the address of the credit delegator if he has been given credit delegation allowance* |

### configureEModeCategory

```solidity
function configureEModeCategory(uint8 id, DataTypes.EModeCategory config) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| id | uint8 | undefined |
| config | DataTypes.EModeCategory | undefined |

### deposit

```solidity
function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external nonpayable
```

Supplies an `amount` of underlying asset into the reserve, receiving in return overlying aTokens. - E.g. User supplies 100 USDC and gets in return 100 aUSDC

*Deprecated: Use the `supply` function instead*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset to supply |
| amount | uint256 | The amount to be supplied |
| onBehalfOf | address | The address that will receive the aTokens, same as msg.sender if the user   wants to receive them on his own wallet, or a different address if the beneficiary of aTokens   is a different wallet |
| referralCode | uint16 | Code used to register the integrator originating the operation, for potential rewards.   0 if the action is executed directly by the user, without any middle-man* |

### dropReserve

```solidity
function dropReserve(address asset) external nonpayable
```

Drop a reserve

*Only callable by the PoolConfigurator contract*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve* |

### finalizeTransfer

```solidity
function finalizeTransfer(address asset, address from, address to, uint256 amount, uint256 balanceFromBefore, uint256 balanceToBefore) external nonpayable
```

Validates and finalizes an aToken transfer

*Only callable by the overlying aToken of the `asset`*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the aToken |
| from | address | The user from which the aTokens are transferred |
| to | address | The user receiving the aTokens |
| amount | uint256 | The amount being transferred/withdrawn |
| balanceFromBefore | uint256 | The aToken balance of the `from` user before the transfer |
| balanceToBefore | uint256 | The aToken balance of the `to` user before the transfer |

### flashLoan

```solidity
function flashLoan(address receiverAddress, address[] assets, uint256[] amounts, uint256[] interestRateModes, address onBehalfOf, bytes params, uint16 referralCode) external nonpayable
```

Allows smartcontracts to access the liquidity of the pool within one transaction, as long as the amount taken plus a fee is returned.

*IMPORTANT There are security concerns for developers of flashloan receiver contracts that must be kept into consideration. For further details please visit https://developers.aave.com*

#### Parameters

| Name | Type | Description |
|---|---|---|
| receiverAddress | address | The address of the contract receiving the funds, implementing IFlashLoanReceiver interface |
| assets | address[] | The addresses of the assets being flash-borrowed |
| amounts | uint256[] | The amounts of the assets being flash-borrowed |
| interestRateModes | uint256[] | Types of the debt to open if the flash loan is not returned:   0 -&gt; Don&#39;t open any debt, just revert if funds can&#39;t be transferred from the receiver   1 -&gt; Open debt at stable rate for the value of the amount flash-borrowed to the `onBehalfOf` address   2 -&gt; Open debt at variable rate for the value of the amount flash-borrowed to the `onBehalfOf` address |
| onBehalfOf | address | The address  that will receive the debt in the case of using on `modes` 1 or 2 |
| params | bytes | Variadic packed params to pass to the receiver as extra information |
| referralCode | uint16 | The code used to register the integrator originating the operation, for potential rewards.   0 if the action is executed directly by the user, without any middle-man* |

### flashLoanSimple

```solidity
function flashLoanSimple(address receiverAddress, address asset, uint256 amount, bytes params, uint16 referralCode) external nonpayable
```

Allows smartcontracts to access the liquidity of the pool within one transaction, as long as the amount taken plus a fee is returned.

*IMPORTANT There are security concerns for developers of flashloan receiver contracts that must be kept into consideration. For further details please visit https://developers.aave.com*

#### Parameters

| Name | Type | Description |
|---|---|---|
| receiverAddress | address | The address of the contract receiving the funds, implementing IFlashLoanSimpleReceiver interface |
| asset | address | The address of the asset being flash-borrowed |
| amount | uint256 | The amount of the asset being flash-borrowed |
| params | bytes | Variadic packed params to pass to the receiver as extra information |
| referralCode | uint16 | The code used to register the integrator originating the operation, for potential rewards.   0 if the action is executed directly by the user, without any middle-man* |

### getConfiguration

```solidity
function getConfiguration(address asset) external view returns (struct DataTypes.ReserveConfigurationMap)
```

Returns the configuration of the reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | DataTypes.ReserveConfigurationMap | The configuration of the reserve* |

### getEModeCategoryData

```solidity
function getEModeCategoryData(uint8 id) external view returns (struct DataTypes.EModeCategory)
```

Returns the data of an eMode category



#### Parameters

| Name | Type | Description |
|---|---|---|
| id | uint8 | The id of the category |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | DataTypes.EModeCategory | The configuration data of the category |

### getReserveAddressById

```solidity
function getReserveAddressById(uint16 id) external view returns (address)
```

Returns the address of the underlying asset of a reserve by the reserve id as stored in the DataTypes.ReserveData struct



#### Parameters

| Name | Type | Description |
|---|---|---|
| id | uint16 | The id of the reserve as stored in the DataTypes.ReserveData struct |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the reserve associated with id* |

### getReserveData

```solidity
function getReserveData(address asset) external view returns (struct DataTypes.ReserveData)
```

Returns the state and configuration of the reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | DataTypes.ReserveData | The state and configuration data of the reserve* |

### getReserveNormalizedIncome

```solidity
function getReserveNormalizedIncome(address asset) external view returns (uint256)
```

Returns the normalized income normalized income of the reserve



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The reserve&#39;s normalized income |

### getReserveNormalizedVariableDebt

```solidity
function getReserveNormalizedVariableDebt(address asset) external view returns (uint256)
```

Returns the normalized variable debt per unit of asset



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The reserve normalized variable debt |

### getReservesList

```solidity
function getReservesList() external view returns (address[])
```

Returns the list of the underlying assets of all the initialized reserves

*It does not include dropped reserves*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address[] | The addresses of the underlying assets of the initialized reserves* |

### getUserAccountData

```solidity
function getUserAccountData(address user) external view returns (uint256 totalCollateralBase, uint256 totalDebtBase, uint256 availableBorrowsBase, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)
```

Returns the user account data across all the reserves



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| totalCollateralBase | uint256 | The total collateral of the user in the base currency used by the price feed |
| totalDebtBase | uint256 | The total debt of the user in the base currency used by the price feed |
| availableBorrowsBase | uint256 | The borrowing power left of the user in the base currency used by the price feed |
| currentLiquidationThreshold | uint256 | The liquidation threshold of the user |
| ltv | uint256 | The loan to value of The user |
| healthFactor | uint256 | The current health factor of the user* |

### getUserConfiguration

```solidity
function getUserConfiguration(address user) external view returns (struct DataTypes.UserConfigurationMap)
```

Returns the configuration of the user across all the reserves



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The user address |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | DataTypes.UserConfigurationMap | The configuration of the user* |

### getUserEMode

```solidity
function getUserEMode(address user) external view returns (uint256)
```

Returns the eMode the user is using



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The address of the user |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The eMode id |

### initReserve

```solidity
function initReserve(address asset, address aTokenAddress, address stableDebtAddress, address variableDebtAddress, address interestRateStrategyAddress) external nonpayable
```

Initializes a reserve, activating it, assigning an aToken and debt tokens and an interest rate strategy

*Only callable by the PoolConfigurator contract*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |
| aTokenAddress | address | The address of the aToken that will be assigned to the reserve |
| stableDebtAddress | address | The address of the StableDebtToken that will be assigned to the reserve |
| variableDebtAddress | address | The address of the VariableDebtToken that will be assigned to the reserve |
| interestRateStrategyAddress | address | The address of the interest rate strategy contract* |

### liquidationCall

```solidity
function liquidationCall(address collateralAsset, address debtAsset, address user, uint256 debtToCover, bool receiveAToken) external nonpayable
```

Function to liquidate a non-healthy position collateral-wise, with Health Factor below 1 - The caller (liquidator) covers `debtToCover` amount of debt of the user getting liquidated, and receives   a proportionally amount of the `collateralAsset` plus a bonus to cover market risk



#### Parameters

| Name | Type | Description |
|---|---|---|
| collateralAsset | address | The address of the underlying asset used as collateral, to receive as result of the liquidation |
| debtAsset | address | The address of the underlying borrowed asset to be repaid with the liquidation |
| user | address | The address of the borrower getting liquidated |
| debtToCover | uint256 | The debt amount of borrowed `asset` the liquidator wants to cover |
| receiveAToken | bool | True if the liquidators wants to receive the collateral aTokens, `false` if he wants to receive the underlying collateral asset directly* |

### mintToTreasury

```solidity
function mintToTreasury(address[] assets) external nonpayable
```

Mints the assets accrued through the reserve factor to the treasury in the form of aTokens



#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | address[] | The list of reserves for which the minting needs to be executed* |

### mintUnbacked

```solidity
function mintUnbacked(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external nonpayable
```



*Mints an `amount` of aTokens to the `onBehalfOf`*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset to mint |
| amount | uint256 | The amount to mint |
| onBehalfOf | address | The address that will receive the aTokens |
| referralCode | uint16 | Code used to register the integrator originating the operation, for potential rewards.   0 if the action is executed directly by the user, without any middle-man* |

### rebalanceStableBorrowRate

```solidity
function rebalanceStableBorrowRate(address asset, address user) external nonpayable
```

Rebalances the stable interest rate of a user to the current stable rate defined on the reserve. - Users can be rebalanced if the following conditions are satisfied:     1. Usage ratio is above 95%     2. the current supply APY is below REBALANCE_UP_THRESHOLD * maxVariableBorrowRate, which means that too        much has been borrowed at a stable rate and suppliers are not earning enough



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset borrowed |
| user | address | The address of the user to be rebalanced* |

### repay

```solidity
function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external nonpayable returns (uint256)
```

Repays a borrowed `amount` on a specific reserve, burning the equivalent debt tokens owned - E.g. User repays 100 USDC, burning 100 variable/stable debt tokens of the `onBehalfOf` address



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the borrowed underlying asset previously borrowed |
| amount | uint256 | The amount to repay - Send the value type(uint256).max in order to repay the whole debt for `asset` on the specific `debtMode` |
| interestRateMode | uint256 | The interest rate mode at of the debt the user wants to repay: 1 for Stable, 2 for Variable |
| onBehalfOf | address | The address of the user who will get his debt reduced/removed. Should be the address of the user calling the function if he wants to reduce/remove his own debt, or the address of any other other borrower whose debt should be removed |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The final amount repaid* |

### repayWithATokens

```solidity
function repayWithATokens(address asset, uint256 amount, uint256 interestRateMode) external nonpayable returns (uint256)
```

Repays a borrowed `amount` on a specific reserve using the reserve aTokens, burning the equivalent debt tokens - E.g. User repays 100 USDC using 100 aUSDC, burning 100 variable/stable debt tokens

*Passing uint256.max as amount will clean up any residual aToken dust balance, if the user aToken balance is not enough to cover the whole debt*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the borrowed underlying asset previously borrowed |
| amount | uint256 | The amount to repay - Send the value type(uint256).max in order to repay the whole debt for `asset` on the specific `debtMode` |
| interestRateMode | uint256 | The interest rate mode at of the debt the user wants to repay: 1 for Stable, 2 for Variable |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The final amount repaid* |

### repayWithPermit

```solidity
function repayWithPermit(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf, uint256 deadline, uint8 permitV, bytes32 permitR, bytes32 permitS) external nonpayable returns (uint256)
```

Repay with transfer approval of asset to be repaid done via permit function see: https://eips.ethereum.org/EIPS/eip-2612 and https://eips.ethereum.org/EIPS/eip-713



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the borrowed underlying asset previously borrowed |
| amount | uint256 | The amount to repay - Send the value type(uint256).max in order to repay the whole debt for `asset` on the specific `debtMode` |
| interestRateMode | uint256 | The interest rate mode at of the debt the user wants to repay: 1 for Stable, 2 for Variable |
| onBehalfOf | address | Address of the user who will get his debt reduced/removed. Should be the address of the user calling the function if he wants to reduce/remove his own debt, or the address of any other other borrower whose debt should be removed |
| deadline | uint256 | The deadline timestamp that the permit is valid |
| permitV | uint8 | The V parameter of ERC712 permit sig |
| permitR | bytes32 | The R parameter of ERC712 permit sig |
| permitS | bytes32 | The S parameter of ERC712 permit sig |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The final amount repaid* |

### rescueTokens

```solidity
function rescueTokens(address token, address to, uint256 amount) external nonpayable
```

Rescue and transfer tokens locked in this contract



#### Parameters

| Name | Type | Description |
|---|---|---|
| token | address | The address of the token |
| to | address | The address of the recipient |
| amount | uint256 | The amount of token to transfer |

### resetIsolationModeTotalDebt

```solidity
function resetIsolationModeTotalDebt(address asset) external nonpayable
```

Resets the isolation mode total debt of the given asset to zero

*It requires the given asset has zero debt ceiling*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset to reset the isolationModeTotalDebt |

### setConfiguration

```solidity
function setConfiguration(address asset, DataTypes.ReserveConfigurationMap configuration) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | undefined |
| configuration | DataTypes.ReserveConfigurationMap | undefined |

### setReserveInterestRateStrategyAddress

```solidity
function setReserveInterestRateStrategyAddress(address asset, address rateStrategyAddress) external nonpayable
```

Updates the address of the interest rate strategy contract

*Only callable by the PoolConfigurator contract*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset of the reserve |
| rateStrategyAddress | address | The address of the interest rate strategy contract* |

### setUserEMode

```solidity
function setUserEMode(uint8 categoryId) external nonpayable
```

Allows a user to use the protocol in eMode



#### Parameters

| Name | Type | Description |
|---|---|---|
| categoryId | uint8 | The id of the category |

### setUserUseReserveAsCollateral

```solidity
function setUserUseReserveAsCollateral(address asset, bool useAsCollateral) external nonpayable
```

Allows suppliers to enable/disable a specific supplied asset as collateral



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset supplied |
| useAsCollateral | bool | True if the user wants to use the supply as collateral, false otherwise* |

### supply

```solidity
function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external nonpayable
```

Supplies an `amount` of underlying asset into the reserve, receiving in return overlying aTokens. - E.g. User supplies 100 USDC and gets in return 100 aUSDC



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset to supply |
| amount | uint256 | The amount to be supplied |
| onBehalfOf | address | The address that will receive the aTokens, same as msg.sender if the user   wants to receive them on his own wallet, or a different address if the beneficiary of aTokens   is a different wallet |
| referralCode | uint16 | Code used to register the integrator originating the operation, for potential rewards.   0 if the action is executed directly by the user, without any middle-man* |

### supplyWithPermit

```solidity
function supplyWithPermit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode, uint256 deadline, uint8 permitV, bytes32 permitR, bytes32 permitS) external nonpayable
```

Supply with transfer approval of asset to be supplied done via permit function see: https://eips.ethereum.org/EIPS/eip-2612 and https://eips.ethereum.org/EIPS/eip-713



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset to supply |
| amount | uint256 | The amount to be supplied |
| onBehalfOf | address | The address that will receive the aTokens, same as msg.sender if the user   wants to receive them on his own wallet, or a different address if the beneficiary of aTokens   is a different wallet |
| referralCode | uint16 | Code used to register the integrator originating the operation, for potential rewards.   0 if the action is executed directly by the user, without any middle-man |
| deadline | uint256 | The deadline timestamp that the permit is valid |
| permitV | uint8 | The V parameter of ERC712 permit sig |
| permitR | bytes32 | The R parameter of ERC712 permit sig |
| permitS | bytes32 | The S parameter of ERC712 permit sig* |

### swapBorrowRateMode

```solidity
function swapBorrowRateMode(address asset, uint256 interestRateMode) external nonpayable
```

Allows a borrower to swap his debt between stable and variable mode, or vice versa



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset borrowed |
| interestRateMode | uint256 | The current interest rate mode of the position being swapped: 1 for Stable, 2 for Variable* |

### updateBridgeProtocolFee

```solidity
function updateBridgeProtocolFee(uint256 bridgeProtocolFee) external nonpayable
```

Updates the protocol fee on the bridging



#### Parameters

| Name | Type | Description |
|---|---|---|
| bridgeProtocolFee | uint256 | The part of the premium sent to the protocol treasury |

### updateFlashloanPremiums

```solidity
function updateFlashloanPremiums(uint128 flashLoanPremiumTotal, uint128 flashLoanPremiumToProtocol) external nonpayable
```

Updates flash loan premiums. Flash loan premium consists of two parts: - A part is sent to aToken holders as extra, one time accumulated interest - A part is collected by the protocol treasury

*The total premium is calculated on the total borrowed amountThe premium to protocol is calculated on the total premium, being a percentage of `flashLoanPremiumTotal`Only callable by the PoolConfigurator contract*

#### Parameters

| Name | Type | Description |
|---|---|---|
| flashLoanPremiumTotal | uint128 | The total premium, expressed in bps |
| flashLoanPremiumToProtocol | uint128 | The part of the premium sent to the protocol treasury, expressed in bps |

### withdraw

```solidity
function withdraw(address asset, uint256 amount, address to) external nonpayable returns (uint256)
```

Withdraws an `amount` of underlying asset from the reserve, burning the equivalent aTokens owned E.g. User has 100 aUSDC, calls withdraw() and receives 100 USDC, burning the 100 aUSDC



#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | address | The address of the underlying asset to withdraw |
| amount | uint256 | The underlying amount to be withdrawn   - Send the value type(uint256).max in order to withdraw the whole aToken balance |
| to | address | The address that will receive the underlying, same as msg.sender if the user   wants to receive it on his own wallet, or a different address if the beneficiary is a   different wallet |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The final amount withdrawn* |



## Events

### BackUnbacked

```solidity
event BackUnbacked(address indexed reserve, address indexed backer, uint256 amount, uint256 fee)
```



*Emitted on backUnbacked()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| backer `indexed` | address | The address paying for the backing |
| amount  | uint256 | The amount added as backing |
| fee  | uint256 | The amount paid in fees* |

### Borrow

```solidity
event Borrow(address indexed reserve, address user, address indexed onBehalfOf, uint256 amount, enum DataTypes.InterestRateMode interestRateMode, uint256 borrowRate, uint16 indexed referralCode)
```



*Emitted on borrow() and flashLoan() when debt needs to be opened*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset being borrowed |
| user  | address | The address of the user initiating the borrow(), receiving the funds on borrow() or just initiator of the transaction on flashLoan() |
| onBehalfOf `indexed` | address | The address that will be getting the debt |
| amount  | uint256 | The amount borrowed out |
| interestRateMode  | enum DataTypes.InterestRateMode | The rate mode: 1 for Stable, 2 for Variable |
| borrowRate  | uint256 | The numeric rate at which the user has borrowed, expressed in ray |
| referralCode `indexed` | uint16 | The referral code used* |

### FlashLoan

```solidity
event FlashLoan(address indexed target, address initiator, address indexed asset, uint256 amount, enum DataTypes.InterestRateMode interestRateMode, uint256 premium, uint16 indexed referralCode)
```



*Emitted on flashLoan()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| target `indexed` | address | The address of the flash loan receiver contract |
| initiator  | address | The address initiating the flash loan |
| asset `indexed` | address | The address of the asset being flash borrowed |
| amount  | uint256 | The amount flash borrowed |
| interestRateMode  | enum DataTypes.InterestRateMode | The flashloan mode: 0 for regular flashloan, 1 for Stable debt, 2 for Variable debt |
| premium  | uint256 | The fee flash borrowed |
| referralCode `indexed` | uint16 | The referral code used* |

### IsolationModeTotalDebtUpdated

```solidity
event IsolationModeTotalDebtUpdated(address indexed asset, uint256 totalDebt)
```



*Emitted on borrow(), repay() and liquidationCall() when using isolated assets*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset `indexed` | address | The address of the underlying asset of the reserve |
| totalDebt  | uint256 | The total isolation mode debt for the reserve |

### LiquidationCall

```solidity
event LiquidationCall(address indexed collateralAsset, address indexed debtAsset, address indexed user, uint256 debtToCover, uint256 liquidatedCollateralAmount, address liquidator, bool receiveAToken)
```



*Emitted when a borrower is liquidated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| collateralAsset `indexed` | address | The address of the underlying asset used as collateral, to receive as result of the liquidation |
| debtAsset `indexed` | address | The address of the underlying borrowed asset to be repaid with the liquidation |
| user `indexed` | address | The address of the borrower getting liquidated |
| debtToCover  | uint256 | The debt amount of borrowed `asset` the liquidator wants to cover |
| liquidatedCollateralAmount  | uint256 | The amount of collateral received by the liquidator |
| liquidator  | address | The address of the liquidator |
| receiveAToken  | bool | True if the liquidators wants to receive the collateral aTokens, `false` if he wants to receive the underlying collateral asset directly* |

### MintUnbacked

```solidity
event MintUnbacked(address indexed reserve, address user, address indexed onBehalfOf, uint256 amount, uint16 indexed referralCode)
```



*Emitted on mintUnbacked()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| user  | address | The address initiating the supply |
| onBehalfOf `indexed` | address | The beneficiary of the supplied assets, receiving the aTokens |
| amount  | uint256 | The amount of supplied assets |
| referralCode `indexed` | uint16 | The referral code used* |

### MintedToTreasury

```solidity
event MintedToTreasury(address indexed reserve, uint256 amountMinted)
```



*Emitted when the protocol treasury receives minted aTokens from the accrued interest.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the reserve |
| amountMinted  | uint256 | The amount minted to the treasury* |

### RebalanceStableBorrowRate

```solidity
event RebalanceStableBorrowRate(address indexed reserve, address indexed user)
```



*Emitted on rebalanceStableBorrowRate()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| user `indexed` | address | The address of the user for which the rebalance has been executed* |

### Repay

```solidity
event Repay(address indexed reserve, address indexed user, address indexed repayer, uint256 amount, bool useATokens)
```



*Emitted on repay()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| user `indexed` | address | The beneficiary of the repayment, getting his debt reduced |
| repayer `indexed` | address | The address of the user initiating the repay(), providing the funds |
| amount  | uint256 | The amount repaid |
| useATokens  | bool | True if the repayment is done using aTokens, `false` if done with underlying asset directly* |

### ReserveDataUpdated

```solidity
event ReserveDataUpdated(address indexed reserve, uint256 liquidityRate, uint256 stableBorrowRate, uint256 variableBorrowRate, uint256 liquidityIndex, uint256 variableBorrowIndex)
```



*Emitted when the state of a reserve is updated.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| liquidityRate  | uint256 | The next liquidity rate |
| stableBorrowRate  | uint256 | The next stable borrow rate |
| variableBorrowRate  | uint256 | The next variable borrow rate |
| liquidityIndex  | uint256 | The next liquidity index |
| variableBorrowIndex  | uint256 | The next variable borrow index* |

### ReserveUsedAsCollateralDisabled

```solidity
event ReserveUsedAsCollateralDisabled(address indexed reserve, address indexed user)
```



*Emitted on setUserUseReserveAsCollateral()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| user `indexed` | address | The address of the user enabling the usage as collateral* |

### ReserveUsedAsCollateralEnabled

```solidity
event ReserveUsedAsCollateralEnabled(address indexed reserve, address indexed user)
```



*Emitted on setUserUseReserveAsCollateral()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| user `indexed` | address | The address of the user enabling the usage as collateral* |

### Supply

```solidity
event Supply(address indexed reserve, address user, address indexed onBehalfOf, uint256 amount, uint16 indexed referralCode)
```



*Emitted on supply()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| user  | address | The address initiating the supply |
| onBehalfOf `indexed` | address | The beneficiary of the supply, receiving the aTokens |
| amount  | uint256 | The amount supplied |
| referralCode `indexed` | uint16 | The referral code used* |

### SwapBorrowRateMode

```solidity
event SwapBorrowRateMode(address indexed reserve, address indexed user, enum DataTypes.InterestRateMode interestRateMode)
```



*Emitted on swapBorrowRateMode()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset of the reserve |
| user `indexed` | address | The address of the user swapping his rate mode |
| interestRateMode  | enum DataTypes.InterestRateMode | The current interest rate mode of the position being swapped: 1 for Stable, 2 for Variable* |

### UserEModeSet

```solidity
event UserEModeSet(address indexed user, uint8 categoryId)
```



*Emitted when the user selects a certain asset category for eMode*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | The address of the user |
| categoryId  | uint8 | The category id* |

### Withdraw

```solidity
event Withdraw(address indexed reserve, address indexed user, address indexed to, uint256 amount)
```



*Emitted on withdraw()*

#### Parameters

| Name | Type | Description |
|---|---|---|
| reserve `indexed` | address | The address of the underlying asset being withdrawn |
| user `indexed` | address | The address initiating the withdrawal, owner of aTokens |
| to `indexed` | address | The address that will receive the underlying |
| amount  | uint256 | The amount to be withdrawn* |



