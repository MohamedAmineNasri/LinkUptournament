import React from "react";
import Draggable from "react-draggable";

const DraggableElement = () => {
  return (
    <Draggable bounds="parent">
      <div
        style={{
          height: "60px",
          width: "60px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "grab",
          borderRadius: "60px",
          position: "absolute",
          backgroundImage: `url("../../public/assets/images/cr7.jpg")`,
          right: "0",
        }}
      ></div>
    </Draggable>
  );
};

export default DraggableElement;
