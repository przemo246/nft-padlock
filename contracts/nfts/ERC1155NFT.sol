// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155NFT is Ownable, ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;

    event Mint(uint256 indexed tokenId);
    event Burn(uint256 indexed tokenId);

    constructor(
        string memory _uri
    ) ERC1155(_uri) {
        
    }
    function mint() public onlyOwner returns(uint256){
        uint256 id = _tokenIds.current();
        _tokenIds.increment();
        _mint(owner(), id, 2, "");
        emit Mint(id);
        return id;
    }

    function burn(
        uint256 id
    ) public onlyOwner {
        _burn(msg.sender, id, 2);
        emit Burn(id);
    }
}