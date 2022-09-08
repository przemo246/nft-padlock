// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import { IWETH } from "./interfaces/IWETH.sol";
import { ERC1155NFT} from "./nfts/ERC1155NFT.sol";
import { ERC721NFT} from "./nfts/ERC721NFT.sol";
import { AaveManager }  from "./AaveManger.sol";

import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

contract PadLock {

    event RelationshipProposed(uint indexed relationshipId, address indexed lover1, address indexed lover2);
    event RelationshipApproved(uint indexed relationshipId, address indexed lover1, address indexed lover2);

    address public keeper;
    IWETH public weth;
    uint256 minimalFee;
    AaveManager aaveManager;
    ERC1155NFT public erc1155;
    ERC721NFT public erc721;

    mapping(address => bool) public inRelationship;
    mapping(address => uint) public loverToRelationshipId;

    Relationship[] public relationships;

    struct Relationship {
        uint startedAt;
        address[2] couple;
        bool established;
        uint NFTPadlock;
        uint NFTFraction;
        uint initialFee;
        uint balance;
    }

    function requireNotInRelationship(address _firstHalf, address _secondHalf) private view {
        require(!inRelationship[_firstHalf], "User already in relationship");
        require(!inRelationship[_secondHalf], "User already in relationship");
    }

    function requireInterestedInRelationship(address _firstHalf, address _secondHalf, address _sender) private pure {
        require(_firstHalf == _sender || _secondHalf == _sender, "msg.sender is not in proposed relationship");
    }

    function requireRelationshipFee(address _firstHalf, address _secondHalf, uint _relationshipFee) private view {
        require(_relationshipFee >= minimalFee, "relationshipFee too low");
        require(weth.allowance(_firstHalf, address(this)) >= _relationshipFee, "Approval to low");
        require(weth.allowance(_secondHalf, address(this)) >= _relationshipFee, "Approval to low");
    }

    constructor(
        address _keeper,
        IWETH _weth,
        uint256 _minimalFee,
        AaveManager _aaveManager
    ){
        keeper = _keeper;
        weth = _weth;
        minimalFee = _minimalFee;
        aaveManager = _aaveManager;
        erc1155 = new ERC1155NFT('someURI');
        erc721 = new ERC721NFT("LovePadlock","LPL");
    }
    
    function proposeRelationship(address _secondHalf, uint _relationshipFee) 
        external {

        requireNotInRelationship(msg.sender, _secondHalf);

        relationships.push(Relationship({
            startedAt: block.timestamp,
            couple: [msg.sender, _secondHalf],
            established: false,
            NFTPadlock: 0,
            NFTFraction: 0,
            initialFee: _relationshipFee,
            balance: 0
        }));

        emit RelationshipProposed(relationships.length - 1, msg.sender, _secondHalf);
    }

    function approveRelationship(uint _relationshipId) 
        external {
        
        Relationship storage relationship = relationships[_relationshipId];

        (address firstHalf, address secondHalf, uint256 initialFee) = (relationship.couple[0], relationship.couple[1], relationship.initialFee);

        requireNotInRelationship(firstHalf, secondHalf);
        requireInterestedInRelationship(firstHalf, secondHalf, msg.sender);
        requireRelationshipFee(firstHalf, secondHalf, initialFee);

        pullCoupleFee(firstHalf, secondHalf, initialFee);

        relationship.balance = initialFee * 2;
        relationship.established = true;
        
        loverToRelationshipId[firstHalf] = _relationshipId;
        loverToRelationshipId[secondHalf] = _relationshipId;

        mintNFTs(_relationshipId, [firstHalf, secondHalf]);

        emit RelationshipApproved(_relationshipId, firstHalf, secondHalf);
    }

    function pullCoupleFee(address _firstHalf, address _secondHalf, uint256 _fee) internal {
        weth.transferFrom(_firstHalf, address(aaveManager), _fee);
        weth.transferFrom(_secondHalf, address(aaveManager), _fee);

        weth.transfer(address(aaveManager), _fee * 2);

        aaveManager.depositCoupleFee(_fee * 2);
    }

    function mintNFTs(uint _relationshipId, address[2] memory couple) internal {
        uint padlockNFT = erc721.mint("basic PADLOCK URI");
        uint tokenId = erc1155.mint();

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