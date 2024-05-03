import DefaultLayout from "../../src/layout/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchteams } from "../../../redux/slice/teamSlice";
import { UpdateTeamsStatsFromFinishedMatches } from "../../../redux/slice/teamSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import DropDownMwonFilter from "./DropDownMwonFilter";

const TeamDashB = () => {
  //fetch
  const dispatch = useDispatch();

  // update all teams stat based on their finished matches ??????????
  const handleUpdateTeamsStats = () => {
    dispatch(UpdateTeamsStatsFromFinishedMatches());
    window.location.reload();
  };

  const { allteamData, loading, error } = useSelector(
    (state) => state.root.team
  );
  useEffect(() => {
    dispatch(fetchteams());
  }, [dispatch]);

  const [selectednbOrder, setselectednbOrder] = useState("");
  const handleselectednbOrder = (order) => {
    setselectednbOrder(order);
  };

  const [selectednbOrderML, setselectednbOrderML] = useState("");
  const handleselectednbOrderML = (order) => {
    setselectednbOrderML(order);
  };

  const [selectednbOrderMD, setselectednbOrderMD] = useState("");
  const handleselectednbOrderMD = (order) => {
    setselectednbOrderMD(order);
  };

  const [selectednbOrderMP, setselectednbOrderMP] = useState("");
  const handleselectednbOrderMP = (order) => {
    setselectednbOrderMP(order);
  };

  const [selectednbOrderGS, setselectednbOrderGS] = useState("");
  const handleselectednbOrderGS = (order) => {
    setselectednbOrderGS(order);
  };

  const [selectednbOrderGR, setselectednbOrderGR] = useState("");
  const handleselectednbOrderGR = (order) => {
    setselectednbOrderGR(order);
  };

  //name search filter state
  const [search, setSearch] = useState("");

  // Pagination  states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // Calculate pagination indexes for slicing data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Total number of pages
  const totalPages = Math.ceil(allteamData.length / itemsPerPage);
  // handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //   // Filter function
  const filterAcademies = () => {
    let filteredTeams = [...allteamData];

    // Apply filters for each criteria separately
    //match won sort
    if (selectednbOrder !== "") {
      filteredTeams.sort((a, b) => {
        return selectednbOrder === "highest"
          ? b.Total_MatchesWon - a.Total_MatchesWon
          : a.Total_MatchesWon - b.Total_MatchesWon;
      });
    }

    //match lost sort
    if (selectednbOrderML !== "") {
      filteredTeams.sort((a, b) => {
        return selectednbOrderML === "highest"
          ? b.Total_MatchesLost - a.Total_MatchesLost
          : a.Total_MatchesLost - b.Total_MatchesLost;
      });
    }

    //match drawn sort
    if (selectednbOrderMD !== "") {
      filteredTeams.sort((a, b) => {
        return selectednbOrderMD === "highest"
          ? b.Total_MatchesDrawn - a.Total_MatchesDrawn
          : a.Total_MatchesDrawn - b.Total_MatchesDrawn;
      });
    }

    //match played sort
    if (selectednbOrderMP !== "") {
      filteredTeams.sort((a, b) => {
        return selectednbOrderMP === "highest"
          ? b.Total_MatchesPlayed - a.Total_MatchesPlayed
          : a.Total_MatchesPlayed - b.Total_MatchesPlayed;
      });
    }

    //match gaol scored sort
    if (selectednbOrderGS !== "") {
      filteredTeams.sort((a, b) => {
        return selectednbOrderGS === "highest"
          ? b.Total_Goals_scored - a.Total_Goals_scored
          : a.Total_Goals_scored - b.Total_Goals_scored;
      });
    }

    //match gaol received sort
    if (selectednbOrderGR !== "") {
      filteredTeams.sort((a, b) => {
        return selectednbOrderGR === "highest"
          ? b.Total_Goals_received - a.Total_Goals_received
          : a.Total_Goals_received - b.Total_Goals_received;
      });
    }

    // Filter by name input
    if (search) {
      filteredTeams = filteredTeams.filter((team) =>
        team.TeamName.toLowerCase().includes(search.toLowerCase())
      );
    }

    //pagination
    //pagination ----------------------------------------------------
    filteredTeams = filteredTeams.slice(indexOfFirstItem, indexOfLastItem);

    return filteredTeams;
  };
  console.log(filterAcademies());

  return (
    <DefaultLayout>
      {/* search name  input  */}

      <label className="mb-2.5 block text-black dark:text-white">Search</label>
      <div className="flex w-full py-3 items-center">
        <div className=" xl:w-2/3 ">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search By Academy Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="ml-4 xl:w-1/3 ">
          <button
            className="flex items-normal hover:text-success"
            style={{
              border: "solid thin",
              padding: "22px",
              color: "#2b9451",
              marginBottom: "10px",
            }}
            onClick={handleUpdateTeamsStats}
          >
            <span>Update Stats</span>
            <FontAwesomeIcon
              fontSize="15px"
              icon={faArrowsRotate}
              className="ml-2"
              style={{ alignSelf: "center" }}
            />
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-center">
                  <div className=" ">Team </div>
                </th>
                <th className="min-w-[100px] py-4 font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Match_Won</div>
                    <DropDownMwonFilter
                      orderSelected={handleselectednbOrder}
                    ></DropDownMwonFilter>
                  </div>
                </th>
                <th className="min-w-[100px] py-4  font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Match_Lost</div>
                    <DropDownMwonFilter
                      orderSelected={handleselectednbOrderML}
                    ></DropDownMwonFilter>
                  </div>
                </th>
                <th className="min-w-[100px] py-4  font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Match_Drawn</div>
                    <DropDownMwonFilter
                      orderSelected={handleselectednbOrderMD}
                    ></DropDownMwonFilter>
                  </div>
                </th>
                <th className="min-w-[100px] py-4  font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Match_Played</div>
                    <DropDownMwonFilter
                      orderSelected={handleselectednbOrderMP}
                    ></DropDownMwonFilter>
                  </div>
                </th>
                <th className="min-w-[100px] py-4  font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Goals_Scored</div>
                    <DropDownMwonFilter
                      orderSelected={handleselectednbOrderGS}
                    ></DropDownMwonFilter>
                  </div>
                </th>
                <th className="min-w-[100px] py-4  font-medium text-black dark:text-white">
                  <div className="row ">
                    <div className="px-2 ">Goals_Received</div>
                    <DropDownMwonFilter
                      orderSelected={handleselectednbOrderGR}
                    ></DropDownMwonFilter>
                  </div>
                </th>

                <th className="py-4  font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filterAcademies().map((team) => (
                <tr>
                  <td className="border-b border-[#eee] py-2   dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white pb-2">
                      <img
                        src={team.TeamLogo}
                        style={{ maxWidth: "100px" }}
                      ></img>
                    </h5>
                    <p className="text-sm">{team.TeamName}</p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                    <p
                      className="text-black dark:text-white"
                      style={{ fontSize: "1.2rem", textAlign: "center" }}
                    >
                      {team.Total_MatchesWon}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                    <p
                      className="text-black dark:text-white"
                      style={{ fontSize: "1.2rem", textAlign: "center" }}
                    >
                      {team.Total_MatchesLost}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                    <p
                      className="text-black dark:text-white"
                      style={{ fontSize: "1.2rem", textAlign: "center" }}
                    >
                      {team.Total_MatchesDrawn}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                    <p
                      className="text-black dark:text-white"
                      style={{ fontSize: "1.2rem", textAlign: "center" }}
                    >
                      {team.Total_MatchesPlayed}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                    <p
                      className="text-black dark:text-white"
                      style={{ fontSize: "1.2rem", textAlign: "center" }}
                    >
                      {team.Total_Goals_scored}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                    <p
                      className="text-black dark:text-white"
                      style={{ fontSize: "1.2rem", textAlign: "center" }}
                    >
                      {team.Total_Goals_received}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-danger">
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

export default TeamDashB;
