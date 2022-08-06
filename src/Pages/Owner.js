import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  showErrorAlert,
  runContractFunction,
  showSuccessAlert,
} from "../utils";
// var HighCharts  = require("highcharts")

export default function Owner() {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const [action, setaction] = useState("");
  const [employees, setemployees] = useState([]);
  const [suppliers, setsuppliers] = useState([]);
  const [retailers, setretailers] = useState([]);
  const [barns, setbarns] = useState([]);
  const getEmployees = async () => {
    var employees = await runContractFunction(Moralis, {}, "getAllEmployess");
    console.log(employees);
    setemployees(employees);
  };
  const getSuppliers = async () => {
    var employees = await runContractFunction(Moralis, {}, "getAllDistributor");
    console.log(employees);
    setsuppliers(employees);
  };
  const getRetailers = async () => {
    var employees = await runContractFunction(Moralis, {}, "getRetailers");
    console.log(employees);
    setretailers(employees);
  };
  const getBarns = async () => {
    var employees = await runContractFunction(Moralis, {}, "getBarnsArray");
    console.log(employees);
    setbarns(employees);
  };
  const deleteSupplier = async (address) => {
    var employees = await runContractFunction(
      Moralis,
      { account: address },
      "removeDistributor"
    );
    console.log(employees);
    getSuppliers();
  };
  const deleteEmp = async (address) => {
    var employees = await runContractFunction(
      Moralis,
      { account: address },
      "removeEmployee"
    );
    console.log(employees);
    getEmployees();
  };
  const deleteRetl = async (address) => {
    var employees = await runContractFunction(
      Moralis,
      { account: address },
      "removeRetailer"
    );
    getRetailers();
  };
  window.onload = () => {
    getEmployees();
    getSuppliers();
    getRetailers();
    getBarns();
  };
  return (
    <div>
      <div className="row m-0 p-0">
        <div className="col-3 px-2">
          <div className="rounded bg-dark p-4">
            <h1>Owner</h1>
            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("TO");
              }}
            >
              Transfer Ownership
            </div>
            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("BN");
              }}
            >
              Barn
            </div>
            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("EP");
              }}
            >
              Employee
            </div>
            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("SP");
              }}
            >
              Distributor
            </div>
            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("RT");
              }}
            >
              Retailer
            </div>
          </div>
        </div>
        <div className="col-9 px-2">
          <div className="col-9 px-2 pt-2"></div>
          <div className="rounded bg-dark p-4">
            {!action && (
              <div className="text-center p-4">
                Please select an option from left.
              </div>
            )}
            {action === "TO" && (
              <div>
                <h1 className="mb-3">Transfer Ownership</h1>

                <label for="to-address" class="form-label">
                  ETH Address
                </label>
                <div class="input-group mb-3 ">
                  <input
                    type="text"
                    class="form-control bg-dark border-0 border-bottom text-light"
                    id="to-address"
                  />
                </div>
                <div className="text-end">
                  <div
                    className="btn grad-btn"
                    onClick={async (e) => {
                      let toAddress = document.getElementById("to-address");
                      if (!toAddress.value || toAddress.value.length != 42) {
                        showErrorAlert("Please enter a valid ETH address.");
                        return;
                      }
                      var res = await runContractFunction(
                        Moralis,
                        {
                          newOwner: toAddress.value,
                        },
                        "transferOwnership"
                      );
                      if (res.hash) {
                        showSuccessAlert("User Added Successfully");
                      } else {
                        showErrorAlert("Some error occured...");
                      }
                    }}
                  >
                    TRANSFER
                  </div>
                </div>
              </div>
            )}
            {action === "EP" && (
              <div>
                <div className="row m-0 p-0 align-items-center">
                  <div className="col m-0 p-0">
                    <h1>Employee Management</h1>
                  </div>
                  <div className="col-2 text-end">
                    <span
                      onClick={(e) => {
                        document
                          .getElementById("addemp")
                          .classList.remove("d-none");
                        document.getElementById("vemp").classList.add("d-none");
                      }}
                      style={{ cursor: "pointer" }}
                      class="card-hover-glow p-2 rounded-circle material-symbols-rounded "
                    >
                      add
                    </span>
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col m-0 p-0">
                    <div id="addemp" className="d-none">
                      <label for="to-address" class="form-label">
                        Employee ETH Address
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="ep-address"
                        />
                      </div>
                      <div className="text-end mb-3">
                        <div
                          className="btn grad-btn"
                          onClick={async (e) => {
                            //todo
                            let toAddress =
                              document.getElementById("ep-address");
                            if (
                              !toAddress.value ||
                              toAddress.value.length != 42
                            ) {
                              showErrorAlert(
                                "Please enter a valid ETH address."
                              );
                              return;
                            }

                            var res = await runContractFunction(
                              Moralis,
                              {
                                account: toAddress.value,
                              },
                              "addEmployee"
                            );
                            if (res.hash) {
                              showSuccessAlert("User Added Successfully");
                              document
                                .getElementById("addemp")
                                .classList.add("d-none");
                              document
                                .getElementById("vemp")
                                .classList.remove("d-none");
                            } else {
                              showErrorAlert("Some error occured...");
                              document
                                .getElementById("addemp")
                                .classList.add("d-none");
                              document
                                .getElementById("vemp")
                                .classList.remove("d-none");
                            }
                          }}
                        >
                          ADD
                        </div>
                      </div>
                    </div>
                    <div id="vemp" className="">
                      <table class="table table-dark table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.length==0 && <div>No Employees Created.</div>}
                          {employees.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">{btch.toString()}</th>
                                <td>
                                  <span
                                    class=" p-2 rounded-circle material-symbols-rounded "
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      deleteEmp(btch);
                                    }}
                                  >
                                    delete
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {action === "SP" && (
              <div>
                <div className="row m-0 p-0 align-items-center">
                  <div className="col m-0 p-0">
                    <h1>Distributor Management</h1>
                  </div>
                  <div className="col-2 text-end">
                    <span
                      onClick={(e) => {
                        document
                          .getElementById("asup")
                          .classList.remove("d-none");
                        document.getElementById("vsup").classList.add("d-none");
                      }}
                      style={{ cursor: "pointer" }}
                      class="card-hover-glow p-2 rounded-circle material-symbols-rounded "
                    >
                      add
                    </span>
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col m-0 p-0">
                    <div id="asup" className="d-none">
                      <label for="to-address" class="form-label">
                        Distributor ETH Address
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="sp-address"
                        />
                      </div>
                      <div className="text-end">
                        <div
                          className="btn grad-btn"
                          onClick={async (e) => {
                            let toAddress =
                              document.getElementById("sp-address");
                            if (
                              !toAddress.value ||
                              toAddress.value.length != 42
                            ) {
                              showErrorAlert(
                                "Please enter a valid ETH address."
                              );
                              return;
                            }
                            var res = await runContractFunction(
                              Moralis,
                              {
                                account: toAddress.value,
                              },
                              "addDistributor"
                            );
                            if (res.hash) {
                              showSuccessAlert("User Added Successfully");
                              document
                                .getElementById("asup")
                                .classList.add("d-none");
                              document
                                .getElementById("vsup")
                                .classList.remove("d-none");
                            } else {
                              showErrorAlert("Some error occured...");
                              document
                                .getElementById("asup")
                                .classList.add("d-none");
                              document
                                .getElementById("vsup")
                                .classList.remove("d-none");
                            }
                          }}
                        >
                          ADD
                        </div>
                      </div>
                    </div>
                    <div id="vsup" className="">
                      <table class="table table-dark table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            {/* <th scope="col">Qty</th> */}
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {suppliers.length==0 && <div>No Distributors Created.</div>}
                          {suppliers.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">{btch}</th>
                                <td>
                                  <span
                                    class=" p-2 rounded-circle material-symbols-rounded "
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      deleteSupplier(btch);
                                    }}
                                  >
                                    delete
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {action === "RT" && (
              <div>
                <div className="row m-0 p-0 align-items-center">
                  <div className="col m-0 p-0">
                    <h1>Retailer Management</h1>
                  </div>
                  <div className="col-2 text-end">
                    <span
                      onClick={(e) => {
                        document
                          .getElementById("art")
                          .classList.remove("d-none");
                        document.getElementById("vrt").classList.add("d-none");
                      }}
                      style={{ cursor: "pointer" }}
                      class="card-hover-glow p-2 rounded-circle material-symbols-rounded "
                    >
                      add
                    </span>
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col m-0 p-0">
                    <div id="art" className="d-none">
                      <label for="to-address" class="form-label">
                        Retailer ETH Address
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="rt-address"
                        />
                      </div>
                      <div className="text-end">
                        <div
                          className="btn grad-btn"
                          onClick={async (e) => {
                            let toAddress =
                              document.getElementById("rt-address");
                            if (
                              !toAddress.value ||
                              toAddress.value.length != 42
                            ) {
                              showErrorAlert(
                                "Please enter a valid ETH address."
                              );
                              return;
                            }
                            var res = await runContractFunction(
                              Moralis,
                              {
                                account: toAddress.value,
                              },
                              "addRetailer"
                            );
                            if (res.hash) {
                              showSuccessAlert("User Added Successfully");
                              document
                                .getElementById("art")
                                .classList.add("d-none");
                              document
                                .getElementById("vrt")
                                .classList.remove("d-none");
                            } else {
                              showErrorAlert("Some error occured...");
                              document
                                .getElementById("art")
                                .classList.add("d-none");
                              document
                                .getElementById("vrt")
                                .classList.remove("d-none");
                            }
                          }}
                        >
                          ADD
                        </div>
                      </div>
                    </div>
                    <div id="vrt" className="">
                      <table class="table table-dark table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {retailers.length==0 && <div>No Retailers Created.</div>}
                          {retailers.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">{btch}</th>
                                <td>
                                  <span
                                    class=" p-2 rounded-circle material-symbols-rounded "
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      deleteRetl(btch);
                                    }}
                                  >
                                    delete
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {action === "BN" && (
              <div>
                <div className="row m-0 p-0 align-items-center">
                  <div className="col m-0 p-0">
                    <h1>Barn Management</h1>
                  </div>
                  <div className="col-2 text-end">
                    <span
                      onClick={(e) => {
                        document
                          .getElementById("abn")
                          .classList.remove("d-none");
                        document.getElementById("vbn").classList.add("d-none");
                      }}
                      style={{ cursor: "pointer" }}
                      class="card-hover-glow p-2 rounded-circle material-symbols-rounded "
                    >
                      add
                    </span>
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col m-0 p-0">
                    <div id="abn" className="d-none">
                      <label for="to-address" class="form-label">
                        Barn Manager
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="emp-address"
                        />
                      </div>
                      <label for="to-address" class="form-label">
                        Farm Name
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="frm-name"
                        />
                      </div>
                      <label for="to-address" class="form-label">
                        Location
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="frm-loc"
                        />
                      </div>

                      <div className="text-end">
                        <div
                          className="btn grad-btn"
                          onClick={async (e) => {
                            let manEmp = document.getElementById("emp-address");
                            if (!manEmp.value || manEmp.value.length != 42) {
                              showErrorAlert("Please enter a Barn Manager");
                              manEmp.focus();
                              return;
                            }
                            let farmname = document.getElementById("frm-name");
                            if (farmname.value.length < 5) {
                              showErrorAlert("Please enter a valid Barn Name");
                              farmname.focus();
                              return;
                            }
                            let frmLoc = document.getElementById("frm-loc");
                            if (frmLoc.value.length < 5) {
                              showErrorAlert(
                                "Please enter a valid Barn Location"
                              );
                              frmLoc.focus();
                              return;
                            }
                            var res = await runContractFunction(
                              Moralis,
                              {
                                _farmEmp: manEmp.value,
                                _farmName: farmname.value,
                                _farmLatitude: frmLoc.value,
                                _farmLongitude: frmLoc.value,
                              },
                              "createBarn"
                            );
                            if (res.hash) {
                              document
                                .getElementById("abn")
                                .classList.add("d-none");
                              document
                                .getElementById("vbn")
                                .classList.remove("d-none");
                              showSuccessAlert("Barn Added Successfully");
                            } else {
                              showErrorAlert("Some error occured...");
                              document
                                .getElementById("abn")
                                .classList.add("d-none");
                              document
                                .getElementById("vbn")
                                .classList.remove("d-none");
                            }
                          }}
                        >
                          ADD
                        </div>
                      </div>
                    </div>
                    <div id="vbn" className="">
                      <table class="table table-dark table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Farm Name</th>
                            <th scope="col">Manager</th>
                            <th scope="col">Location</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {barns.length==0 && <div>No Barns Created.</div>}
                          {barns.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">
                                  {parseInt(btch.barnID.toString()) + 1}
                                </th>
                                <td>{btch.farmName}</td>
                                <td>{btch.farmEmp}</td>
                                <td>{btch.farmLatitude}</td>
                                <td>
                                  {btch.batchState === 0
                                    ? "FARMING"
                                    : btch.batchState === 1
                                    ? "BATCHED"
                                    : btch.batchState === 2
                                    ? "IN CONTAINER"
                                    : btch.batchState === 3
                                    ? "WITH DISTRIBUTOR"
                                    : btch.batchState === 4
                                    ? "WITHRETAILER"
                                    : "SOLD"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
