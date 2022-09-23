// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import { ERC1155NFT } from "./nfts/ERC1155NFT.sol";
import { ERC721NFT } from "./nfts/ERC721NFT.sol";
import { VaultFactory } from "./VaultFactory.sol";
import { Vault } from "./Vault.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import { IRewardsController } from "@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol";
import { AaveProtocolDataProvider } from "@aave/core-v3/contracts/misc/AaveProtocolDataProvider.sol";
import { UiIncentiveDataProviderV3 } from "@aave/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol";
import { IUiIncentiveDataProviderV3 } from "@aave/periphery-v3/contracts/misc/interfaces/IUiIncentiveDataProviderV3.sol";


/// @title NFTPadlock
/// @author 10Clouds
/// @notice This contract is a digital Padlocks of love. We wanted to solve enviromental problem with tons of padlocks being hang up on bridges all over the world
/// @notice creating risk for overwhelming the construction or even worse collapsing it. With our approach you can achive similar expirience without the side effects.
/// @notice Establishing realtionship within our NFTPadlock contract also leverages AAVE protocol to earn yiled on deposited assets so you can eyewitness to the fruition of your relaitonship.
contract PadLock {
    /// @notice Emits event when someone propses relationship to someone
    event RelationshipProposed(bytes20 indexed relationshipId, address indexed firstHalf, address indexed secondHalf);

    /// @notice Emits event when someone approves relationship
    event RelationshipApproved(bytes20 indexed relationshipId, address indexed firstHalf, address indexed secondHalf);
    
    /// @notice Emits event when someone propses breakup of relationship to someone
    event BreakupProposal(bytes20 indexed relationshipId, address initiator);

    /// @notice Emits event when someone approves breakup
    event BreakupApproved(bytes20 indexed relationshipId, address indexed initiator, address indexed approver);

    /// @notice Emits event when someone wants to share relationship related event
    event RelationshipEvent(
        string relationshipMemo,
        string ipfsURI,
        address indexed lover,
        bytes20 indexed relationshipId
    );

    event Deposit(bytes20 indexed relationshipId, address depositor, uint256 amount);

    IERC20 public immutable weth;
    IERC20 public immutable incentives;

    VaultFactory public immutable vaultFactory;
    ERC1155NFT public erc1155;
    ERC721NFT public erc721;
    IPoolAddressesProvider immutable poolAddressProvider;
    UiIncentiveDataProviderV3 uiIncentiveDataProvider;

    mapping(address => bytes20) public loverToRelationshipId;
    mapping(bytes20 => Relationship) public idToRelationship;

    bytes20[] public relationships;

    uint256 public minimalFee;

    struct Relationship {
        bytes20 id;
        uint256 startedAt;
        address firstHalf;
        address secondHalf;
        bool established;
        uint256 NFTPadlock;
        uint256 NFTFraction;
        uint256 initialFee;
        Vault vault;
        BreakUp breakup;
        AniversaryWithdraw aniversaryWithdraw;
    }

    struct AniversaryWithdraw {
        bool firstHalfAgree;
        bool secondHalfAgree;
        uint256 amount;
    }

    struct BreakUp {
        address initiator;
        uint256 timestamp; // need this for keep3r
    }

    /// @notice
    function requireNotInRelationship(address _firstHalf, address _secondHalf) private view {
        require(loverToRelationshipId[_firstHalf] == bytes20(0), "User already in relationship");
        require(loverToRelationshipId[_secondHalf]== bytes20(0), "User already in relationship");
    }
    
    /// @notice Require user in relationship
    /// @param _user to check
    function requireInRelationship(address _user) private view {
        require(loverToRelationshipId[_user] != bytes20(0), "User not in relationship");
    }

    /// @notice Require breakup proposed
    /// @param _relationship to check
    function requireBreakUpPropse(Relationship memory _relationship) private pure {
        require(_relationship.breakup.initiator != address(0), "No breakup proposed");
    }

    /// @notice Require interested in relationship
    /// @param _firstHalf to check if it is msg.sender OR
    /// @param _secondHalf to check if it is msg.sender
    function requireInterestedInRelationship(
        address _firstHalf,
        address _secondHalf
    ) private view {
        require(_firstHalf == msg.sender || _secondHalf == msg.sender, "msg.sender is not in proposed relationship");
    }

    /// @notice Require weth allowance from _lover
    /// @param _lover to check his allowance for this contract
    /// @param _relationshipFee amount of required allowance
    function requireAllowance(address _lover, uint256 _relationshipFee) private view {
        require(_relationshipFee >= minimalFee, "relationshipFee too low");
        require(weth.allowance(_lover, address(this)) >= _relationshipFee, "Approval to low");
    }

    /// @notice Require day of relationship anniversary
    /// @param _relationship to check
    function requireRelationshipAniversary(Relationship memory _relationship) private view {
        require((block.timestamp -_relationship.startedAt) % (365 days) < 7 days, "Require anniversary");
    }

    constructor(
        IERC20 _weth,
        IERC20 _incentives,
        uint256 _minimalFee,
        IPoolAddressesProvider _poolAddressProvider,
        IRewardsController _rewardsController,
        UiIncentiveDataProviderV3 _uiIncentiveDataProvider // for calculating APY
    ) {
        weth = _weth;
        minimalFee = _minimalFee;
        poolAddressProvider = _poolAddressProvider;
        vaultFactory = new VaultFactory(address(this), _weth, _poolAddressProvider, _rewardsController);
        erc1155 = new ERC1155NFT("someURI");
        erc721 = new ERC721NFT("LovePadlock", "LPL");
        incentives = _incentives;
        uiIncentiveDataProvider = _uiIncentiveDataProvider;
    }

    /// @notice Allow propsing relationship to someone
    /// @param _secondHalf the other lover that you want to propse relationship to
    /// @param _relationshipFee amount in wei that you want to invest within your relationship
    function proposeRelationship(address _secondHalf, uint256 _relationshipFee) external {
        requireNotInRelationship(msg.sender, _secondHalf);
        requireAllowance(msg.sender, _relationshipFee);

        bytes20 id = bytes20(keccak256(abi.encodePacked(msg.sender, _secondHalf)));

        Relationship memory relationship = Relationship({
                id: id,
                startedAt: block.timestamp,
                firstHalf: msg.sender,
                secondHalf: _secondHalf,
                established: false,
                NFTPadlock: 0,
                NFTFraction: 0,
                initialFee: _relationshipFee,
                vault: Vault(address(0)),
                breakup: BreakUp({ initiator: address(0), timestamp: 0 }),
                aniversaryWithdraw: AniversaryWithdraw(false, false, 0)
        });

        relationships.push(id);
        idToRelationship[id] = relationship;

        emit RelationshipProposed(id, msg.sender, _secondHalf);
    }

    /// @notice Allow approving relationship that someone propsed to you
    /// @param _relationshipId identifier of relationship 
    function approveRelationship(bytes20 _relationshipId) external {
        Relationship storage relationship = idToRelationship[_relationshipId];

        (address firstHalf, address secondHalf, uint256 initialFee) = (
            relationship.firstHalf,
            relationship.secondHalf,
            relationship.initialFee
        );

        requireNotInRelationship(firstHalf, secondHalf);
        requireInterestedInRelationship(firstHalf, secondHalf);
        requireAllowance(firstHalf, initialFee);
        requireAllowance(secondHalf, initialFee);

        Vault vault = setUpVault(firstHalf, secondHalf, initialFee);

        relationship.vault = vault;
        relationship.established = true;

        loverToRelationshipId[firstHalf] = _relationshipId;
        loverToRelationshipId[secondHalf] = _relationshipId;

        mintNFTs(_relationshipId, [firstHalf, secondHalf]);

        emit RelationshipApproved(_relationshipId, firstHalf, secondHalf);
    }

    /// @notice Allow set up vault for newly created relationship
    /// @param _firstHalf address of first lover
    /// @param _secondHalf address of second lover 
    /// @param _fee of initial amount to deposit
    function setUpVault(
        address _firstHalf,
        address _secondHalf,
        uint256 _fee
    ) internal returns (Vault vault) {
        weth.transferFrom(_firstHalf, address(this), _fee);
        weth.transferFrom(_secondHalf, address(this), _fee);

        vault = vaultFactory.create();
        weth.approve(address(vault), _fee * 2);

        vault.depositToAave(_fee * 2);
    }

    /// @notice Allow proposing break up to someone
    function proposeBreakUp() external {
        Relationship storage relationship = idToRelationship[loverToRelationshipId[msg.sender]];

        requireInRelationship(msg.sender);
        require(relationship.breakup.initiator != msg.sender, "Already proposed");

        erc1155.safeTransferFrom(msg.sender, address(this), relationship.NFTFraction, 1, "");

        relationship.breakup.initiator = msg.sender;
        relationship.breakup.timestamp = block.timestamp;

        emit BreakupProposal(loverToRelationshipId[msg.sender], msg.sender);
    }

    /// @notice Approve break up with someone
    /// @notice Approving break up this way would split equaly the funds between ex-couple
    function approveBreakUp() external {
        bytes20 relationshipId = loverToRelationshipId[msg.sender];
        Relationship storage relationship = idToRelationship[relationshipId];

        requireInRelationship(msg.sender);
        requireBreakUpPropse(relationship);
        require(relationship.breakup.initiator != msg.sender, "Initiator can not approve");

        erc1155.safeTransferFrom(msg.sender, address(this), relationship.NFTFraction, 1, "");
        erc1155.burn(relationship.NFTFraction);
        erc721.burn(relationship.NFTPadlock);

        relationship.breakup.timestamp = block.timestamp;

        (uint256 depositAmount, uint256 incentivesAmount) = relationship.vault.withdrawAll();

        weth.transfer(relationship.firstHalf, depositAmount / 2);
        weth.transfer(relationship.secondHalf, depositAmount / 2);

        incentives.transfer(relationship.firstHalf, incentivesAmount / 2);
        incentives.transfer(relationship.secondHalf, incentivesAmount / 2);

        emit BreakupApproved(loverToRelationshipId[msg.sender], relationship.breakup.initiator, msg.sender);
        
        deleteRelationship(relationshipId);
    }

    /// @notice If needed to withdraw you can propse the withdrawal
    /// @param _amount amount in wei that is being propsed to withdraw
    function proposeWithdraw(uint256 _amount) external {
        bytes20 relationshipId = loverToRelationshipId[msg.sender];
        AniversaryWithdraw storage _withdraw = idToRelationship[relationshipId].aniversaryWithdraw;

        requireRelationshipAniversary(idToRelationship[relationshipId]);
        
        require(!_withdraw.firstHalfAgree); 
        require(!_withdraw.secondHalfAgree);

        if(msg.sender == idToRelationship[relationshipId].firstHalf) {
            _withdraw.firstHalfAgree = true;
        } else {
            _withdraw.secondHalfAgree = true;
        }
        _withdraw.amount = _amount;
    }

    /// @notice approve withdraw by secondHalf, can be done only if proposition of withdraw is created
    function approveWithdraw() external {
        bytes20 relationshipId = loverToRelationshipId[msg.sender];
        Relationship storage relationship = idToRelationship[relationshipId];

        requireRelationshipAniversary(relationship);

        if(msg.sender == relationship.firstHalf) {
            require(relationship.aniversaryWithdraw.secondHalfAgree, "Second half must approve");
        } else {
            require(relationship.aniversaryWithdraw.firstHalfAgree, "Second half must approve");
        }

        uint256 amount = relationship.aniversaryWithdraw.amount;

        relationship.vault.withdraw(amount);

        weth.transfer(relationship.firstHalf, amount / 2);
        weth.transfer(relationship.secondHalf, amount / 2);

        delete relationship.aniversaryWithdraw;
    }

    /// @notice Allow topupping the relationship vault
    /// @param _amount amount in wei that user wants to boost vault
    function deposit(uint256 _amount) external {
        bytes20 relationshipId = loverToRelationshipId[msg.sender];
        Vault vault = idToRelationship[relationshipId].vault;

        weth.transferFrom(msg.sender, address(this), _amount);

        weth.approve(address(vault), _amount);

        vault.depositToAave(_amount);

        emit Deposit(relationshipId, msg.sender, _amount);

    }

    /// @notice Immediate brake up with his/her lover with penalty for initiator
    /// @notice 5% of pair funds are redistributed to other established pairs
    /// @notice rest of the funds are distributed in 40 to 60 amounts for the exPartners
    function slashBrakeUp() external {
        bytes20 relationshipId = loverToRelationshipId[msg.sender];

        Relationship memory relationship = idToRelationship[relationshipId];

        requireInRelationship(msg.sender);
        requireBreakUpPropse(relationship);

        require(msg.sender == relationship.breakup.initiator, "Not an initiator");

        address exPartner = relationship.breakup.initiator != relationship.firstHalf
            ? relationship.firstHalf
            : relationship.secondHalf;

        erc1155.safeTransferFrom(exPartner, address(this), relationship.NFTFraction, 1, "");
        erc1155.burn(relationship.NFTFraction);
        erc721.burn(relationship.NFTPadlock);

        (uint256 depositAmount, uint256 incentivesAmount) = relationship.vault.withdrawAll();

        deleteRelationship(relationshipId);

        uint256 amountToSplit = (depositAmount * 5) / 100 / relationships.length;

        for (uint256 i; i < relationships.length; i++) {
            Vault vault = idToRelationship[relationships[i]].vault;
            weth.approve(address(vault), amountToSplit);
            vault.depositToAave(amountToSplit);
        }

        depositAmount = weth.balanceOf(address(this));
        weth.transfer(exPartner, (depositAmount * 60) / 100);
        incentives.transfer(exPartner, (incentivesAmount * 60) / 100);

        weth.transfer(relationship.breakup.initiator, (depositAmount * 40) / 100);
        incentives.transfer(relationship.breakup.initiator, (incentivesAmount * 60) / 100);
    }

    /// @notice Function for wiping out the relationship from mapping after breakup
    /// @param _relationshipId identifier of relationsip
    function deleteRelationship(bytes20 _relationshipId) internal {
        for(uint256 i; i < relationships.length; i++) {
            if(relationships[i] == _relationshipId) {
                delete loverToRelationshipId[idToRelationship[relationships[i]].firstHalf];
                delete loverToRelationshipId[idToRelationship[relationships[i]].secondHalf];

                delete idToRelationship[_relationshipId];

                // overwrite current relationship with the last one from array, so it's dupliacted and then pop the last element
                relationships[i] = relationships[relationships.length - 1];
                relationships.pop();
                return;
            }
        }
    }

    /// @notice Function that can be called if user wants to share some relationship event
    /// @param _relationshipMemo string regarding the event
    /// @param _ipfsURI ipfs string to photo
    function addRelationshipEvent(string memory _relationshipMemo, string memory _ipfsURI) external {
        bytes20 id = loverToRelationshipId[msg.sender];
        requireInRelationship(msg.sender);
        emit RelationshipEvent(_relationshipMemo, _ipfsURI, msg.sender, id);
    }

    /// @notice Internal function for minting PadLock NFT and factorial ownership nft in from of ERC1155
    /// @param _relationshipId identifier of relationsip
    /// @param couple array containing couple addresses
    function mintNFTs(bytes20 _relationshipId, address[2] memory couple) internal {
        Relationship storage relationship = idToRelationship[_relationshipId];

        uint256 padlockNFT = erc721.mint("basic PADLOCK URI");
        uint256 tokenId = erc1155.mint();

        erc1155.safeTransferFrom(address(this), couple[0], tokenId, 1, "");
        erc1155.safeTransferFrom(address(this), couple[1], tokenId, 1, "");

        relationship.NFTPadlock = padlockNFT;
        relationship.NFTFraction = tokenId;
    }

    function getRewardsData() external view returns(IUiIncentiveDataProviderV3.RewardInfo[] memory rewardInfo) {
        IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[] memory reserveIncentivesData = uiIncentiveDataProvider.getReservesIncentivesData(poolAddressProvider);
        //IUiIncentiveDataProviderV3.RewardInfo[] memory rewardInfo;
        for(uint256 i; i < reserveIncentivesData.length; i++) {
            if(reserveIncentivesData[i].underlyingAsset == address(weth)) {
                rewardInfo = reserveIncentivesData[i].aIncentiveData.rewardsTokenInformation;
                break;
            }
        }
    }

    /// @notice Function for allowing this contract to receive ERC721 tokens
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /// @notice Function for allowing this contract to receive ERC1155 tokens
    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }
}
