import React, { useEffect } from "react";
import TeamCard from "./TeamCard";
import DropDownAcademy from "./DropDownAcademy";
import { useSelector, useDispatch } from "react-redux";
import { fetchAcademybyManagerId } from "../../redux/slice/academySlice";
import academyImageteam from "../../assets/Mi-imgs/team1.jpg";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import HeaderNavBar from "./HeaderNavBar";
import Badge from "react-bootstrap/Badge";
import video from "../../assets/Mi-imgs/stadiumvideo.mp4";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";

export const Academy = () => {
  const dispatch = useDispatch();

  const { academyData, loading, error } = useSelector(
    (state) => state.root.academy
  );

  useEffect(() => {
    //normally hethi nhezeha lel login jsx
    const userId = localStorage.getItem("user");
    const userObject = JSON.parse(userId);
    //Extract the id property from the user object
    const userIdOnly = userObject.id;

    if (loading === false && error === null) {
      dispatch(
        fetchAcademybyManagerId({
          idmanger: userIdOnly,
        })
      );
      localStorage.setItem("AcademyStatus", academyData.Status);
      if (academyData !== null) {
        //hide the add academy  page if the manger already have one mesh tethaz lel home page or login
        localStorage.setItem("hideAddAcademy", true);
      }
    }
  }, []);

  //date correct format
  const date = academyData ? new Date(academyData.FoundedYear) : null;
  let formattedDate = "";
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  } else {
    formattedDate = "N/A";
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Rejected":
        return "danger";
      case "Approved":
        return "success";
      default:
        return "text-muted";
    }
  };

  return (
    <DefaultLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Academy
        </h2>
      </div>
      <div className="pt-13">
        <div>
          <div>
            <div>
              <div
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "80px",
                }}
                className="p-4 border border-gray-300 bg-opacity-25 bg-gray-900"
              >
                <div className="flex justify-center items-top">
                  <div className="col-md-12 col-lg-12 word-wrap-break border-b pb-6 text-center">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/2">
                        <img
                          src={academyData.Logo}
                          alt="Logo"
                          className="img-fluid max-w-sm sm:max-w-none m-auto mb-4"
                          style={{ maxWidth: "200px" }}
                        />
                        <h3
                          className="mb-4 mt-3 text-white font-bold text-3xl"
                          style={{ fontWeight: "bold", fontSize: "40px" }}
                        >
                          <strong>{academyData.AcademyName}</strong>
                        </h3>
                      </div>
                      <div className="sm:w-1/2 sm:self-center text-white">
                        <p className="mb-4">
                          Location :{" "}
                          <span className="text-gray-400 notranslate">
                            {academyData.Location}
                          </span>
                        </p>
                        <p className="mb-4">
                          Creating Date :{" "}
                          <span className="text-gray-400">{formattedDate}</span>
                        </p>
                        <p className="mb-2">
                          Status :{" "}
                          <span>
                            <Badge
                              style={{ color: "white" }}
                              className="p-2 notranslate"
                              bg={getStatusColor(academyData.Status)}
                            >
                              {academyData.Status}
                            </Badge>
                          </span>
                        </p>
                        {academyData.Status === "Approved" && (
                          <p className="text-green-500 mb-4">
                            This academy is approved, You can participate in
                            tournaments.
                          </p>
                        )}
                        {academyData.Status === "Pending" && (
                          <p className="text-yellow-500 mb-4">
                            This academy is still pending approval.
                          </p>
                        )}
                        {academyData.Status === "Rejected" && (
                          <p className="text-red-500 mb-4">
                            This academy has been rejected, You must provide
                            convincing Documents!
                          </p>
                        )}
                        <DropDownAcademy
                          id={academyData._id}
                          academyLogo={academyData.Logo}
                          academyname={academyData.AcademyName}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Academy teams */}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-12">
              <div
                className="widget-body mb-3  teamsBorderBox"
                style={{
                  borderRight: "solid thin",
                  borderLeft: "solid thin",
                  borderBottom: "solid thin",
                  borderRadius: "0px",
                }}
              >
                <div className="p-4">
                  <TeamCard idacademy={academyData._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Academy;
