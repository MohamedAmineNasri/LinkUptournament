import React, { useState } from "react";

export default function TailwindFileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };
  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.slice(0, maxLength - 3) + "...";
    }
  };
  return (
    <div className="mt-3 flex justify-center px-6 py-2 pb-6 border-2 border-white border-dashed rounded-md">
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="#ebf5ed"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.889 24c0-4.973 4.067-9.013 9.056-9.013H26.09c4.99 0 9.057 4.04 9.057 9.013h5.433c1.374 0 2.502 1.124 2.502 2.501v14.177c0 1.378-1.128 2.502-2.502 2.502H6.456c-1.374 0-2.501-1.124-2.501-2.502V26.5c0-1.377 1.127-2.501 2.501-2.501h5.433zM24 36.017c-5.503 0-9.989-4.475-9.989-9.988 0-5.512 4.486-9.988 9.989-9.988 5.511 0 9.987 4.476 9.987 9.988 0 5.513-4.476 9.988-9.987 9.988z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M24 41.512c-7.696 0-13.966-6.269-13.966-13.966S16.304 13.58 24 13.58c7.697 0 13.967 6.269 13.967 13.966 0 7.696-6.27 13.966-13.967 13.966zm0-24.946c-5.51 0-9.98 4.471-9.98 9.98 0 5.509 4.471 9.98 9.98 9.98 5.51 0 9.98-4.471 9.98-9.98 0-5.509-4.47-9.98-9.98-9.98z"
            clipRule="evenodd"
          />
          <path d="M25 21.924c-2.595 0-4.702 2.107-4.702 4.702s2.107 4.701 4.702 4.701 4.701-2.106 4.701-4.701c0-2.595-2.106-4.702-4.701-4.702zm0 7.676c-1.927 0-3.497-1.57-3.497-3.474s1.57-3.474 3.497-3.474c1.927 0 3.497 1.57 3.497 3.474s-1.57 3.474-3.497 3.474z" />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer  rounded-md font-medium  hover:text-green-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 "
            style={{ background: "rgba(255, 255, 255, 0.85)" }}
          >
            <span className="text-primary p-1 font-semibold">
              Upload a logo
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only bg-black"
              onChange={handleFileChange}
            />
          </label>
          <p className="pl-2 text-white min-w-10">
            {selectedFile ? truncateFileName(selectedFile.name, 20): "No file selected"}
          </p>
        </div>
        <p className="text-xs text-white">PNG, JPG, SVG up to 10MB</p>
      </div>
    </div>
  );
}
