// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface IWETH {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;
    function approval(address from, address to) external view returns(uint);
}

contract PadLock {
    uint public relationshipFee = 1 ether;

    address public keeper;
    IWETH public weth;

    mapping(address => bool) public inRelationship;

    constructor(
        address _keeper,
        address _weth
    ){
        keeper = _keeper;
        weth = IWETH(_weth);
    }
    
    function submitRelationship(address _secondHalf) external {
        require(!inRelationship[msg.sender] && !inRelationship[_secondHalf], "Parties cannot be in relationship already");
        require(weth.approval(msg.sender, address(this)) >= relationshipFee, "Approval to low");
        
    }
}