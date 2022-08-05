// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

library Roles {
    struct Role {
        mapping(address => bool) bearer;
    }

    function addRole(Role storage role, address account) internal {
        require(account != address(0), "Not a valid address");
        require(!hasRole(role, account), "verify account does not have this role");

        role.bearer[account] = true;
    }

    function removeRole(Role storage role, address account) internal {
        require(account != address(0), "Not a valid address");
        require(!hasRole(role, account), "verify account does not have this role");
        role.bearer[account] = false;
    }

    function hasRole(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Account is not verified");
        return role.bearer[account];
    }
}
