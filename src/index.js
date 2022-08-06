import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./Base";
import "./index.css";
import "./anim.css";
import { MoralisProvider } from "react-moralis";
import Home from "./Pages/Home";
import Owner from "./Pages/Owner";
import Employee from "./Pages/Employee";
import Supplier from "./Pages/Supplier";
import Retailer from "./Pages/Retailer";

// eslint-disable-next-line
const bootstrapCSS = require("bootstrap/dist/css/bootstrap.css");
// eslint-disable-next-line
const bootstrapJS = require("bootstrap/dist/js/bootstrap.js");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MoralisProvider
      serverUrl="https://fcp4odp0bq7m.usemoralis.com:2053/server"
      appId="SAqIwBrQODGUOaA8cikg3nz64KLmkC2mkG32ZW95"
    >
      <Base>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/owner" element={<Owner/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/distributor" element={<Supplier/>} />
          <Route path="/retailer" element={<Retailer/>} />
        </Routes>
      </Base>
    </MoralisProvider>
  </BrowserRouter>
);



