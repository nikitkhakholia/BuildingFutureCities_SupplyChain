// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Roles.sol";
import "../farmowner/Ownable.sol";

contract FarmDistributorRole is Ownable {
    using Roles for Roles.Role;

    /*events*/
    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);

    Roles.Role private distributors;
    address[] allDistributors;

    modifier onlyDistributor() {
        require(isDistributor(msg.sender), "Caller is not a Distributor");
        _;
    }

    function isDistributor(address account) public view returns (bool) {
        return distributors.hasRole(account);
    }

    function addDistributor(address account) public onlyOwner {
        _addDistributor(account);
    }

    function _addDistributor(address account) internal {
        distributors.addRole(account);
        allDistributors.push(account);
        emit DistributorAdded(account);
    }

    function removeDistributor(address account) public onlyOwner {
        _removeDistributor(account);
    }

    function _removeDistributor(address account) internal {
        distributors.removeRole(account);
        for (uint256 i = 0; i < allDistributors.length; i++) {
            if (allDistributors[i] == account) {
                allDistributors[i] = 0x0000000000000000000000000000000000000000;
            }
        }
        emit DistributorRemoved(account);
    }

    function getAllDistributor() public view returns (address[] memory) {
        return allDistributors;
    }
}
