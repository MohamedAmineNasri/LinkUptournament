import React from "react";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";
import { Outlet } from "react-router-dom";
const TournamentLayout = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default TournamentLayout;
