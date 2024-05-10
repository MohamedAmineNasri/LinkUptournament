import React, { useEffect, useState } from "react";
import Header from "../../components/landingpage/Header";
import Footer from "../../components/landingpage/Footer";
import {
  useLocation,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "../../api/axios";

const TournamentFrontOffice = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  let location = useLocation();
  useEffect(() => {
    const fetchtournaments = async () => {
      const response = await axios.get("http://localhost:8000/tourn");
      setTournaments(response.data);
    };
    fetchtournaments();
    console.log(tournaments);
  }, []);
  return (
    <>
      <main className="grow">
        <div
          className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}
        >
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Header />
            <section className="relative">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                  {/* tournament content */}
                  <div className="pt-4 pb-24">
                    {tournaments?.length == 0 ? (
                      <div className="py-6 px-4 md:px-6 xl:px-7.5 h-100 flex flex-col items-center justify-center">
                        <h4 className="md:text-xl text-lg font-semibold text-black ">
                          Looks like there are no tournaments to display.
                        </h4>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-4xl text-center  font-semibold text-black pb-8">
                          All Tournaments
                        </h4>
                        <div className="py-4 px-2 md:px-2 xl:px-3.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                            {tournaments.map((tournament, index) => (
                              <div
                                key={index}
                                className="bg-black-2 h-65 relative  hover:scale-105 transition-all duration-300 cursor-default text-gray-600 hover:text-primary"
                                onClick={() => {
                                  {
                                    if (tournament.type == "group") {
                                      navigate(
                                        `/tournament/group/${tournament._id}`
                                      );
                                    } else {
                                      navigate(
                                        `/tournament/bracket/${tournament._id}`,
                                        {
                                          state: tournament.teams,
                                        }
                                      );
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
                  {/* tournament content */}
                </div>
              </div>
            </section>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default TournamentFrontOffice;
