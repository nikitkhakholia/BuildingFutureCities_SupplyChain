import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./Base";
import "./index.css";
import "./anim.css";
import { MoralisProvider } from "react-moralis";
import Home from "./Pages/Home";
import Owner from "./Pages/Owner";

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
        </Routes>
      </Base>
    </MoralisProvider>
  </BrowserRouter>
);



