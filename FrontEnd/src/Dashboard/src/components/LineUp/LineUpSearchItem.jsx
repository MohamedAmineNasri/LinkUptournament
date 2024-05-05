import React from "react";

const LineUpSearchItem = ({
  searchTerm,
  setSearchTerm,
  isOpen,
  setIsOpen,
  filteredPlayers,
  handleSelectPlayer,
  selectedPlayers,
  setSelectedPlayers,
  position,
}) => {
  return (
    <tr class="hover:bg-blue-gray-200 dark:hover:bg-neutral-700">
      <td class="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
        <p className="pl-4">{position}</p>
      </td>
      <td class="px-6 py-1 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        <div className="">
          <div className="relative">
            <input
              type="text"
              className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none w-full text-black-2 focus:border-primary"
              placeholder="Search players..."
              value={isOpen == position ? searchTerm : ""}
              onChange={(e) => {
                isOpen == position ? setSearchTerm(e.target.value) : "";
              }}
              onClick={() => setIsOpen(position)}
            />
            <button
              className="text-gray-500 font-normal absolute top-0 right-3 h-full"
              onClick={() => {
                setIsOpen("");
                setSearchTerm("");
              }}
            >
              X
            </button>
          </div>
          <div className=" bg-green-300">
            {isOpen == position && (
              <ul className=" absolute z-10  bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                {filteredPlayers.map((player) => (
                  <li
                    key={player.id}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-black-2"
                    onClick={() => handleSelectPlayer(player, position)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          player?.avatar
                            ? player?.avatar
                            : "/assets/images/avatar_placeholder.jpg"
                        }
                        alt="Product"
                        width={40}
                      />
                      <div>
                        <h5 className="font-medium text-black ">
                          {player.name}
                        </h5>
                        <h5 className="font-medium text-black ">
                          {player.position}
                        </h5>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </td>
      <td class="px-6 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        {selectedPlayers && selectedPlayers[position] && (
          <div className="flex items-center gap-3">
            <img
              src={
                selectedPlayers[position]?.avatar
                  ? selectedPlayers[position]?.avatar
                  : "/assets/images/avatar_placeholder.jpg"
              }
              alt="Product"
              width={40}
            />
            <h5 className="font-medium text-black dark:text-white">
              {selectedPlayers[position].name}
            </h5>
          </div>
        )}
      </td>
      <td class="px-6 py-1 whitespace-nowrap text-end text-sm font-medium">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:text-red-500 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400"
          onClick={() => {
            let obj = { ...selectedPlayers };
            delete obj[position];
            console.log(obj);
            setSelectedPlayers(obj);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default LineUpSearchItem;
