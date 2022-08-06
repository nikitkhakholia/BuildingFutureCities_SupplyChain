import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { hideLoading, showLoading, runContractFunction, showSuccessAlert } from "./utils";
const logo = require("./Assets/henLogo.gif");
const loading = require("./Assets/hatchLoading.gif");
const barnYard = require("./Assets/barnYard.gif");

export default function Base({ children }) {
  //revear animation
  function reveal() {
    var reveals = document.querySelectorAll(".reveal-from-bottom");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 50;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  useEffect(() => {
    reveal();
  }, [window.location.href]);
  window.addEventListener("scroll", reveal);

  //state variables
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userRole, setUserRole] = useState(null);

  //moralis integration
  const { authenticate, isAuthenticated, logout, Moralis } = useMoralis();
  const login = async () => {
    if (!isAuthenticated) {
      showLoading();
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then((user) => {
          window.localStorage.setItem("user", JSON.stringify(user));
          window.location = "/";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  useEffect(async () => {
    await Moralis.enableWeb3();
    if (user) {
      if (
        (await runContractFunction(Moralis, null, "getOwner"))
          .toString()
          .toUpperCase() === user.ethAddress.toString().toUpperCase()
      ) {
        console.log("user is owner");
        setUserRole("OWNER")
      } else {
        console.log("user is not owner");
        if (
          await runContractFunction(
            Moralis,
            {
              account: user.ethAddress,
            },
            "isEmployee"
          )
        ) {
          console.log("user is employee");
          setUserRole("EMPLOYEE");
        } else {
          console.log("user is not employee");
          if (
            await runContractFunction(
              Moralis,
              {
                account: user.ethAddress,
              },
              "isDistributor"
            )
          ) {
            console.log("user is supplier");
            setUserRole("SUPPLIER");
          } else {
            console.log("user is not supplier");
            if (
              await runContractFunction(
                Moralis,
                {
                  account: user.ethAddress,
                },
                "isRetailer"
              )
            ) {
              console.log("user is retailer");
              setUserRole("RETAILER");
            } else {
              console.log("user is not retailer");
              //todo
            }
          }
        }
      }
    } else {
      showSuccessAlert("Please connect to Metamask")
    }
  }, ["x"]);

  return (
    <div className="darky">
      <div id="page">
        <header>
          <nav className="navbar navbar-expand-lg darky m-0 p-0">
            <div className="container-fluid m-0 p-0">
              <a className="navbar-brand fs-1 m-0 p-0 text-light" href="/">
                <img
                  className="m-0 p-0"
                  style={{ maxWidth: "8rem" }}
                  src={logo}
                  alt="LOGO"
                />
                deFarm
              </a>

              <button
                className="navbar-toggler grad-btn mx-4"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse "
                id="navbarSupportedContent"
              >
                <div className="me-auto mb-2 mb-lg-0"></div>
                <ul className="navbar-nav d-flex px-4">
                  {!isAuthenticated && (
                    <li className="nav-item px-2">
                      <div
                        className="nav-link btn grad-btn"
                        style={{ color: "#fff" }}
                        href="#"
                        onClick={login}
                      >
                        Get Started
                      </div>
                    </li>
                  )}
                  {userRole === "OWNER" && (
                    <li className="nav-item">
                      <a className="nav-link text-light" href="/owner">
                        Owner
                      </a>
                    </li>
                  )}
                  {userRole === "EMPLOYEE" && (
                    <li className="nav-item">
                      <a className="nav-link text-light" href="/employee">
                        Employee
                      </a>
                    </li>
                  )}
                  {userRole === "SUPPLIER" && (
                    <li className="nav-item">
                      <a className="nav-link text-light" href="/distributor">
                        Distributor
                      </a>
                    </li>
                  )}
                  {userRole === "RETAILER" && (
                    <li className="nav-item">
                      <a className="nav-link text-light" href="/store">
                        Retailer
                      </a>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li className="nav-item px-2">
                      <a
                        className="nav-link text-light"
                        href="#logout"
                        onClick={logOut}
                      >
                        Logout
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div style={{ minHeight: "60vh" }} className="darky">
          {isAuthenticated ? (
            <div className="side-spacer">{children}</div>
          ) : (
            <div className="side-spacer">
              <div className="row p-4 m-0 align-items-center">
                <div className="col-md-6 col-12 p-4 m-0">
                  <h1 className="">
                    <span className="reveal-from-bottom" style={{ zoom: "1" }}>
                      We do
                    </span>
                    <br />
                    <span
                      className="reveal-from-bottom"
                      style={{ zoom: "1.5" }}
                    >
                      Sustainable Farming
                    </span>
                  </h1>
                  <p className="reveal-from-bottom">
                    The demand for poultry products will rise along with the
                    global population. Increasing housing and managing more
                    birds is one potential strategy to boost productivity to
                    satisfy this demand. However, this technique will make it
                    more challenging for producers to keep track of the
                    productivity, health, and welfare status of all of their
                    birds due to labor shortages, increased biosecurity
                    measures, and other factors.
                  </p>
                </div>
                <div className="col-md-6 col-12 p-4 m-0">
                  <img className="w-100" src={barnYard} alt="..." />
                </div>
              </div>
            </div>
          )}
        </div>
        <footer style={{ marginTop: "10rem" }}>
          <div className="text-light card_glow">
            <div className="p-2 side-spacer">
              <p className="text-center m-0 p-2">
                Copyright ⓒ 2022, deBarn Pvt. Ltd.
                <br /> All Rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
      {/* loading */}
      <div
        className="text-center d-none "
        id="loading-icon"
        style={{
          zIndex: "10000",
          // pointerEvents: "none",
          position: "fixed",
          padding: "15%",
          margin: "0",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          // backgroundColor: "#000",
        }}
      >
        <img
          className="rounded-circle"
          style={{ maxWidth: "16rem" }}
          src={loading}
          alt="..."
        />
        <br />
        <p className="fs-3 text_glow">Please wait while we are loading...</p>
      </div>
      {/* alerts */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>
      <div
        id="alert-failure"
        className="alert grad-btn d-flex align-items-center d-none"
        role="alert"
      >
        <svg
          className="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Danger:"
        >
          <use xlinkHref="#exclamation-triangle-fill" />
        </svg>
        <div id="alert-failure-msg">An example danger alert with an icon</div>
      </div>
      <div
        id="alert-success"
        className="alert grad-btn d-flex align-items-center d-none"
        role="alert"
      >
        <svg
          className="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Success:"
        >
          <use xlinkHref="#check-circle-fill" />
        </svg>
        <div id="alert-success-msg">An example success alert with an icon</div>
      </div>
    </div>
  );
}
