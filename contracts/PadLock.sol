// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import { IWETH } from "./interfaces/IWETH.sol";
import { ERC1155NFT} from "./nfts/ERC1155NFT.sol";
import { ERC721NFT} from "./nfts/ERC721NFT.sol";

contract PadLock {
    event RelationshipSubmitted(uint indexed relationshipId, address indexed lover1, address indexed lover2);
    event RelationshipApproved(uint indexed relationshipId, address indexed lover1, address indexed lover2);
    event BreakupProposal(uint indexed relationshipId, address breakupper);
    event Breakup(uint indexed relationshipId, address indexed lover1, address indexed lover2);

    uint public relationshipFee = 1 ether;

    address public keeper;
    IWETH public weth;
    ERC1155NFT public erc1155;
    ERC721NFT public erc721;

    mapping(address => bool) public inRelationship;
    mapping(address => uint) public coupleToRelationshipId;

    Relationship[] public relationships;

    struct Relationship {
        uint startedAt;
        address[2] couple;
        bool established;
        uint NFTPadlock;
        uint NFTFraction;
        BreakUp breakup;
    }

    struct BreakUp {
        bool lover1;
        bool lover2;
        uint256 timestamp;    // need this for keep3r 
    }
    

    modifier notInRelationship (address _secondHalf) {
        require(!inRelationship[msg.sender] && !inRelationship[_secondHalf], "Parties cannot be in relationship already");
        _;
    }

    modifier relationshipFeeAllowed () {
        require(weth.allowance(msg.sender, address(this)) >= relationshipFee, "Approval to low");
        _;
    }

    constructor(
        address _keeper,
        IWETH _weth
    ){
        keeper = _keeper;
        weth = _weth;
        erc1155 = new ERC1155NFT('someURI');
        erc721 = new ERC721NFT("LovePadlock","LPL");
    }
    
    function getRelationship(uint _relationshipId) public view returns(Relationship memory) {
        return relationships[_relationshipId];
    }

    function submitRelationship(address _secondHalf) external notInRelationship(_secondHalf) relationshipFeeAllowed{
        relationships.push(Relationship({
            startedAt: block.timestamp,
            couple: [msg.sender, _secondHalf],
            established: false,
            NFTPadlock: 0,
            NFTFraction: 0,
            breakup: BreakUp({lover1: false, lover2: false, timestamp: 0})
        }));
        emit RelationshipSubmitted(relationships.length - 1, msg.sender, _secondHalf);
    }

    function approveRelationship(uint _relationshipId) external relationshipFeeAllowed {
        address _secondHalf = relationships[_relationshipId].couple[0];
        _approveRelationship(_relationshipId, _secondHalf);
    }

    function _approveRelationship(uint _relationshipId, address _secondHalf) internal notInRelationship(_secondHalf) {
        require(relationships[_relationshipId].couple[1] == msg.sender, "not submitted as a lover");
        weth.transferFrom(_secondHalf, address(this), relationshipFee);
        weth.transferFrom(msg.sender, address(this), relationshipFee);
        relationships[_relationshipId].established = true;
        emit RelationshipApproved(_relationshipId, _secondHalf, msg.sender);
        coupleToRelationshipId[_secondHalf] = _relationshipId;
        coupleToRelationshipId[msg.sender] = _relationshipId;
        _mintNFTs(_relationshipId, [msg.sender, _secondHalf]);
        // handle aave deposit
    }

    function submitBreakUp() external {
        require(inRelationship[msg.sender], "Sorry must be in relationship first");
        require(erc1155.isApprovedForAll(msg.sender, address(this)), "Must approve FractionNFT");
        
        erc1155.safeTransferFrom(msg.sender, address(this), relationships[coupleToRelationshipId[msg.sender]].NFTFraction, 1, "");

        relationships[coupleToRelationshipId[msg.sender]].breakup.lover1 = true;
        relationships[coupleToRelationshipId[msg.sender]].breakup.timestamp = block.timestamp;
        emit BreakupProposal(coupleToRelationshipId[msg.sender], msg.sender);
    }

    function approveBreakUp() external {
        require(relationships[coupleToRelationshipId[msg.sender]].breakup.lover1, "No breakup submitted");
        require(erc1155.isApprovedForAll(msg.sender, address(this)), "Must approve FractionNFT");

        erc1155.safeTransferFrom(msg.sender, address(this), relationships[coupleToRelationshipId[msg.sender]].NFTFraction, 1, "");

        Relationship storage relationship = relationships[coupleToRelationshipId[msg.sender]]; 
        relationship.breakup.lover2 = true;
        relationship.breakup.timestamp = block.timestamp;

        address _breaker = relationship.couple[1] == msg.sender ? relationship.couple[0] : relationship.couple[1];
        emit Breakup(coupleToRelationshipId[msg.sender], _breaker, msg.sender);
        _breakup(coupleToRelationshipId[msg.sender]);
    }

    function _breakup(uint _relationshipId) internal {
        // withdraw from strat
        erc721.burn(relationships[_relationshipId].NFTPadlock);
    }

    function _mintNFTs(uint _relationshipId, address[2] memory couple) internal {
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