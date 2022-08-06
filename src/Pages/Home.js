import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const barnYard = require("../Assets/barnYard.gif");

export default function Home() {
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

  return (
    <div>
      <div
        className="row p-4 m-0 align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="col-md-6 col-12 p-4 m-0">
          <h1 className="">
            <span className="reveal-from-bottom" style={{ zoom: "1" }}>
              We do
            </span>
            <br />
            <span className="reveal-from-bottom" style={{ zoom: "1.5" }}>
              Sustainable Farming
            </span>
          </h1>
          <p className="reveal-from-bottom">
            The demand for poultry products will rise along with the global
            population. Increasing housing and managing more birds is one
            potential strategy to boost productivity to satisfy this demand.
            However, this technique will make it more challenging for producers
            to keep track of the productivity, health, and welfare status of all
            of their birds due to labor shortages, increased biosecurity
            measures, and other factors.
          </p>
        </div>
        <div className="col-md-6 col-12 p-4 m-0">
          <img className="w-100" src={barnYard} alt="..." />
        </div>
      </div>
      <div className="row p-2 m-2 align-items-center">
        <div className="col-md-12 col-12 p-2 m-0 ">
          <h1 className="reveal-from-bottom">
            <span className="">About Us</span>
          </h1>
          <p className="reveal-from-bottom">
            The demand for poultry products will rise along with the global
            population. Increasing housing and managing more birds is one
            potential strategy to boost productivity to satisfy this demand.
            However, this technique will make it more challenging for producers
            to keep track of the productivity, health, and welfare status of all
            of their birds due to labor shortages, increased biosecurity
            measures, and other factors.
          </p>
        </div>
      </div>

      <div className="row m-2 p-2 align-items-center">
        <div className="col p-2">
          <h1 className="reveal-from-bottom">
            <span className="">Get in touch!</span>
          </h1>
          <div className="row m-0 p-0 pt-4 mt-4">
            <div className="col-md-4 col">
              <div className="text-center">
                <div className="reveal-from-bottom">
                  <a href="tel:9876543210">
                    <span
                      class="card-hover-glow p-2 rounded-circle material-symbols-rounded "
                      style={{ zoom: 3 }}
                    >
                      call
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col">
              <div className="text-center">
                <div className="reveal-from-bottom">
                  <a href="mailto:support@debarn.com">
                    <span
                      class="card-hover-glow p-2 rounded-circle material-symbols-rounded "
                      style={{ zoom: 3 }}
                    >
                      mail
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col">
              <div className="text-center">
                <div className="reveal-from-bottom">
                  <a href="https://g.page/TheLaLiTBangalore?share" target={"_blank"}>
                    <span
                      class="card-hover-glow p-2 rounded-circle material-symbols-rounded "
                      style={{ zoom: 3 }}
                    >
                      location_on
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
