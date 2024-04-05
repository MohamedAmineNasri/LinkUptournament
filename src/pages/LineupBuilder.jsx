import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Form, Button } from "react-bootstrap";

import "./LineUpBuilder.css";
import DraggableElement from "../components/DraggableElement";
import AddPlayerLineUp from "../components/AddPlayerLineUp";
const LineupBuilder = () => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    // Create a new Image object
    const img = new Image();

    // Set the source of the Image object to the background image URL
    img.src = "../../public/assets/images/football-pitch.png";

    // Once the image is loaded, update the image height state
    img.onload = function () {
      setImageHeight(img.height - 60);
    };
    console.log(imageHeight);
  }, []);
  return (
    <div>
      <Header />
      <div
        className="row align-items-center lineup"
        style={{ height: "100vh", margin: 0 }}
      >
        <div className="col mx-auto text-center">
          <div className=" container lineup-container">
            <div className="row " style={{ width: "100%" }}>
              <div className="col-5">
                <form className="player-form">
                  <h2 className="text-white">LINEUP</h2>
                  <Form.Group controlId="squad_title">
                    <Form.Control
                      type="text"
                      name="squad_title"
                      placeholder="Squad Title"
                    />
                  </Form.Group>
                  <Form.Group controlId="subtitle">
                    <Form.Control
                      type="text"
                      name="subtitle"
                      placeholder="Subtitle"
                    />
                  </Form.Group>
                  <Form.Group controlId="position">
                    <Form.Control as="select" name="position">
                      <option value="one">Select Position</option>
                      <option value="two">4-4-2</option>
                      <option value="three">4-2-3-1</option>
                    </Form.Control>
                  </Form.Group>
                </form>
              </div>
              <div className="col-7 lineup-pitch">
                <div
                  className="football-pitch"
                  style={{
                    backgroundImage: `url("../../public/assets/images/football-pitch.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minWidth: "100%",
                    minHeight: `${imageHeight}px`,
                  }}
                >
                  <DraggableElement />
                  <DraggableElement />
                  <DraggableElement />
                  <DraggableElement />
                  {/*<AddPlayerLineUp/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineupBuilder;
