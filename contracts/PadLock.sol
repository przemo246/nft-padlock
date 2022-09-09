// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import { ERC1155NFT } from "./nfts/ERC1155NFT.sol";
import { ERC721NFT } from "./nfts/ERC721NFT.sol";
import { VaultFactory } from "./VaultFactory.sol";
import { Vault } from "./Vault.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { IERC1155Receiver } from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import { IRewardsController } from "@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol";
import { AaveProtocolDataProvider } from "@aave/core-v3/contracts/misc/AaveProtocolDataProvider.sol";

contract PadLock {
    event RelationshipProposed(uint256 indexed relationshipId, address indexed firstHalf, address indexed secondHalf);
    event RelationshipApproved(uint256 indexed relationshipId, address indexed firstHalf, address indexed secondHalf);

    event BreakupProposal(uint256 indexed relationshipId, address initiator);
    event BreakupApproved(uint256 indexed relationshipId, address indexed initiator, address indexed approver);

    address public immutable keeper;
    IERC20 public immutable weth;
    uint256 public minimalFee;
    VaultFactory public immutable vaultFactory;
    ERC1155NFT public erc1155;
    ERC721NFT public erc721;
    IPoolAddressesProvider immutable poolAddressProvider;

    mapping(address => bool) public inRelationship;
    mapping(address => uint256) public loverToRelationshipId;

    Relationship[] public relationships;

    struct Relationship {
        uint256 startedAt;
        address[2] couple;
        bool established;
        uint256 NFTPadlock;
        uint256 NFTFraction;
        uint256 initialFee;
        Vault vault;
        BreakUp breakup;
    }

    struct BreakUp {
        address initiator;
        address approver;
        uint256 timestamp; // need this for keep3r
    }

    function requireNotInRelationship(address _firstHalf, address _secondHalf) private view {
        require(!inRelationship[_firstHalf], "User already in relationship");
        require(!inRelationship[_secondHalf], "User already in relationship");
    }

    function requireInterestedInRelationship(
        address _firstHalf,
        address _secondHalf,
        address _sender
    ) private pure {
        require(_firstHalf == _sender || _secondHalf == _sender, "msg.sender is not in proposed relationship");
    }

    function requireRelationshipFee(address _lover, uint256 _relationshipFee) private view {
        require(_relationshipFee >= minimalFee, "relationshipFee too low");
        require(weth.allowance(_lover, address(this)) >= _relationshipFee, "Approval to low");
    }

    constructor(
        address _keeper,
        IERC20 _weth,
        uint256 _minimalFee,
        IPoolAddressesProvider _poolAddressProvider,
        AaveProtocolDataProvider _poolDataProvider,
        IRewardsController _rewards
    ) {
        keeper = _keeper;
        weth = _weth;
        minimalFee = _minimalFee;
        poolAddressProvider = _poolAddressProvider;
        vaultFactory = new VaultFactory(address(this), _weth, _poolAddressProvider, _poolDataProvider, _rewards);
        erc1155 = new ERC1155NFT("someURI");
        erc721 = new ERC721NFT("LovePadlock", "LPL");
    }

    function proposeRelationship(address _secondHalf, uint256 _relationshipFee) external {
        requireNotInRelationship(msg.sender, _secondHalf);
        requireRelationshipFee(msg.sender, _relationshipFee);

        relationships.push(
            Relationship({
                startedAt: block.timestamp,
                couple: [msg.sender, _secondHalf],
                established: false,
                NFTPadlock: 0,
                NFTFraction: 0,
                initialFee: _relationshipFee,
                vault: Vault(address(0)),
                breakup: BreakUp({ initiator: address(0), approver: address(0), timestamp: 0 })
            })
        );

        emit RelationshipProposed(relationships.length - 1, msg.sender, _secondHalf);
    }

    function approveRelationship(uint256 _relationshipId) external {
        Relationship storage relationship = relationships[_relationshipId];

        (address firstHalf, address secondHalf, uint256 initialFee) = (
            relationship.couple[0],
            relationship.couple[1],
            relationship.initialFee
        );

        requireNotInRelationship(firstHalf, secondHalf);
        requireInterestedInRelationship(firstHalf, secondHalf, msg.sender);
        requireRelationshipFee(firstHalf, initialFee);
        requireRelationshipFee(secondHalf, initialFee);

        Vault vault = setUpVault(firstHalf, secondHalf, initialFee);

        relationship.vault = vault;
        relationship.established = true;

        loverToRelationshipId[firstHalf] = _relationshipId;
        loverToRelationshipId[secondHalf] = _relationshipId;

        inRelationship[firstHalf] = true;
        inRelationship[secondHalf] = true;

        mintNFTs(_relationshipId, [firstHalf, secondHalf]);

        emit RelationshipApproved(_relationshipId, firstHalf, secondHalf);
    }

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

    function proposeBreakUp() external {
        require(inRelationship[msg.sender], "Sorry must be in relationship first");
        require(erc1155.isApprovedForAll(msg.sender, address(this)), "Must approve FractionNFT");

        Relationship storage relationship = relationships[loverToRelationshipId[msg.sender]];
        erc1155.safeTransferFrom(msg.sender, address(this), relationship.NFTFraction, 1, "");

        (relationship.breakup.initiator, relationship.breakup.approver) = msg.sender == relationship.couple[0] ? (relationship.couple[0], relationship.couple[1]) : (relationship.couple[1], relationship.couple[0]);

        relationship.breakup.timestamp = block.timestamp;

        emit BreakupProposal(loverToRelationshipId[msg.sender], msg.sender);
    }

    function approveBreakUp() external {
        Relationship storage relationship = relationships[loverToRelationshipId[msg.sender]];
        require(relationship.breakup.approver == msg.sender, "No breakup proposed");
        require(erc1155.isApprovedForAll(msg.sender, address(this)), "Must approve FractionNFT");

        relationship.breakup.timestamp = block.timestamp;

        erc1155.safeTransferFrom(msg.sender, address(this), relationship.NFTFraction, 1, "");
        erc1155.burn(relationship.NFTFraction);
        erc721.burn(relationship.NFTPadlock);

        uint256 deposit = relationship.vault.withdraw();

        weth.transfer(relationship.couple[0], deposit / 2);
        weth.transfer(relationship.couple[1], deposit / 2);

        emit BreakupApproved(loverToRelationshipId[msg.sender], relationship.breakup.initiator, msg.sender);
    }

    function slashBrakeUp(uint256 _relationshipId) external {
        Relationship storage relationship = relationships[_relationshipId];

        require(relationship.breakup.approver == msg.sender, "No breakup proposed");
        require(relationship.breakup.timestamp + 1 weeks > block.timestamp);

        erc1155.safeTransferFrom(msg.sender, address(this), relationship.NFTFraction, 1, "");
        erc1155.burn(relationship.NFTFraction);
        erc721.burn(relationship.NFTPadlock);

        uint256 deposit = relationship.vault.withdraw();

        weth.transfer(relationship.breakup.approver, (deposit * 55) / 100);
        weth.transfer(relationship.breakup.initiator, (deposit * 40) / 100);

        for (uint56 i; i < relationships.length; i++) {
            weth.transfer(address(relationships[i].vault), (deposit * 5) / 100 / relationships.length);
        }
    }

    function mintNFTs(uint256 _relationshipId, address[2] memory couple) internal {
        uint256 padlockNFT = erc721.mint("basic PADLOCK URI");
        uint256 tokenId = erc1155.mint();

        erc1155.safeTransferFrom(address(this), couple[0], tokenId, 1, "");
        erc1155.safeTransferFrom(address(this), couple[1], tokenId, 1, "");

        relationships[_relationshipId].NFTPadlock = padlockNFT;
        relationships[_relationshipId].NFTFraction = tokenId;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }

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
