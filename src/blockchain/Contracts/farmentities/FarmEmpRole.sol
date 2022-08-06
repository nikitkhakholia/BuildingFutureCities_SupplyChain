// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Roles.sol";
import "../farmowner/Ownable.sol";

contract FarmEmpRole is Ownable {
    using Roles for Roles.Role;

    /*events*/
    event EmployeeAdded(address indexed account);
    event EmployeeRemoved(address indexed account);

    /*State variables */
    Roles.Role private employees;
    address[] private allEmployees;

    modifier onlyEmployee() {
        require(isEmployee(msg.sender), "Caller is not a employeee");
        _;
    }

    function isEmployee(address account) public view returns (bool) {
        return employees.hasRole(account);
    }

    function addEmployee(address account) public onlyOwner {
        _addEmployee(account);
    }

    function _addEmployee(address account) internal {
        employees.addRole(account);
        emit EmployeeAdded(account);
    }

    function removeEmployee(address account) public onlyOwner {
        _removeEmployee(account);
    }

    function _removeEmployee(address account) internal {
        employees.removeRole(account);
        for (uint256 i = 0; i < allEmployees.length; i++) {
            if (allEmployees[i] == account) {
                allEmployees[i] = 0x0000000000000000000000000000000000000000;
            }
        }
        emit EmployeeRemoved(account);
    }

    function getAllEmployess() public view returns (address[] memory) {
        return allEmployees;
    }
}
