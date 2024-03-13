import React from "react";
const logoStyle = {
  alignItems: "center",
  borderRadius: "4px",
  color: "white",
  height: "20px",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
  width: "20px",
  border: "none",
  fontFamily: "inherit",
  outline: "none",
  padding: "0",
  paddingBlock: "0",
  paddingInline: "0",
  fontSize: "13px",
  lineHeight: "16px",
  display: "block",
  fontStyle: "normal",
  fontWeight: "400",
  cursor: "pointer",
};
export const Win = () => {
  return (
    <div
      className="d-flex"
      style={{ ...logoStyle, backgroundColor: "#00a83f" }}
    >
      W
    </div>
  );
};
export const Lose = () => {
  return (
    <div
      className="d-flex"
      style={{ ...logoStyle, backgroundColor: "#dc0000" }}
    >
      L
    </div>
  );
};
export const Draw = () => {
  return (
    <div
      className="d-flex"
      style={{ ...logoStyle, backgroundColor: "#f3a000" }}
    >
      D
    </div>
  );
};
