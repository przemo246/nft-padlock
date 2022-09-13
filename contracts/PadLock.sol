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

contract PadLock {
    event RelationshipProposed(bytes20 indexed relationshipId, address indexed firstHalf, address indexed secondHalf);
    event RelationshipApproved(bytes20 indexed relationshipId, address indexed firstHalf, address indexed secondHalf);

    event BreakupProposal(bytes20 indexed relationshipId, address initiator);
    event BreakupApproved(bytes20 indexed relationshipId, address indexed initiator, address indexed approver);

    // event Anniversary(bytes20 indexed relationshipId, uint8 anniversary);

    event RelationshipEvent(
        string relationshipMemo,
        string ipfsURI,
        address indexed lover,
        bytes20 indexed relationshipId
    );
    
    IERC20 public immutable weth;
    uint256 public minimalFee;
    VaultFactory public immutable vaultFactory;
    ERC1155NFT public erc1155;
    ERC721NFT public erc721;
    IPoolAddressesProvider immutable poolAddressProvider;

    mapping(address => bytes20) public loverToRelationshipId;
    mapping(bytes20 => Relationship) public idToRelationship;
    mapping(bytes20 => uint256) public relationshipIdToIndex;

    bytes20[] public relationshipIds;

    struct Relationship {
        uint256 startedAt;
        address firstHalf;
        address secondHalf;
        bool established;
        uint256 NFTPadlock;
        uint256 NFTFraction;
        uint256 initialFee;
        Vault vault;
        BreakUp breakup;
    }

    struct BreakUp {
        address initiator;
        uint256 timestamp; // need this for keep3r
    }

    function requireNotInRelationship(address _firstHalf, address _secondHalf) private view {
        require(loverToRelationshipId[_firstHalf] == bytes20(0), "User already in relationship");
        require(loverToRelationshipId[_secondHalf]== bytes20(0), "User already in relationship");
    }

    function requireInRelationship(address _lover) private view {
        require(loverToRelationshipId[_lover] != bytes20(0), "User not in relationship");
    }

    function requireBreakUpPropse(Relationship memory _relationship) private pure {
        require(_relationship.breakup.initiator != address(0), "No breakup proposed");
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
        IERC20 _weth,
        uint256 _minimalFee,
        IPoolAddressesProvider _poolAddressProvider,
        IRewardsController _rewards
    ) {
        weth = _weth;
        minimalFee = _minimalFee;
        poolAddressProvider = _poolAddressProvider;
        vaultFactory = new VaultFactory(address(this), _weth, _poolAddressProvider, _rewards);
        erc1155 = new ERC1155NFT("someURI");
        erc721 = new ERC721NFT("LovePadlock", "LPL");
    }

    function proposeRelationship(address _secondHalf, uint256 _relationshipFee) external {
        requireNotInRelationship(msg.sender, _secondHalf);
        requireRelationshipFee(msg.sender, _relationshipFee);

        bytes20 id = bytes20(keccak256(abi.encodePacked(msg.sender, _secondHalf)));
        
        relationshipIdToIndex[id] = relationshipIds.length;
        relationshipIds.push(id);

        idToRelationship[id] = Relationship({
                startedAt: block.timestamp,
                firstHalf: msg.sender,
                secondHalf: _secondHalf,
                established: false,
                NFTPadlock: 0,
                NFTFraction: 0,
                initialFee: _relationshipFee,
                vault: Vault(address(0)),
                breakup: BreakUp({ initiator: address(0), timestamp: 0 })
        });

        emit RelationshipProposed(id, msg.sender, _secondHalf);
    }

    function approveRelationship(bytes20 _relationshipId) external {
        Relationship storage relationship = idToRelationship[_relationshipId];

        (address firstHalf, address secondHalf, uint256 initialFee) = (
            relationship.firstHalf,
            relationship.secondHalf,
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
        Relationship storage relationship = idToRelationship[loverToRelationshipId[msg.sender]];

        requireInRelationship(msg.sender);
        require(relationship.breakup.initiator != msg.sender, "Already proposed");

        erc1155.safeTransferFrom(msg.sender, address(this), relationship.NFTFraction, 1, "");

        relationship.breakup.initiator = msg.sender;
        relationship.breakup.timestamp = block.timestamp;

        emit BreakupProposal(loverToRelationshipId[msg.sender], msg.sender);
    }

    function approveBreakUp() external {
        bytes20 relationshipId = loverToRelationshipId[msg.sender];
        Relationship storage relationship = idToRelationship[relationshipId];

        requireInRelationship(msg.sender);
        requireBreakUpPropse(relationship);

        erc1155.safeTransferFrom(msg.sender, address(this), relationship.NFTFraction, 1, "");
        erc1155.burn(relationship.NFTFraction);
        erc721.burn(relationship.NFTPadlock);

        relationship.breakup.timestamp = block.timestamp;

        uint256 deposit = relationship.vault.withdraw();

        weth.transfer(relationship.firstHalf, deposit / 2);
        weth.transfer(relationship.secondHalf, deposit / 2);

        delete idToRelationship[relationshipId];
        delete relationshipIds[relationshipIdToIndex[relationshipId]];
        delete loverToRelationshipId[msg.sender];
        delete loverToRelationshipId[getSecondLoverAddress()];
        delete relationshipIdToIndex[relationshipId];

        emit BreakupApproved(loverToRelationshipId[msg.sender], relationship.breakup.initiator, msg.sender);
    }

    function slashBrakeUp() external {
        bytes20 relationshipId = loverToRelationshipId[msg.sender];

        Relationship storage relationship = idToRelationship[relationshipId];

        requireInRelationship(msg.sender);
        requireBreakUpPropse(relationship);

        require(msg.sender == relationship.breakup.initiator, "Not an initiator");

        address exPartner = relationship.breakup.initiator != relationship.firstHalf
            ? relationship.firstHalf
            : relationship.secondHalf;

        erc1155.safeTransferFrom(exPartner, address(this), relationship.NFTFraction, 1, "");
        erc1155.burn(relationship.NFTFraction);
        erc721.burn(relationship.NFTPadlock);

        uint256 deposit = relationship.vault.withdraw();


        for (uint56 i; i < relationshipIds.length; i++) {
            bytes20 id = relationshipIds[i];
            if(id != bytes20(0)) {
                Vault vault = idToRelationship[id].vault;
                uint256 amount = (deposit * 5) / 100;
                weth.approve(address(vault), amount);
                vault.depositToAave(amount);
            }
        }

        deposit = weth.balanceOf(address(this));
        weth.transfer(exPartner, (deposit * 60) / 100);
        weth.transfer(relationship.breakup.initiator, (deposit * 40) / 100);

        delete idToRelationship[relationshipId];
        delete relationshipIds[relationshipIdToIndex[relationshipId]];
        delete loverToRelationshipId[msg.sender];
        delete loverToRelationshipId[getSecondLoverAddress()];
        delete relationshipIdToIndex[relationshipId];

    }

    function getSecondLoverAddress() internal view returns(address) {
        Relationship memory relationship = idToRelationship[loverToRelationshipId[msg.sender]];
        address secondHalf = msg.sender == relationship.secondHalf ? relationship.firstHalf : relationship.secondHalf;
        return secondHalf;
    }

    function addRelationshipEvent(string memory _relationshipMemo, string memory _ipfsURI) external {
        bytes20 id = loverToRelationshipId[msg.sender];
        requireInRelationship(msg.sender);
        emit RelationshipEvent(_relationshipMemo, _ipfsURI, msg.sender, id);
    }

    function mintNFTs(bytes20 _relationshipId, address[2] memory couple) internal {
        Relationship storage relationship = idToRelationship[_relationshipId];

        uint256 padlockNFT = erc721.mint("basic PADLOCK URI");
        uint256 tokenId = erc1155.mint();

        erc1155.safeTransferFrom(address(this), couple[0], tokenId, 1, "");
        erc1155.safeTransferFrom(address(this), couple[1], tokenId, 1, "");

        relationship.NFTPadlock = padlockNFT;
        relationship.NFTFraction = tokenId;
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
