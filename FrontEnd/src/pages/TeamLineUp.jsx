import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import SoccerField from "../../public/assets/images/soccer_field.jpg";
import axios from "axios";
const TeamLineUp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/team");
        setPlayers(response.data[0].Players);
        // console.log(response.data[0].Players);
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
    setIsOpen(false);
  };
  return (
    <div>
      <HomeHeader />
      <div className="bg-dark  pt-35">
        <h1 className="text-center uppercase font-bold text-2xl">
          Create your own football formation
        </h1>
        <div className="w-[99vw]  p-4 ">
          <div className="font-semibold flex gap-50 justify-around pb-4">
            <p>Formation</p>
            <p>Team : PSG</p>
            <p>Theme</p>
          </div>
          <div className="flex gap-8">
            <div className="w-3/5 relative">
              <img
                src={SoccerField}
                alt="soccer-field"
                className="w-full h-auto"
              />
              <div
                className="w-10 h-10 bg-red-500 rounded-full absolute  text-center pt-2"
                style={{
                  top: "87.5%",
                  left: "49.5%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                GK
              </div>
              <div
                className="w-10 h-10 bg-blue-500 rounded-full absolute text-center pt-2"
                style={{
                  top: "70%",
                  left: "12%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                LB
              </div>
              <div
                className="w-10 h-10 bg-yellow-500 rounded-full absolute  text-center pt-2"
                style={{
                  top: "78.75%",
                  left: "32%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                CB
              </div>
              <div
                className="w-10 h-10 bg-red-500 rounded-full absolute text-center pt-2"
                style={{
                  top: "78.75%",
                  left: "68%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                CB
              </div>
              <div
                className="w-10 h-10 bg-green-500 rounded-full absolute text-center pt-2"
                style={{
                  top: "70%",
                  left: "88%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                RB
              </div>
              <div
                className="w-10 h-10 bg-red-500 rounded-full absolute  text-center pt-2"
                style={{
                  top: "50%",
                  left: "12%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                CM
              </div>
              <div
                className="w-10 h-10 bg-pink-500 rounded-full absolute  text-center pt-2"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                CM
              </div>
              <div
                className="w-10 h-10 bg-fuchsia-500 rounded-full absolute text-center pt-2"
                style={{
                  top: "50%",
                  left: "88%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                CM
              </div>
              <div
                className="w-10 h-10 bg-yellow-500 rounded-full absolute text-center pt-2"
                style={{
                  top: "22%",
                  left: "20%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                LW
              </div>
              <div
                className="absolute"
                style={{
                  top: "20%",
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
                  <div className="w-10 h-10 bg-[#737ebc] rounded-full  text-center font-bold pt-2">
                    ST
                  </div>
                )}
              </div>
              <div
                className="w-10 h-10 bg-yellow-500 rounded-full absolute text-center pt-2"
                style={{
                  top: "22%",
                  left: "80%",
                  transform: "translate(-50%, -50%)",
                }}
              >
               RW
              </div>
            </div>

            <div
              className=" w-full"
              style={{ boxShadow: "0px 0px 9px 3px rgba(0, 0, 0, 1)" }}
            >
              <div className="flex bg-green-500 justify-around">
                <p className="uppercase">Position</p>
                <p className="uppercase">Search</p>
                <p className="uppercase">Player Name</p>
                <p className="uppercase">Remove</p>
              </div>
              <div className="flex justify-around p-4">
                <p
                  className="uppercase p-2 rounded-sm"
                  style={{ background: "rgb(115, 126, 188)" }}
                >
                  ST
                </p>
                {/** Search Player */}
                <div className="">
                  <div className="relative">
                    <input
                      type="text"
                      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none text-black-2 focus:border-blue-500"
                      placeholder="Search players..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={() => setIsOpen(true)}
                    />
                    <button
                      className="text-blue-500 absolute top-0 right-3 h-full"
                      onClick={() => {
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      X
                    </button>
                  </div>
                  {isOpen && (
                    <ul className="absolute z-10  bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                      {filteredPlayers.map((player) => (
                        <li
                          key={player.id}
                          className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-black-2"
                          onClick={() => handleSelectPlayer(player, "ST")}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={"/assets/images/avatar_placeholder.jpg"}
                              alt="Product"
                              width={40}
                            />
                            <div>
                              <h5 className="font-medium text-black dark:text-white">
                                {player.name}
                              </h5>
                              <h5 className="font-medium text-black dark:text-white">
                                {player.position}
                              </h5>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/** Search Player */}
                {selectedPlayers && (
                  <div className="flex items-center gap-3">
                    <img
                      src={"/assets/images/avatar_placeholder.jpg"}
                      alt="Product"
                      width={40}
                    />
                    <h5 className="font-medium text-white">
                      {selectedPlayers["ST"].name}
                    </h5>
                  </div>
                )}
                <button className="h-8 w-8 bg-red-600 rounded-sm" >X</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//
export default TeamLineUp;
