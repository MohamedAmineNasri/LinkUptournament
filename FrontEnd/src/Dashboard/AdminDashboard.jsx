import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "../Dashboard/src/common/Loader";
import PageTitle from "../Dashboard/src/components/PageTitle";
import SignIn from "../Dashboard/src/pages/Authentication/SignIn";
import SignUp from "../Dashboard/src/pages/Authentication/SignUp";
import Calendar from "../Dashboard/src/pages/Calendar";
import Chart from "../Dashboard/src/pages/Chart";
import ECommerce from "../Dashboard/src/pages/Dashboard/ECommerce";
import FormElements from "../Dashboard/src/pages/Form/FormElements";
import FormLayout from "../Dashboard/src/pages/Form/FormLayout";
import Profile from "../Dashboard/src/pages/Profile";
import Settings from "../Dashboard/src/pages/Settings";
import Tables from "../Dashboard/src/pages/Tables";
import Alerts from "../Dashboard/src/pages/UiElements/Alerts";
import Buttons from "../Dashboard/src/pages/UiElements/Buttons";
import AcademyDashB from "./miaoui/academyDsPanel/AcademyDashB";

import "./src/css/style.css";
import "./src/css/satoshi.css";
// import 'jsvectormap/dist/css/jsvectormap.css';
import "flatpickr/dist/flatpickr.min.css";
import TeamDashB from "./miaoui/teamDsPanel/TeamDashB";
import AchievementDisplay from "./miaoui/achievementsDsPanel/AchievementDisplay";
import AddAchivementDS from "./miaoui/achievementsDsPanel/AddAchivementDS";

const AdminDashboard = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // setTimeout(() => setLoading(false), 1000);
  }, []);
  // return loading ? (
  return (
    // <Loader />
    // ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        {/* academy dashboard miaoui----------------------------------------------------------------------------------- */}
        <Route
          path="/academyDS"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AcademyDashB></AcademyDashB>
            </>
          }
        />
        <Route
          path="/teamDS"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TeamDashB></TeamDashB>
            </>
          }
        />
        <Route
          path="/achievementDS"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AchievementDisplay></AchievementDisplay>
            </>
          }
        />
        <Route
          path="/AddAchivementDS"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddAchivementDS></AddAchivementDS>
            </>
          }
        />
        {/* --------------------------------------------------------------------------------------------------------- */}
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default AdminDashboard;
