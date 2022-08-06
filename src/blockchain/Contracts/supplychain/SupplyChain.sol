// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../farmentities/FarmEmpRole.sol";
import "../farmentities/FarmSupplierRole.sol";
import "../farmentities/FarmRetailerRole.sol";
import "../farmowner/Ownable.sol";

error Not__AnEmployee();

contract SupplyChain is FarmEmpRole, FarmerSupplierRole, FarmRetailerRole {
    /* Type declaartion */
    enum State {
        FARMING,
        BATCHED,
        INCONTAINER,
        WITHDISTRIBUTOR,
        WITHRETAILER,
        SOLD
    }

    /*State variables */
    uint256 private barnID = 0;
    uint256 private batchID = 0;
    uint256 private containerID = 0;
    uint256[] private allBarnIDS;
    uint256[] private allBatchIDS;
    uint256[] private allContainersIDS;
    Barn[] private barns;
    Batch[] private batches;
    Container[] private containers;

    struct Barn {
        uint256 barnID;
        address owner;
        address farmEmp;
        string farmName;
        string farmLatitude;
        string farmLongitude;
        State batchState;
        uint256 temperature;
        uint256 humidity;
        uint256 airQuality;
    }

    struct Batch {
        uint256 barnID;
        uint256 batchID;
        State batchState;
    }

    struct Container {
        uint256 barnID;
        uint256 batchID;
        uint256 containerID;
        uint256 temperature;
        uint256 humidity;
        uint256 airQuality;
        address distributor;
        address retailer;
        State batchState;
    }

    struct Product {
        uint256 barnID;
        uint256 batchID;
        uint256 containerID;
        string mfgDate;
        string expiryDate;
        uint256 mrp;
        State batchState;
    }

    /*Events*/
    event BarnCreated(uint256 indexed barnID);
    event Batched(uint256 indexed barnID, uint256 indexed batchID);
    event Incontainer(uint256 indexed barnID, uint256 indexed batchID, uint256 indexed containerID);
    event WithDistributor(
        address indexed distributor,
        uint256 indexed barnID,
        uint256 indexed batchID
    );

    //event Retailer(address indexed retailer, address indexed distributor, uint256 indexed batchID);

    // event Sold(
    //     address indexed buyer,
    //     address indexed distributor,
    //     uint256 indexed barnID,
    //     uint256 indexed batchID
    // );

    function createBarn(
        address _farmEmp,
        string memory _farmName,
        string memory _farmLatitude,
        string memory _farmLongitude
    ) public onlyOwner {
        if (isEmployee(_farmEmp)) {
            barns.push(
                Barn(
                    barnID,
                    msg.sender,
                    _farmEmp,
                    _farmName,
                    _farmLatitude,
                    _farmLongitude,
                    State.FARMING,
                    0,
                    0,
                    0
                )
            );

            emit BarnCreated(barnID);
            allBarnIDS.push(barnID);
            barnID++;
        } else {
            revert Not__AnEmployee();
        }
    }

    function getBarnLength() public view returns (uint256) {
        return barns.length;
    }

    function createBatch(uint256 _barnID) public onlyEmployee {
        require(allBarnIDS[_barnID] == _barnID, "BarnID doesnt exist");
        batches.push(Batch(_barnID, batchID, State.BATCHED));
        allBatchIDS.push(batchID);
        emit Batched(_barnID, batchID);
        barns[_barnID].batchState = State.BATCHED;
        batchID++;
    }

    function getBatchesLength() public view returns (uint256) {
        return batches.length;
    }

    function inContainer(uint256 _barnID, uint256 _batchID) public onlyEmployee {
        require(allBatchIDS[_batchID] == _batchID, "BatchID doesnt exist");
        containers.push(
            Container(
                _barnID,
                _batchID,
                containerID,
                0,
                0,
                0,
                0x0000000000000000000000000000000000000000,
                0x0000000000000000000000000000000000000000,
                State.INCONTAINER
            )
        );
        allContainersIDS.push(containerID);
        emit Incontainer(_barnID, _batchID, containerID);
        batches[_batchID].batchState = State.INCONTAINER;
        containerID++;
    }

    function getContainerArrayLength() public view returns (uint256) {
        return containers.length;
    }
}
