// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor() ERC20("WETH Mock", "WETHM") {
        _mint(msg.sender, 100_000 * 10**18);
    }
}