import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCheck,
  faFilter,
  faHashtag,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
const DropDownStautsFilter = ({ onSelect }) => {
  //drop down logic
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <div className="relative flex">
      <button
        className="text-[#98A6AD] hover:text-body"
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FontAwesomeIcon icon={faFilter} />
      </button>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => onSelect(null)}
        >
          <FontAwesomeIcon icon={faHashtag} /> All
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => onSelect("Approved")}
        >
          <FontAwesomeIcon icon={faCheck} /> Approved
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => onSelect("Rejected")}
        >
          <FontAwesomeIcon icon={faXmark} /> Rejected
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => onSelect("Pending")}
        >
          <FontAwesomeIcon icon={faSpinner} /> Pending
        </button>
      </div>
    </div>
  );
};

export default DropDownStautsFilter;
