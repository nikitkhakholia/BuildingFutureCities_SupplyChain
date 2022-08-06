import React, { useEffect, useState } from "react";
import {
  showErrorAlert,
  showSuccessAlert,
  runContractFunction,
} from "../utils";
import { useMoralis } from "react-moralis";

export default function Employee() {
  const { Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();

  const [action, setaction] = useState("");
  const [batches, setbatches] = useState([]);
  const [container, setcontainer] = useState([]);

  const getBatches = async () => {
    var res = await runContractFunction(Moralis, {}, "getBatchesArray");
    console.log(res);
    setbatches(res);
  };

  const getCons = async () => {
    var res = await runContractFunction(Moralis, {}, "getContainersArray");
    console.log(res);
    setcontainer(res);
  };

  useEffect(() => {
    setTimeout(() => {
      getBatches();
      getCons();
    }, 5000);
  }, ["input"]);
  return (
    <div>
      <div className="row m-0 p-0">
        <div className="col-3 px-2">
          <div className="rounded bg-dark p-4">
            <h1>Employee</h1>

            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                getBatches();
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
                        MRP
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="mrp-id"
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
                            let mrp = document.getElementById("mrp-id");

                            if (!mrp.value) {
                              showErrorAlert("Please enter the MRP.");
                              return;
                            }
                            var res = await runContractFunction(
                              Moralis,
                              {
                                _barnID: toAddress.value,
                                _mfgD: new Date().getMilliseconds(),
                                _expiry: new Date().getMilliseconds(),
                                _expiry:
                                  new Date().getMilliseconds() + 604800000,
                                _mrp: mrp.value,
                                _nosOfProducts: qty.value,
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
                              getBatches();
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
                      <table class="table table-dark table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Barn ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">No of Packages</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batches.length==0 && <div>No Batches Created.</div>}
                          {batches.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">
                                  {parseInt(btch.batchID.toString()) + 1}
                                </th>
                                <td>{parseInt(btch.barnID.toString()) + 1}</td>
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
                                    ? "WITH RETAILER"
                                    : "SOLD"}
                                </td>
                                <td>{btch.nosOfProducts.toString()}</td>
                                {/* <td>{<td>{new Date(20000000000).toDateString()}</td>}</td> */}
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
            {action === "CN" && (
              <div className="">
                <div className="row m-0 p-0 align-items-center">
                  <div className="col m-0 p-0">
                    <h1>Container Management</h1>
                  </div>
                  <div className="col-2 text-end">
                    <span
                      onClick={(e) => {
                        document
                          .getElementById("acn")
                          .classList.remove("d-none");
                        document.getElementById("vcn").classList.add("d-none");
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
                    <div id="acn" className="d-none">
                      <label for="to-address" class="form-label">
                        Barn ID
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="barn-id2"
                        />
                      </div>
                      <label for="to-address" class="form-label">
                        Batch ID
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="batch-id2"
                        />
                      </div>
                      <label for="to-address" class="form-label">
                        Warehouse ID
                      </label>
                      <div class="input-group mb-3 ">
                        <input
                          type="text"
                          class="form-control bg-dark border-0 border-bottom text-light"
                          id="wh-id2"
                          placeholder="Available Warehouses - 1,2,3"
                        />
                      </div>
                      <div className="text-end">
                        <div
                          className="btn grad-btn"
                          onClick={async (e) => {
                            let toAddress = document.getElementById("barn-id2");
                            if (!toAddress.value) {
                              showErrorAlert("Please select a Barn.");
                              return;
                            }
                            let qty = document.getElementById("batch-id2");

                            if (!qty.value) {
                              showErrorAlert("Please enter the quantity.");
                              return;
                            }
                            let wh = document.getElementById("wh-id2");

                            if (!wh.value) {
                              showErrorAlert("Please enter the warehouse.");
                              return;
                            }
                            var res = await runContractFunction(
                              Moralis,
                              {
                                _barnID: toAddress.value,
                                _batchID: qty.value,
                                _wareHouseID: wh.value,
                              },
                              "inContainer"
                            );
                            if (res.hash) {
                              showSuccessAlert("Batch Created Successfully");
                              document
                                .getElementById("acn")
                                .classList.add("d-none");
                              document
                                .getElementById("vcn")
                                .classList.remove("d-none");
                              toAddress.value = "";
                              qty.value = "";
                            } else {
                              showErrorAlert("Some error occured...");
                            }
                          }}
                        >
                          CREATE
                        </div>
                      </div>
                    </div>
                    <div id="vcn" className="">
                      <table class="table table-dark table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Barn ID</th>
                            <th scope="col">Batch ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Distributor</th>
                            <th scope="col">Retailer</th>
                            <th scope="col">Warehouse</th>
                          </tr>
                        </thead>
                        <tbody>
                          {container.length==0 && <div>No Containers Created.</div>}
                          {container.map((btch) => {
                            return (
                              <tr>
                                <th scope="row">
                                  {parseInt(btch.containerID.toString()) + 1}
                                </th>
                                <td>{parseInt(btch.barnID.toString()) + 1}</td>
                                <td>{parseInt(btch.batchID.toString()) + 1}</td>
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
                                <td>
                                  {btch.distributor && !btch.distributor.endsWith("0000")
                                    ? ""+btch.distributor
                                    : "NA"}
                                </td>
                                <td>
                                  {btch.retailer && !btch.retailer.endsWith("0000")
                                    ? btch.retailer
                                    : "NA"}
                                </td>
                                <td>
                                  {parseInt(btch.wareHouseID)}
                                </td>
                                {/* <td>{<td>{new Date(20000000000).toDateString()}</td>}</td> */}
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
