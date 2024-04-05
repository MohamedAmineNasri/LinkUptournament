import React from "react";
import Header from "../components/Header";
import "./Players.css";
import { Navigate, useNavigate } from "react-router-dom";
const Players = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="row" style={{ height: "100vh", margin: 0 }}>
        <div
          className="col mx-auto text-center container-fluid"
          style={{
            paddingTop: "120px",
            paddingLeft: "7rem",
            paddingRight: "7rem",
          }}
        >
          <button
            to="/players"
            className="btn btn-custom"
            style={{ position: "absolute", right: "12rem" }}
            onClick={() => {
              navigate("/player");
            }}
          >
            add player
          </button>
          <div className="container-fluid">
            <h1 className="h1">Player Consultation Services</h1>
            <div
              className="row align-items-center"
              style={{ gap: "50px", justifyContent: "center" }}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <h2 style={{ fontWeight: "500" }}>Jude Bellingham</h2>
                    </div>
                    <div class="flip-card-back">
                      <h2>Back Content</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;
