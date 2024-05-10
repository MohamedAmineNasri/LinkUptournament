import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "../../api/axios";

const Tourn = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    const fetchtournaments = async () => {
      const response = await axios.get("http://localhost:8000/tourn");
      setTournaments(response.data);
    };
    fetchtournaments();
    console.log(tournaments);
  }, []);
  return (
    <div className="rounded-sm border p-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-4 px-2 md:px-2 xl:px-3.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Tournaments
        </h4>

        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
          onClick={() => {
            navigate("/manage/addtourn");
          }}
        >
          Add Tournament
        </button>
      </div>

      {tournaments?.length == 0 ? (
        <div className="py-6 px-4 md:px-6 xl:px-7.5 h-100 flex flex-col items-center justify-center">
          <h4 className="md:text-xl text-lg font-semibold text-black dark:text-white">
            Looks like there are no tournaments to display.
          </h4>
        </div>
      ) : (
        <div>
          <div className="py-4 px-2 md:px-2 xl:px-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {tournaments.map((tournament, index) => (
                <div
                  key={index}
                  className="bg-black-2 h-65 relative  hover:scale-105 transition-all duration-300 cursor-default hover:text-primary"
                  onClick={() => {
                    {
                      if (tournament.type == "group") {
                        navigate(`/manage/group/${tournament._id}`);
                      } else {
                        navigate(`/manage/bracket/${tournament._id}`, {
                          state: tournament.teams,
                        });
                      }
                    }
                  }}
                >
                  <p
                    className="text-9xl font-semibold absolute bottom-0 right-6"
                    style={{ userSelect: "none" }}
                  >
                    {index + 1}
                  </p>
                  <h2
                    className="text-3xl uppercase max-w-50 p-4"
                    style={{ position: "absolute" }}
                  >
                    {tournament.name}
                  </h2>
                  <div className="absolute top-5 right-0"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tourn;
