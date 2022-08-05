import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { showErrorAlert, runContractFunction } from "../utils";
import { abi } from "../constants.js";

export default function Owner() {
  const { Moralis } = useMoralis();
  const [action, setaction] = useState("");

  return (
    <div>
      {JSON.stringify(address)}
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
          </div>
        </div>
        <div className="col-9 px-2">
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
                      console.log(JSON.stringify(res));
                    }}
                  >
                    TRANSFER
                  </div>
                </div>
              </div>
            )}
            {action === "EP" && (
              <div>
                <h1 className="mb-3">Add Employee</h1>

                <label for="to-address" class="form-label">
                  ETH Address
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
                      let toAddress = document.getElementById("ep-address");
                      if (!toAddress.value || toAddress.value.length != 42) {
                        showErrorAlert("Please enter a valid ETH address.");
                        return;
                      }

                      var res = await runContractFunction(
                        Moralis,
                        {
                          account: toAddress.value,
                        },
                        "addEmployee"
                      );
                      console.log(JSON.stringify(res));
                    }}
                  >
                    ADD
                  </div>
                </div>

                <h1>All Employees</h1>
                <div></div>
              </div>
            )}
            {action === "SP" && (
              <div>
                <h1 className="mb-3">Add Supplier</h1>

                <label for="to-address" class="form-label">
                  ETH Address
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
                      let toAddress = document.getElementById("sp-address");
                      if (!toAddress.value || toAddress.value.length != 42) {
                        showErrorAlert("Please enter a valid ETH address.");
                        return;
                      }
                      var res = await runContractFunction(
                        Moralis,
                        {
                          account: toAddress.value,
                        },
                        "addSupplier"
                      );
                      console.log(JSON.stringify(res));
                    }}
                  >
                    ADD
                  </div>
                </div>
              </div>
            )}
            {action === "RT" && (
              <div>
                <h1 className="mb-3">Add Retailer</h1>

                <label for="to-address" class="form-label">
                  ETH Address
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
                      let toAddress = document.getElementById("rt-address");
                      if (!toAddress.value || toAddress.value.length != 42) {
                        showErrorAlert("Please enter a valid ETH address.");
                        return;
                      }
                      var res = await runContractFunction(
                        Moralis,
                        {
                          account: toAddress.value,
                        },
                        "addRetailer"
                      );
                      console.log(JSON.stringify(res));
                    }}
                  >
                    ADD
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
