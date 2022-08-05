// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Roles.sol";
import "../farmowner/Ownable.sol";

contract FarmRetailerRole is Ownable {
    using Roles for Roles.Role;

    /*events*/
    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);

    Roles.Role private retailers;

    modifier onlyRetailer() {
        require(isRetailer(msg.sender), "Caller is not a retailer");
        _;
    }

    function isRetailer(address account) public view returns (bool) {
        return retailers.hasRole(account);
    }

    function addRetailer(address account) public onlyOwner {
        _addRetailer(account);
    }

    function _addRetailer(address account) internal {
        retailers.addRole(account);
        emit RetailerAdded(account);
    }

    function removeRetailer(address account) public onlyOwner {
        _removeRetailer(account);
    }

    function _removeRetailer(address account) internal {
        retailers.removeRole(account);
        emit RetailerRemoved(account);
    }
}
