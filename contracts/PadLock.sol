// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

interface IWETH {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;
    function approve(address, uint) external view;
    function approval(address from, address to) external view returns(uint);
}

contract PadLock {
    event RelationshipSubmitted(uint indexed relationshipId, address indexed lover1, address indexed lover2);
    uint public relationshipFee = 1 ether;

    address public keeper;
    IWETH public weth;

    mapping(address => bool) public inRelationship;

    Relationship[] public relationships;

    struct Relationship {
        uint startedAt;
        address[2] couple;
        bool established;
    }

    modifier notInRelationship (address _secondHalf) {
        require(!inRelationship[msg.sender] && !inRelationship[_secondHalf], "Parties cannot be in relationship already");
        _;
    }

    constructor(
        address _keeper,
        address _weth
    ){
        keeper = _keeper;
        weth = IWETH(_weth);
    }
    
    function getRelationship(uint _relationshipId) public view returns(Relationship memory) {
        return relationships[_relationshipId];
    }

    function submitRelationship(address _secondHalf) external notInRelationship(_secondHalf){
        require(weth.approval(msg.sender, address(this)) >= relationshipFee, "Approval to low");
        relationships.push(Relationship({
            startedAt: block.timestamp,
            couple: [msg.sender, _secondHalf],
            established: false
        }));

        emit RelationshipSubmitted(relationships.length - 1, msg.sender, _secondHalf);
    }

    function approveRelationship(uint _relationshipId) external {
        address _secondHalf = relationships[_relationshipId].couple[0];
        _approveRelationship(_relationshipId, _secondHalf);
    }

    function _approveRelationship(uint _relationshipId, address _secondHalf) internal notInRelationship(_secondHalf) {
        require(relationships[_relationshipId].couple[1] == msg.sender, "not submitted as a lover");
        relationships[_relationshipId].established = true;
    }
}