import React, { useEffect } from "react";





const barnYard = require("../Assets/barnYard.gif");

export default function Home() {
  function reveal() {
    var reveals = document.querySelectorAll(".reveal-from-bottom");
    console.log(reveal.length);
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
      <div className="row p-4 m-0 align-items-center" style={{minHeight:"80vh"}}>
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

      <div className="row m-2 p-2 align-items-center justify-content-center">
        <div className="col-md-3 col-12 p-2">
          <h1 className="reveal-from-bottom">
            <span className="">Contact Us</span>
          </h1>
          <iframe
            className="rounded reveal-from-bottom card_glow"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1944.3322748010464!2d77.60761815814833!3d12.929268611929322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1453444edcad%3A0xf1034f62dc3e6bbc!2sTavarekere%2C%20Krishna%20Murthi%20Layout%2C%20S.G.%20Palya%2C%20Bengaluru%2C%20Karnataka%20560029!5e0!3m2!1sen!2sin!4v1659687284304!5m2!1sen!2sin"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            style={{ height: "20rem", width: "100%" }}
          ></iframe>
        </div>
        <div className="col-md-3 col-12 p-2">
          
          <div
            className="reveal-from-bottom grad-btn rounded w-100"
            style={{ height: "20rem" }}
          ><h1 className="reveal-from-bottom p-4">Call Us</h1></div>
        </div>
      </div>
    </div>
  );
}
