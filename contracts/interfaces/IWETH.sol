// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IWETH {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function approve(address spender, uint256 amount) external view;
    function allowance(address owner, address spender) external view returns (uint256);
}
