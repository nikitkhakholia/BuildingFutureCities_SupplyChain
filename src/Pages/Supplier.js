import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  showErrorAlert,
  runContractFunction,
  showSuccessAlert,
} from "../utils";
export default function Supplier() {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const [action, setaction] = useState("");
  const [warehouse, setwarehouse] = useState([]);
  const [containers, setcontainers] = useState([]);
  const getWarehouse = async () => {
    var employees = await runContractFunction(Moralis, {}, "getWarehouseArray");
    console.log(employees);
    setwarehouse(employees);
  };
  const getCons = async () => {
    var res = await runContractFunction(Moralis, {}, "getContainersArray");
    console.log(res);
    setcontainers(res);
  };
  useEffect(() => {
    setTimeout(() => {
      getWarehouse();
      getCons();
    }, 5000);
  }, []);
  return (
    <div>
      <div className="row m-0 p-0">
        <div className="col-3 px-2">
          <div className="rounded bg-dark p-4">
            <h1>Distributor</h1>
            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("PU");
              }}
            >
              Purchase
            </div>
            <div
              className="my-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setaction("SL");
              }}
            >
              Sell
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
            {action === "PU" && (
              <div>
                <h1 className="mb-3">Purchase</h1>

                <div className="row m-0 p-0">
                  {warehouse.length==0 && <div>No Containers Left.</div>}
                  {warehouse.map((cont) => {
                    return (
                      !cont.isDispatched && (
                        <div className="col-3 p-2">
                          <div
                            className="p-4 card_glow rounded "
                            style={{ cursor: "pointer" }}
                            onClick={async (e) => {
                              var employees = await runContractFunction(
                                Moralis,
                                { _containerID: cont.c_id.toString() },
                                "createOrder"
                              );
                              console.log(employees);
                            }}
                          >
                            <h5 className="">
                              <strong>
                                #{parseInt(cont.c_id.toString()) + 1}
                              </strong>
                            </h5>
                            <p>
                              {new Date(
                                parseInt(cont.createdAt.toString()) +
                                  1642664853302
                              ).toDateString()}
                            </p>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            )}
            {action === "SL" && (
              <div>
                <h1 className="mb-3">Containers</h1>

                <table class="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Barn ID</th>
                      <th scope="col">Batch ID</th>
                      <th scope="col">Status</th>
                      <th scope="col">Warehouse ID</th>
                      <th scope="col">Retailer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {containers.length==0 && <div>No Containers Bought.</div>}
                    {containers.map((conts) => {
                      return (
                        conts.distributor.toString().toUpperCase() ===
                          JSON.parse(localStorage.getItem("user"))
                            .ethAddress.toString()
                            .toUpperCase() && (
                          <tr>
                            <th scope="row">
                              {parseInt(conts.containerID.toString()) + 1}
                            </th>
                            <th scope="row">
                              {parseInt(conts.barnID.toString()) + 1}
                            </th>
                            <th scope="row">
                              {parseInt(conts.batchID.toString()) + 1}
                            </th>
                            <td scope="row">
                              {conts.batchState === 0
                                ? "FARMING"
                                : conts.batchState === 1
                                ? "BATCHED"
                                : conts.batchState === 2
                                ? "IN CONTAINER"
                                : conts.batchState === 3
                                ? "WITH DISTRIBUTOR"
                                : conts.batchState === 4
                                ? "WITHRETAILER"
                                : "SOLD"}
                            </td>
                            <td scope="row">{conts.wareHouseID.toString()}</td>
                            <td>
                              {!conts.retailer.toString().endsWith("0000") ? (
                                conts.retailer.toString()
                              ) : (
                                <input
                                  className="bg-dark"
                                  type={"text"}
                                  onBlur={async (e) => {
                                    var employees = await runContractFunction(
                                      Moralis,
                                      {
                                        _containerID: conts[2].toString(),
                                        _retailer: e.target.value,
                                      },
                                      "assignRetailer"
                                    );
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                        )
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
