// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Roles.sol";
import "../farmowner/Ownable.sol";

contract FarmerSupplierRole is Ownable {
    using Roles for Roles.Role;

    /*events*/
    event SupplierAdded(address indexed account);
    event SupplierRemoved(address indexed account);

    Roles.Role private suppliers;

    modifier onlySupplier() {
        require(isSupplier(msg.sender), "Caller is not a Supplier");
        _;
    }

    function isSupplier(address account) public view returns (bool) {
        return suppliers.hasRole(account);
    }

    function addSupplier(address account) public onlyOwner {
        _addSupplier(account);
    }

    function _addSupplier(address account) internal {
        suppliers.addRole(account);
        emit SupplierAdded(account);
    }

    function removeSupplier(address account) public onlyOwner {
        _removeSupplier(account);
    }

    function _removeSupplier(address account) internal {
        suppliers.removeRole(account);
        emit SupplierRemoved(account);
    }
}
