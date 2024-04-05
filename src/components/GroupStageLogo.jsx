import React from "react";
const logoStyle = {
  borderRadius: "4px",
  color: "white",
  height: "20px",
  overflow: "hidden",
  position: "relative",
  width: "20px",
  border: "none",
  fontFamily: "inherit",
  outline: "none",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  cursor: "pointer",
};
export const Win = () => {
  return (
    <div
      className="text-center"
      style={{ ...logoStyle, backgroundColor: "#00a83f" }}
    >
      W
    </div>
  );
};
export const Lose = () => {
  return (
    <div
      className="text-center"
      style={{ ...logoStyle, backgroundColor: "#dc0000" }}
    >
      L
    </div>
  );
};
export const Draw = () => {
  return (
    <div
      className="text-center"
      style={{ ...logoStyle, backgroundColor: "#f3a000" }}
    >
      D
    </div>
  );
};
