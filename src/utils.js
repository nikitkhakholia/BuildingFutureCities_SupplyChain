
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
  console.log('running contract func');
  let options = {
    contractAddress: "0x0C965c7f25ac6b01Eb52e5D304216eb5728990B7",
    functionName: functn,
    abi: [
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
        inputs: [],
        name: "getOwner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
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
