// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract ERC721NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event Mint(uint256 tokenId, string tokenURI, string uuid);

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        _grantRole(MINTER_ROLE, _executor);
    }

    /// @notice creates a NFT
    /// @param tokenURI tokenURI for the NFT
    function mint(
        address to,
        string memory tokenURI,
        string memory uuid
    ) public returns (uint256) {
        require(
            hasRole(MINTER_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Sender doesnt have permission to mint"
        );
        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit Mint(tokenId, tokenURI, uuid);
        return tokenId;
    }

    function supportsInterface(bytes4 interfaceId) public view override(AccessControl, ERC721) returns (bool) {
        return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);
    }
}