import React from "react";
import { Chart } from "react-google-charts";

export default function Owner() {
  return (
    <div>
      <div className="row m-4 p-4 card_glow rounded">
        <div className="col">
          <h3>Sales</h3>
          <Chart
            chartType="LineChart"
            data={[
              ["Timestamp", "Temperature", "Humidity", "Moisture", "AQI"],
              ["2022-01-01", 30, 20, 22, 80],
              ["2022-01-02", 30, 18, 23, 90],
              ["2022-01-03", 30, 24, 24, 90],
              ["2022-01-04", 25, 27, 22, 95],
              ["2022-01-05", 20, 22, 21, 93],
              ["2022-01-06", 15, 18, 23, 88],
              ["2022-01-07", 10, 18, 23, 88],
              ["2022-01-08", 5, 18, 23, 88],
              ["2022-01-09", 4, 18, 23, 88],
              ["2022-01-10", 2, 18, 23, 88],
              ["2022-01-11", 2, 18, 23, 88],
              ["2022-01-12", 1, 18, 23, 88],
              ["2022-01-13", -1, 18, 23, 88],
              ["2022-01-14", -1, 18, 23, 88],
              ["2022-01-15", -1, 18, 23, 88],
              ["2022-01-16", -1, 18, 23, 88],
              ["2022-01-17", -1, 18, 23, 88],
            ]}
            width="100%"
            height="400px"
          />
        </div>
      </div>

      <div className="row m-0 p-0">
        <div className="col-md-3 col-12 p-0 m-0 ">
          <div className=" grad-btn rounded p-4 m-4">
            <h3>Farms</h3>
            <h5 className="m-0 text-end display-5"> 1</h5>
          </div>
        </div>
        <div className="col-md-3 col-12 p-0 m-0 ">
          <div className="card_border rounded p-4 m-4">
            <h3>Barns</h3>
            <h5 className="m-0 text-end fs-1"> 1</h5>
          </div>
        </div>
        <div className="col-md-3 col-12 p-0 m-0 ">
          <div className="card_glow rounded p-4 m-4">
            <h3>Warehouses</h3>
            <h5 className="m-0 text-end display-6"> 1</h5>
          </div>
        </div>
        <div className="col-md-3 col-12 p-0 m-0 ">
          <div className="card_glow rounded p-4 m-4">
            <h3>Containers</h3>
            <h5 className="m-0 text-end fs-1"> 1</h5>
          </div>
        </div>
        <div className="col-md-3 col-12 p-0 m-0 ">
          <div className="card_glow rounded p-4 m-4">
            <h3>Orders</h3>
            <h5 className="m-0 text-end fs-3"> 1</h5>
          </div>
        </div>
        <div className="col-md-3 col-12 p-0 m-0 ">
          <div className="card_glow rounded p-4 m-4">
            <h3>Suppliers</h3>
            <h5 className="m-0 text-end fs-1"> 1</h5>
          </div>
        </div>
        <div className="col-md-3 col-12 p-0 m-0 ">
          <div className="card_glow rounded p-4 m-4">
            <h3>Stores</h3>
            <h5 className="m-0 text-end fs-1"> 1</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
