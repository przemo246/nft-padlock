// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract ERC721NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;

    address public owner;
    event Mint(uint256 tokenId, string tokenURI);

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    /// @notice creates a NFT
    /// @param tokenURI tokenURI for the NFT
    function mint(
        string memory tokenURI
    ) public returns (uint256) {
        require(msg.sender == owner,
            "Sender doesnt have permission to mint"
        );

        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit Mint(tokenId, tokenURI);
        return tokenId;
    }
}