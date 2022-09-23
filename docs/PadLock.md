# PadLock

*10Clouds*

> NFTPadlock

This contract is a digital Padlocks of love. We wanted to solve enviromental problem with tons of padlocks being hang up on bridges all over the worldcreating risk for overwhelming the construction or even worse collapsing it. With our approach you can achive similar expirience without the side effects.Establishing realtionship within our NFTPadlock contract also leverages AAVE protocol to earn yiled on deposited assets so you can eyewitness to the fruition of your relaitonship.



## Methods

### addRelationshipEvent

```solidity
function addRelationshipEvent(string _relationshipMemo, string _ipfsURI) external nonpayable
```

Function that can be called if user wants to share some relationship event



#### Parameters

| Name | Type | Description |
|---|---|---|
| _relationshipMemo | string | string regarding the event |
| _ipfsURI | string | ipfs string to photo |

### approveBreakUp

```solidity
function approveBreakUp() external nonpayable
```

Approve break up with someoneApproving break up this way would split equaly the funds between ex-couple




### approveRelationship

```solidity
function approveRelationship(bytes20 _relationshipId) external nonpayable
```

Allow approving relationship that someone propsed to you



#### Parameters

| Name | Type | Description |
|---|---|---|
| _relationshipId | bytes20 | identifier of relationship  |

### approveWithdraw

```solidity
function approveWithdraw() external nonpayable
```

approve withdraw by secondHalf, can be done only if proposition of withdraw is created




### deposit

```solidity
function deposit(uint256 _amount) external nonpayable
```

Allow topupping the relationship vault



#### Parameters

| Name | Type | Description |
|---|---|---|
| _amount | uint256 | amount in wei that user wants to boost vault |

### erc1155

```solidity
function erc1155() external view returns (contract ERC1155NFT)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC1155NFT | undefined |

### erc721

```solidity
function erc721() external view returns (contract ERC721NFT)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC721NFT | undefined |

### idToRelationship

```solidity
function idToRelationship(bytes20) external view returns (bytes20 id, uint256 startedAt, address firstHalf, address secondHalf, bool established, uint256 NFTPadlock, uint256 NFTFraction, uint256 initialFee, contract Vault vault, struct PadLock.BreakUp breakup, struct PadLock.AniversaryWithdraw aniversaryWithdraw)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes20 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| id | bytes20 | undefined |
| startedAt | uint256 | undefined |
| firstHalf | address | undefined |
| secondHalf | address | undefined |
| established | bool | undefined |
| NFTPadlock | uint256 | undefined |
| NFTFraction | uint256 | undefined |
| initialFee | uint256 | undefined |
| vault | contract Vault | undefined |
| breakup | PadLock.BreakUp | undefined |
| aniversaryWithdraw | PadLock.AniversaryWithdraw | undefined |

### incentives

```solidity
function incentives() external view returns (contract IERC20)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20 | undefined |

### loverToRelationshipId

```solidity
function loverToRelationshipId(address) external view returns (bytes20)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes20 | undefined |

### minimalFee

```solidity
function minimalFee() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### onERC1155Received

```solidity
function onERC1155Received(address, address, uint256, uint256, bytes) external nonpayable returns (bytes4)
```

Function for allowing this contract to receive ERC1155 tokens



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | address | undefined |
| _2 | uint256 | undefined |
| _3 | uint256 | undefined |
| _4 | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes4 | undefined |

### onERC721Received

```solidity
function onERC721Received(address, address, uint256, bytes) external nonpayable returns (bytes4)
```

Function for allowing this contract to receive ERC721 tokens



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | address | undefined |
| _2 | uint256 | undefined |
| _3 | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes4 | undefined |

### proposeBreakUp

```solidity
function proposeBreakUp() external nonpayable
```

Allow proposing break up to someone




### proposeRelationship

```solidity
function proposeRelationship(address _secondHalf, uint256 _relationshipFee) external nonpayable
```

Allow propsing relationship to someone



#### Parameters

| Name | Type | Description |
|---|---|---|
| _secondHalf | address | the other lover that you want to propse relationship to |
| _relationshipFee | uint256 | amount in wei that you want to invest within your relationship |

### proposeWithdraw

```solidity
function proposeWithdraw(uint256 _amount) external nonpayable
```

If needed to withdraw you can propse the withdrawal



#### Parameters

| Name | Type | Description |
|---|---|---|
| _amount | uint256 | amount in wei that is being propsed to withdraw |

### relationships

```solidity
function relationships(uint256) external view returns (bytes20)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes20 | undefined |

### slashBrakeUp

```solidity
function slashBrakeUp() external nonpayable
```

Immediate brake up with his/her lover with penalty for initiator5% of pair funds are redistributed to other established pairsrest of the funds are distributed in 40 to 60 amounts for the exPartners




### vaultFactory

```solidity
function vaultFactory() external view returns (contract VaultFactory)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract VaultFactory | undefined |

### weth

```solidity
function weth() external view returns (contract IERC20)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IERC20 | undefined |



## Events

### BreakupApproved

```solidity
event BreakupApproved(bytes20 indexed relationshipId, address indexed initiator, address indexed approver)
```

Emits event when someone approves breakup



#### Parameters

| Name | Type | Description |
|---|---|---|
| relationshipId `indexed` | bytes20 | undefined |
| initiator `indexed` | address | undefined |
| approver `indexed` | address | undefined |

### BreakupProposal

```solidity
event BreakupProposal(bytes20 indexed relationshipId, address initiator)
```

Emits event when someone propses breakup of relationship to someone



#### Parameters

| Name | Type | Description |
|---|---|---|
| relationshipId `indexed` | bytes20 | undefined |
| initiator  | address | undefined |

### Deposit

```solidity
event Deposit(bytes20 indexed relationshipId, address depositor, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| relationshipId `indexed` | bytes20 | undefined |
| depositor  | address | undefined |
| amount  | uint256 | undefined |

### RelationshipApproved

```solidity
event RelationshipApproved(bytes20 indexed relationshipId, address indexed firstHalf, address indexed secondHalf)
```

Emits event when someone approves relationship



#### Parameters

| Name | Type | Description |
|---|---|---|
| relationshipId `indexed` | bytes20 | undefined |
| firstHalf `indexed` | address | undefined |
| secondHalf `indexed` | address | undefined |

### RelationshipEvent

```solidity
event RelationshipEvent(string relationshipMemo, string ipfsURI, address indexed lover, bytes20 indexed relationshipId)
```

Emits event when someone wants to share relationship related event



#### Parameters

| Name | Type | Description |
|---|---|---|
| relationshipMemo  | string | undefined |
| ipfsURI  | string | undefined |
| lover `indexed` | address | undefined |
| relationshipId `indexed` | bytes20 | undefined |

### RelationshipProposed

```solidity
event RelationshipProposed(bytes20 indexed relationshipId, address indexed firstHalf, address indexed secondHalf)
```

Emits event when someone propses relationship to someone



#### Parameters

| Name | Type | Description |
|---|---|---|
| relationshipId `indexed` | bytes20 | undefined |
| firstHalf `indexed` | address | undefined |
| secondHalf `indexed` | address | undefined |



