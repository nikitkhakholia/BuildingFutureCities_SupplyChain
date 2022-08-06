exports.numberOnly = (element) => {
  var regex = /[^0-9]/gi;
  element.target.value = element.target.value.replace(regex, "");
};

exports.showSuccessAlert = (text) => {
  var success = document.getElementById("alert-success");
  var successMessage = document.getElementById("alert-success-msg");

  success.classList.remove("d-none");
  successMessage.innerText = text;
  setTimeout(() => {
    success.classList.add("d-none");
  }, 5000);
};
exports.showErrorAlert = (text) => {
  var failure = document.getElementById("alert-failure");
  var failureMessage = document.getElementById("alert-failure-msg");

  failure.classList.remove("d-none");
  failureMessage.innerText = text;
  setTimeout(() => {
    failure.classList.add("d-none");
  }, 5000);
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
    contractAddress: "0x9a7a72D25C5cEFb624Ab075F2700961B55d833dF",
    functionName: functn,
    abi: [
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
            name: "account",
            type: "address",
          },
        ],
        name: "SupplierAdded",
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
        name: "SupplierRemoved",
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
        name: "WithDistributor",
        type: "event",
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
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "addSupplier",
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
        inputs: [{ internalType: "uint256", name: "_barnID", type: "uint256" }],
        name: "createBatch",
        outputs: [],
        stateMutability: "nonpayable",
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
        name: "getOwner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_barnID", type: "uint256" },
          { internalType: "uint256", name: "_batchID", type: "uint256" },
        ],
        name: "inContainer",
        outputs: [],
        stateMutability: "nonpayable",
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
        name: "isSupplier",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
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
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "removeSupplier",
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
