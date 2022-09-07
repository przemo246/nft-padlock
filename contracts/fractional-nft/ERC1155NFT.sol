// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155NFT is Ownable, ERC1155 {
    string private extension;

    event Mint(uint256 indexed tokenId);
    event Burn(uint256 indexed tokenId);

    constructor(
        string memory _uri
    ) ERC1155(_uri) {
        
    }
    function mint(
        uint256 id
    ) public onlyOwner {
        _mint(owner(), id, 2, "");
        emit Mint(id);
    }

    function burn(
        uint256 id
    ) public onlyOwner {
        _burn(msg.sender, id, 2);
        emit Burn(id);
    }
}