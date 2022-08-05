// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ownable {
    /*state variables */
    address private s_owner;

    /*events*/
    event TransferOwnership(address indexed oldOwner, address indexed newOwner);

    constructor() {
        s_owner = msg.sender;
        emit TransferOwnership(address(0), s_owner);
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner, "Only contract owner can call this function");
        _;
    }

    function getOwner() public view returns (address) {
        return s_owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Only owner can call this function");
        s_owner = newOwner;
        emit TransferOwnership(s_owner, newOwner);
    }
}
