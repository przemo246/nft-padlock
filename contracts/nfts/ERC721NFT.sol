// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721NFT is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;

    event Mint(uint256 indexed tokenId, string tokenURI);
    event Burn(uint256 indexed tokenId);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit Mint(tokenId, tokenURI);
        return tokenId;
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
        emit Burn(tokenId);
    }

    /// @dev allow updates on anniversaries
    function updateTokenURI(uint256 tokenId, string memory tokenURI) public onlyOwner {
        _setTokenURI(tokenId, tokenURI);
    }
}
