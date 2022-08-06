exports.numberOnly = (element) => {
  var regex = /[^0-9]/gi;
  element.target.value = element.target.value.replace(regex, "");
};

exports.showSuccessAlert = (text) => {
  setTimeout(() => {
    var success = document.getElementById("alert-success");
    var successMessage = document.getElementById("alert-success-msg");

    success.classList.remove("d-none");
    successMessage.innerText = text;
    setTimeout(() => {
      success.classList.add("d-none");
    }, 5000);
  }, 0);
};
exports.showErrorAlert = (text) => {
  setTimeout(() => {
    var failure = document.getElementById("alert-failure");
    var failureMessage = document.getElementById("alert-failure-msg");

    failure.classList.remove("d-none");
    failureMessage.innerText = text;
    setTimeout(() => {
      failure.classList.add("d-none");
    }, 5000);
  }, 0);
};
exports.showLoading = () => {
  document.getElementById("loading-icon").classList.remove("d-none");
  document.getElementById("page").classList.add("blur");
};
exports.hideLoading = () => {
  document.getElementById("loading-icon").classList.add("d-none");
  document.getElementById("page").classList.remove("blur");
};

exports.runContractFunction = async (Moralis, params, functn) => {
  console.log("running contract func");
  let options = {
    contractAddress: "0xA863e97B493615d6ca2DE3B138a94885589A430B",
    functionName: functn,
    abi: [
      { inputs: [], name: "Incorrect__ContainerId", type: "error" },
      { inputs: [], name: "Incorrect__WarehouseId", type: "error" },
      { inputs: [], name: "Not__AnEmployee", type: "error" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "barnID",
            type: "uint256",
          },
        ],
        name: "BarnCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "barnID",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "batchID",
            type: "uint256",
          },
        ],
        name: "Batched",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "DistributorAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "DistributorRemoved",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "EmployeeAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "EmployeeRemoved",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "warehouseID",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "containerID",
            type: "uint256",
          },
        ],
        name: "InWarehouse",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "barnID",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "batchID",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "containerID",
            type: "uint256",
          },
        ],
        name: "Incontainer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "RetailerAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "RetailerRemoved",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "oldOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "TransferOwnership",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "distributor",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "containerID",
            type: "uint256",
          },
        ],
        name: "WithDistributor",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "retailer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "containerID",
            type: "uint256",
          },
        ],
        name: "assignedRetailer",
        type: "event",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "addDistributor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "addEmployee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "addRetailer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_containerID", type: "uint256" },
          { internalType: "address", name: "_retailer", type: "address" },
        ],
        name: "assignRetailer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_farmEmp", type: "address" },
          { internalType: "string", name: "_farmName", type: "string" },
          { internalType: "string", name: "_farmLatitude", type: "string" },
          { internalType: "string", name: "_farmLongitude", type: "string" },
        ],
        name: "createBarn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_barnID", type: "uint256" },
          { internalType: "string", name: "_mfgD", type: "string" },
          { internalType: "string", name: "_expiry", type: "string" },
          { internalType: "uint256", name: "_mrp", type: "uint256" },
          { internalType: "uint256", name: "_nosOfProducts", type: "uint256" },
        ],
        name: "createBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_containerID", type: "uint256" },
        ],
        name: "createOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllDistributor",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllEmployess",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getBarnLength",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getBarnsArray",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "barnID", type: "uint256" },
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "address", name: "farmEmp", type: "address" },
              { internalType: "string", name: "farmName", type: "string" },
              { internalType: "string", name: "farmLatitude", type: "string" },
              { internalType: "string", name: "farmLongitude", type: "string" },
              {
                internalType: "enum SupplyChain.State",
                name: "batchState",
                type: "uint8",
              },
              { internalType: "uint256", name: "temperature", type: "uint256" },
              { internalType: "uint256", name: "humidity", type: "uint256" },
              { internalType: "uint256", name: "airQuality", type: "uint256" },
              { internalType: "uint256", name: "createdAt", type: "uint256" },
            ],
            internalType: "struct SupplyChain.Barn[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getBatchesArray",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "barnID", type: "uint256" },
              { internalType: "uint256", name: "batchID", type: "uint256" },
              {
                internalType: "enum SupplyChain.State",
                name: "batchState",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "nosOfProducts",
                type: "uint256",
              },
              { internalType: "uint256", name: "createdAt", type: "uint256" },
            ],
            internalType: "struct SupplyChain.Batch[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getBatchesLength",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getContainerArrayLength",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getContainersArray",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "barnID", type: "uint256" },
              { internalType: "uint256", name: "batchID", type: "uint256" },
              { internalType: "uint256", name: "containerID", type: "uint256" },
              { internalType: "uint256", name: "wareHouseID", type: "uint256" },
              { internalType: "uint256", name: "temperature", type: "uint256" },
              { internalType: "uint256", name: "humidity", type: "uint256" },
              { internalType: "uint256", name: "airQuality", type: "uint256" },
              { internalType: "address", name: "distributor", type: "address" },
              { internalType: "address", name: "retailer", type: "address" },
              {
                internalType: "enum SupplyChain.State",
                name: "batchState",
                type: "uint8",
              },
              { internalType: "uint256", name: "createdAt", type: "uint256" },
              {
                internalType: "uint256",
                name: "orderReceievedAt",
                type: "uint256",
              },
            ],
            internalType: "struct SupplyChain.Container[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getOwner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getRetailers",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getWarehouseArray",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "warehouseID", type: "uint256" },
              { internalType: "uint256", name: "c_id", type: "uint256" },
              { internalType: "bool", name: "isDispatched", type: "bool" },
              { internalType: "uint256", name: "createdAt", type: "uint256" },
            ],
            internalType: "struct SupplyChain.Warehouse[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getWarehouseId",
        outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_barnID", type: "uint256" },
          { internalType: "uint256", name: "_batchID", type: "uint256" },
          { internalType: "uint256", name: "_wareHouseID", type: "uint256" },
        ],
        name: "inContainer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "isDistributor",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "isEmployee",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "isRetailer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "removeDistributor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "removeEmployee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "removeRetailer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    params: params,
  };
  return await Moralis.executeFunction(options);
};
