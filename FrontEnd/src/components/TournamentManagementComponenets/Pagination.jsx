import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchPlayers } from "../../redux/playerReducers/searchPlayerSlice";
import { searchReferees } from "../../redux/refereeReducers/searchRefereeSlice";

const Pagination = ({ currentPage, totalPages, type }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name, position, team } = useSelector(
    (state) => state.root.searchPlayers.searchResults
  );
  const {
    name: refereeName,
    role,
    availability,
  } = useSelector((state) => state.root.fetchReferees.referees);

  const handlePageChange = (page) => {
    switch (pathname) {
      case "/manage/participant/player": {
        dispatch(
          searchPlayers({
            name: name,
            position: position,
            team: team,
            page: page,
          })
        );
        break;
      }
      case "/manage/participant/referee": {
        dispatch(
          searchReferees({
            name: refereeName,
            role: role,
            availability: availability,
            page: page,
          })
        );
        break;
      }
      default:
        break;
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none mb-6 flex">
        {/* Previous page button */}
        <li>
          <button
            className="text-black dark:text-white font-bold pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface/50 transition duration-300 dark:text-neutral-400"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {/* Page numbers */}
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage
                ? "bg-green-800 text-green-200 rounded"
                : "text-black"
            }
          >
            <button
              className=" relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-200 focus:text-success-700 focus:outline-none  active:text-success-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-primary  dark:focus:text-success-500 dark:active:bg-neutral-700 dark:active:text-success-500"
              onClick={() => handlePageChange(page)} // Handle page number click
            >
              {page}
            </button>
          </li>
        ))}
        {/* Next page button */}
        <li>
          <button
            className="text-black font-bold relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-success-700 focus:outline-none  active:text-success-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  dark:focus:text-success-500 dark:active:bg-neutral-700 dark:active:text-success-500"
            disabled={currentPage === totalPages} // Disable if on the last page
            onClick={() => handlePageChange(currentPage + 1)} // Handle next page click
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
