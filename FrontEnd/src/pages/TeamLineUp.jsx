import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import SoccerField from "../../public/assets/images/soccer_field.jpg";
import axios from "axios";
import LineUpSearchItem from "../Dashboard/src/components/LineUp/LineUpSearchItem";
const TeamLineUp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState({});

  const [isOpen, setIsOpen] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/team");
        setPlayers(response.data[0].Players);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const filteredPlayers = players
    .filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 7);

  const handleSelectPlayer = (player, selectedPosition) => {
    setSelectedPlayers({ ...selectedPlayers, [selectedPosition]: player });
    console.log(selectedPlayers);
    setSearchTerm("");
    setIsOpen("");
  };
  return (
    <div>
      <div className="bg-gray-100 pt-4">
        <h1 class="max-w-3xl mx-auto text-center pt-4 h2 text-black-2 font-inter">
          Create your own football formation
        </h1>
        <div className="p-12">
          <div className="font-semibold flex gap-50 justify-around pb-4">
            <p>Formation: 4 3 3</p>
            <p>Team: PSG</p>
            <p>Theme</p>
          </div>
          <div className="flex gap-8">
            <div className="w-3/5 relative">
              <img
                src={SoccerField}
                alt="soccer-field"
                className="w-full h-auto rounded-lg border-2 border-black-2"
              />
              <div
                className="absolute"
                style={{
                  top: "87.5%",
                  left: "49.5%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["GK"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["GK"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center font-medium bg-black-2 rounded-full">
                    GK
                  </div>
                )}
              </div>
              <div
                className="absolute"
                style={{
                  top: "68%",
                  left: "12%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["LB"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["LB"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#874996] rounded-full  w-12 h-12 flex items-center justify-center font-medium">
                    LB
                  </div>
                )}
              </div>
              <div
                className="absolute"
                style={{
                  top: "78.75%",
                  left: "32%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["CB1"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["CB1"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#5e4e9c] rounded-full w-12 h-12 flex items-center justify-center font-medium">
                    CB1
                  </div>
                )}
              </div>
              <div
                className="absolute"
                style={{
                  top: "78.75%",
                  left: "68%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["CB2"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["CB2"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#5e4e9c] rounded-full w-12 h-12 flex items-center justify-center font-medium">
                    CB2
                  </div>
                )}
              </div>
              <div
                className="absolute"
                style={{
                  top: "68%",
                  left: "88%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["RB"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["RB"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#874996] rounded-full  w-12 h-12 flex items-center justify-center font-medium">
                    RB
                  </div>
                )}
              </div>
              <div
                className="absolute"
                style={{
                  top: "50%",
                  left: "20%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["CM1"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["CM1"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className=" bg-[#ab3e8f] rounded-full  w-12 h-12 flex items-center justify-center font-medium">
                    CM1
                  </div>
                )}
              </div>
              <div
                className="absolute "
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["CM2"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["CM2"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#ab3e8f] rounded-full  w-12 h-12 flex items-center justify-center font-medium">
                    CM2
                  </div>
                )}
              </div>
              <div
                className="absolute "
                style={{
                  top: "50%",
                  left: "80%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["CM3"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["CM3"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#ab3e8f] rounded-full  w-12 h-12 flex items-center justify-center font-medium">
                    CM3
                  </div>
                )}
              </div>

              <div
                className="absolute"
                style={{
                  top: "25%",
                  left: "25%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["LW"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["LW"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#ca2c88] rounded-full  w-12 h-12 flex items-center justify-center font-medium">
                    LW
                  </div>
                )}
              </div>
              <div
                className="absolute"
                style={{
                  top: "16%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["ST"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["ST"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#e5007d] rounded-full  w-12 h-12 flex items-center justify-center font-medium">
                    ST
                  </div>
                )}
              </div>
              <div
                className="absolute"
                style={{
                  top: "25%",
                  left: "75%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPlayers && selectedPlayers["RW"] ? (
                  <div>
                    <div className="flex flex-col items-center ">
                      <img
                        src={"/assets/images/avatar_placeholder.jpg"}
                        alt="Product"
                        width={70}
                      />
                      <p className="bg-black-2 bg-opacity-60 rounded-lg p-2 shadow-lg">
                        {selectedPlayers["RW"].name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#ca2c88] rounded-full  w-12 h-12 flex items-center justify-center font-medium">
                    RW
                  </div>
                )}
              </div>
            </div>

            <div class="flex flex-col w-full bg-white p-4 rounded-md border-2 border-primary">
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Position
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Search
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Player Name
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Remove
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"ST"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"LW"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"RW"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"CM1"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"CM2"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"CM3"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"LB"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"RB"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"CB1"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"CB2"}
                        />
                        <LineUpSearchItem
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          filteredPlayers={filteredPlayers}
                          handleSelectPlayer={handleSelectPlayer}
                          selectedPlayers={selectedPlayers}
                          setSelectedPlayers={setSelectedPlayers}
                          position={"GK"}
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/**end here */}
          </div>
        </div>
      </div>
    </div>
  );
};
//
export default TeamLineUp;
