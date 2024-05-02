import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ManageParticipant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const [activeComponent, setActiveComponent] = useState("teams");

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <div>
      {user?.roles[0] == "Manager" ? (
        <></>
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4">
          <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
            <button
              className="text-lg font-semibold text-black  dark:text-white mx-auto"
              onClick={() => {
                handleClick("players");
                navigate("player");
              }}
              style={{
                width: "50%",
                borderRight: "1px solid #2B9451",

                color: location.pathname.startsWith(
                  "/manage/participant/player"
                )
                  ? "#2B9451"
                  : "",
              }}
            >
              Players
            </button>
            <button
              className="text-lg font-semibold text-black dark:text-white mx-auto"
              onClick={() => {
                handleClick("referees");
                navigate("referee");
              }}
              style={{
                width: "50%",
                color: location.pathname.startsWith(
                  "/manage/participant/referee"
                )
                  ? "#2B9451"
                  : "",
              }}
            >
              Referees
            </button>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default ManageParticipant;
