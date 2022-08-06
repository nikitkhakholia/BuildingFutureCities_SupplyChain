import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  showErrorAlert,
  runContractFunction,
  showSuccessAlert,
} from "../utils";
var HighCharts  = require("highcharts")

export default function Owner() {
  const { Moralis } = useMoralis();
  const [action, setaction] = useState("");
  const [employees, setemployees] = useState([]);

  useEffect(e=>{
    HighCharts.chart('cont', {})
  })

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
              Supplier
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
            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("BN");
              }}
            >
              Barn
            </div>
          </div>
        </div>
        <div className="col-9 px-2">
          <div className="col-9 px-2 pt-2">
          </div>
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
                            } else {
                              showErrorAlert("Some error occured...");
                            }
                          }}
                        >
                          ADD
                        </div>
                      </div>
                    </div>
                    <div id="vemp" className="">
                      <table class="table table-dark">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">{btch.batchID}</th>
                                <td>{btch.qty}</td>
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
                    <h1>Supplier Management</h1>
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
                        Supplier ETH Address
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
                              "addSupplier"
                            );
                            if (res.hash) {
                              showSuccessAlert("User Added Successfully");
                            } else {
                              showErrorAlert("Some error occured...");
                            }
                          }}
                        >
                          ADD
                        </div>
                      </div>
                    </div>
                    <div id="vsup" className="">
                      <table class="table table-dark">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Date Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">{btch.batchID}</th>
                                <td>{btch.qty}</td>
                                <td>{btch.dateCreated}</td>
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
                            } else {
                              showErrorAlert("Some error occured...");
                            }
                          }}
                        >
                          ADD
                        </div>
                      </div>
                    </div>
                    <div id="vrt" className="">
                      <table class="table table-dark">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Date Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">{btch.batchID}</th>
                                <td>{btch.qty}</td>
                                <td>{btch.dateCreated}</td>
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
                              showSuccessAlert("Barn Added Successfully");
                            } else {
                              showErrorAlert("Some error occured...");
                            }
                          }}
                        >
                          ADD
                        </div>
                      </div>
                    </div>
                    <div id="vbn" className="">
                      <table class="table table-dark">
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
                          {employees.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">{btch.batchID}</th>
                                <td>{btch.qty}</td>
                                <td>{btch.dateCreated}</td>
                                <td>{btch.dateCreated}</td>
                                <td>{btch.dateCreated}</td>
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
