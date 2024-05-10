import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom/dist/umd/react-router-dom.development";

const TournHeader = ({ setNav, nav , nameOne , nameTwo }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4">
      <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <button
          className="text-lg font-semibold text-black  dark:text-white mx-auto"
          onClick={() => {
            setNav(true);
          }}
          style={{
            width: "50%",
            borderRight: "1px solid #2B9451",

            color: nav ? "#2B9451" : "",
          }}
        >
          {nameOne}
        </button>
        <button
          className="text-lg font-semibold text-black dark:text-white mx-auto"
          onClick={() => {
            setNav(false);
          }}
          style={{
            width: "50%",
            color: !nav ? "#2B9451" : "",
          }}
        >
          {nameTwo}
        </button>
      </div>
    </div>
  );
};

export default TournHeader;
