import DefaultLayout from "../src/layout/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchAllAcademy } from "../../redux/slice/academySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faTrash,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { editAcademyStatusToApproved } from "../../redux/slice/academySlice";
import { editAcademyStatusToRejected } from "../../redux/slice/academySlice";
import DropDownStautsFilter from "./DropDownStautsFilter";

const AcademyDashB = () => {
  const openPdfWindow = (url) => {
    const pdfWindow = window.open("", "_blank");
    pdfWindow.document.write(
      '<html><head><title>PDF Document</title></head><body style="margin: 0; padding: 0;"><embed width="100%" height="100%" src="' +
        url +
        '" type="application/pdf"></embed></body></html>'
    );
  };

  //fetch
  const dispatch = useDispatch();

  const { allacademies, loading, error } = useSelector(
    (state) => state.root.academy
  );
  useEffect(() => {
    dispatch(fetchAllAcademy());
  }, [dispatch]);

  //edit status
  // Handle Approved
  const handleUpdateStatusToApproved = (e, idAcademy) => {
    e.preventDefault();
    dispatch(
      editAcademyStatusToApproved({
        id: idAcademy,
      })
    ).then(() => {
      // After successful deletion, fetch the updated team list
      dispatch(fetchAllAcademy());
      handleClose();
    });
  };

  // Handle Rejected
  const handleUpdateStatusToRejected = (e, idAcademy) => {
    e.preventDefault();
    dispatch(
      editAcademyStatusToRejected({
        id: idAcademy,
      })
    ).then(() => {
      // After successful deletion, fetch the updated team list
      dispatch(fetchAllAcademy());
      handleClose();
    });
  };

  //Filter By status
  const [selectedStatus, setSelectedStatus] = useState(null);
  const filteredAcademies = selectedStatus
    ? allacademies.filter((academy) => academy.Status === selectedStatus)
    : allacademies;
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Academy Logo
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Academy Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Location
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Status</div>
                    <DropDownStautsFilter
                      statusSelected={handleStatusSelect}
                    ></DropDownStautsFilter>
                  </div>
                </th>

                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAcademies.map((academy) => (
                <tr>
                  <td className="border-b border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      <img
                        src={academy.Logo}
                        style={{ maxWidth: "100px" }}
                      ></img>
                    </h5>
                    {/* <p className="text-sm">${packageItem.price}</p> */}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {academy.AcademyName}
                    </h5>
                    {/* <p className="text-sm">${packageItem.price}</p> */}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {academy.Location}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        academy.Status === "Approved"
                          ? "bg-success text-white"
                          : academy.Status === "Rejected"
                            ? "bg-danger text-white"
                            : "bg-warning text-white"
                      }`}
                    >
                      {academy.Status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-success"
                        onClick={() =>
                          openPdfWindow(academy.LegitimacyDocuments)
                        }
                      >
                        <FontAwesomeIcon icon={faFolderOpen} />
                      </button>
                      <button
                        className="hover:text-success"
                        onClick={(e) =>
                          handleUpdateStatusToApproved(e, academy._id)
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        className="hover:text-danger"
                        onClick={(e) =>
                          handleUpdateStatusToRejected(e, academy._id)
                        }
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                      <button className="hover:text-warning">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AcademyDashB;
