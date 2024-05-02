import DefaultLayout from "../../src/layout/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchAllAcademy } from "../../../redux/slice/academySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faTrash,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { editAcademyStatusToApproved } from "../../../redux/slice/academySlice";
import { editAcademyStatusToRejected } from "../../../redux/slice/academySlice";
import { deleteAcademy } from "../../../redux/slice/academySlice";
import DropDownStautsFilter from "./DropDownStautsFilter";
import DropDownNameFilter from "./DropDownNameFilter";
import DropDownDateFilter from "./DropDownDateFilter";
import DropDownLocationFilter from "./DropDownLocationFilter";
import Pagination from "react-bootstrap/Pagination";

const AcademyDashB = () => {
  // documents open window
  const openPdfWindow = (url) => {
    const pdfWindow = window.open("", "_blank");
    pdfWindow.document.write(
      '<html><head><title>PDF Document</title></head><body style="margin: 0; padding: 0;"><embed width="100%" height="100%" src="' +
        url +
        '" type="application/pdf"></embed></body></html>'
    );
  };

  const dateFormating = (date) => {
    let formattedDate = date ? new Date(date) : null;
    if (formattedDate) {
      const year = formattedDate.getFullYear();
      const month = formattedDate.getMonth() + 1;
      const day = formattedDate.getDate();
      return (formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
    } else {
      return (formattedDate = "N/A");
    }
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

  // Handle delete
  const handleDelete = (e, idAcademy) => {
    e.preventDefault();
    dispatch(
      deleteAcademy({
        id: idAcademy,
      })
    ).then(() => {
      // After successful deletion, fetch the updated team list
      dispatch(fetchAllAcademy());
      handleClose();
    });
  };

  //status filter states
  const [selectedStatus, setSelectedStatus] = useState(null);
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };
  // academy name filter states
  const [selectedOrder, setSelectedOrder] = useState("asc");
  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };
  // academy location filter states
  const [selectedLocOrder, setSelectedLocOrder] = useState("asc");
  const handleLocOrderSelect = (orderLoc) => {
    setSelectedLocOrder(orderLoc);
  };
  // date filter states
  const [selectedDateOrder, setSelectedDateOrder] = useState("new");
  const handledateSelect = (date) => {
    setSelectedDateOrder(date);
  };
  //name search filter state
  const [search, setSearch] = useState("");
  console.log(search);
  // Pagination  states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // Calculate pagination indexes for slicing data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Total number of pages
  const totalPages = Math.ceil(allacademies.length / itemsPerPage);
  // handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter function
  const filterAcademies = () => {
    // we include a copy of allacademies in filteredAcademies
    let filteredAcademies = [...allacademies];

    // Filter by status -------------------------------------------
    if (selectedStatus) {
      filteredAcademies = filteredAcademies.filter(
        (academy) => academy.Status === selectedStatus
      );
    }

    //filter by name input (on change)------------------------------
    if (search) {
      filteredAcademies = filteredAcademies.filter((academy) =>
        academy.AcademyName.toLowerCase().includes(search.toLowerCase())
      );
    }

    //pagination ----------------------------------------------------
    filteredAcademies = filteredAcademies.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    // Sort by location ---------------------------------------------
    filteredAcademies.sort((a, b) => {
      if (selectedLocOrder === "asc") {
        return a.Location.localeCompare(b.Location);
      } else {
        return b.Location.localeCompare(a.Location);
      }
    });

    // Sort by name --------------------------------------------------
    filteredAcademies.sort((a, b) => {
      if (selectedOrder === "asc") {
        return a.AcademyName.localeCompare(b.AcademyName);
      } else {
        return b.AcademyName.localeCompare(a.AcademyName);
      }
    });

    // Sort by date ----------------------------------------------------
    if (selectedDateOrder === "old") {
      filteredAcademies.sort(
        (a, b) => new Date(a.FoundedYear) - new Date(b.FoundedYear)
      );
    }

    return filteredAcademies;
  };

  return (
    <DefaultLayout>
      {/* search name  input  */}
      <div className="w-full xl:w-1/2 py-3">
        <label className="mb-2.5 block text-black dark:text-white">
          Search
        </label>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search By Academy Name"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Academy Logo
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  <div className="row ">
                    <div className="px-2 ">Academy Name</div>
                    <DropDownNameFilter
                      orderSelected={handleOrderSelect}
                    ></DropDownNameFilter>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Date</div>
                    <DropDownDateFilter
                      dateSelected={handledateSelect}
                    ></DropDownDateFilter>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Location</div>
                    <DropDownLocationFilter
                      locationSelected={handleLocOrderSelect}
                    ></DropDownLocationFilter>
                  </div>
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
              {filterAcademies().map((academy) => (
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
                      {dateFormating(academy.FoundedYear)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {academy.Location}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full  py-1 px-3 text-sm font-medium ${
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
                      <button
                        className="hover:text-warning"
                        onClick={(e) => handleDelete(e, academy._id)}
                      >
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
      <Pagination className="pt-10 pb-10 flex justify-around">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            style={{
              color: "#2b9451",
              fontWeight: "bold",
            }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </DefaultLayout>
  );
};

export default AcademyDashB;
