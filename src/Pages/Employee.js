import React, { useEffect, useState } from "react";
import {
  showErrorAlert,
  showSuccessAlert,
  runContractFunction,
} from "../utils";
import { useMoralis } from "react-moralis";

export default function Employee() {
  const { Moralis } = useMoralis();

  const [action, setaction] = useState("");
  const [batches, setbatches] = useState([
    { batchID: "x", qty: 1, dateCreated: new Date().toDateString() },
    { batchID: "x", qty: 1, dateCreated: new Date().toDateString() },
    { batchID: "x", qty: 1, dateCreated: new Date().toDateString() },
  ]);

  const getBatches = async () => {
    var res = await runContractFunction(Moralis, {}, "getBatchesLength");
  };
  useEffect(() => {
    getBatches();
  }, ["input"]);
  return (
    <div>
      {JSON.stringify(batches)}
      <div className="row m-0 p-0">
        <div className="col-3 px-2">
          <div className="rounded bg-dark p-4">
            <h1>Employee</h1>

            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("BN");
              }}
            >
              Batch
            </div>
            <div
              className="my-2 py-2 "
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("CN");
              }}
            >
              Container
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
            {action === "BN" && (
              <div className="">
                <div className="row m-0 p-0 align-items-center">
                  <div className="col m-0 p-0">
                    <h1>Batch Management</h1>
                  </div>
                  <div className="col-2 text-end">
                    <span
                      onClick={(e) => {
                        document
                          .getElementById("addBatch")
                          .classList.remove("d-none");
                        document
                          .getElementById("viewBatch")
                          .classList.add("d-none");
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
                    <div id="addBatch" className="d-none">
                      <label for="to-address" class="form-label">
                        Barn
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="barn-id"
                        />
                      </div>
                      <label for="to-address" class="form-label">
                        Quantity
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="batch-qty"
                        />
                      </div>
                      <div className="text-end">
                        <div
                          className="btn grad-btn"
                          onClick={async (e) => {
                            let toAddress = document.getElementById("barn-id");
                            if (!toAddress.value) {
                              showErrorAlert("Please select a Barn.");
                              return;
                            }
                            let qty = document.getElementById("batch-qty");

                            if (!qty.value) {
                              showErrorAlert("Please enter the quantity.");
                              return;
                            }
                            var res = await runContractFunction(
                              Moralis,
                              {
                                _barnID: toAddress.value,
                              },
                              "createBatch"
                            );
                            if (res.hash) {
                              showSuccessAlert("Batch Created Successfully");
                              document
                                .getElementById("addBatch")
                                .classList.add("d-none");
                              document
                                .getElementById("viewBatch")
                                .classList.remove("d-none");
                              toAddress.value = "";
                              qty.value = "";
                              getBatches()
                            } else {
                              showErrorAlert("Some error occured...");
                            }
                          }}
                        >
                          CREATE
                        </div>
                      </div>
                    </div>
                    <div id="viewBatch" className="">
                      <table class="table table-dark">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Date Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batches.map((btch) => {
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
          </div>
        </div>
      </div>
    </div>
  );
}
