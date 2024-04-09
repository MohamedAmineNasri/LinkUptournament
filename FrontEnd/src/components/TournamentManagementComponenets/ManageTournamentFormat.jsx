import React from "react";
import TeamLogo from "/assets/images/team_placeholder.png";
import { useLocation } from "react-router-dom";

const ManageTournamentFormat = () => {
  const location = useLocation();
  const cc = location.state.PhaseValue;
  console.log(cc);
  return (
    <div className="rounded-sm border  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div class="hidden md:flex items-center justify-around">
        <div
          className={`w-72 p-4 pt-8 text-center  text-lg font-bold text-black dark:text-white ${cc < 8 ? "hidden" : ""}`}
        >
          1/8 Round
        </div>
        <div
          className={`w-72 p-4 pt-8 text-center text-lg font-bold text-black dark:text-white ${cc < 4 ? "hidden" : ""}`}
        >
          Quarterfinals Round
        </div>
        <div class="w-72 p-4 pt-8 text-center text-lg font-bold text-black dark:text-white">
          Semifinals Round
        </div>
        <div class="w-72 p-4 pt-8 text-center text-lg font-bold text-black dark:text-white">
          Final Round
        </div>
      </div>
      <div>
        <div class="flex flex-col md:flex-row items-center ">
          <div class="w-72 p-4 pt-8 text-center text-lg font-bold text-black dark:text-white block md:hidden">
            1/8 Round
          </div>
          <div class={`flex-col flex-1 w-full ${cc == 4 ? "hidden" : ""}`}>
            {Array.from({ length: 8 }, (_, index) => (
              <div class=" h-16 m-4 bg-fourth rounded-md shadow-default border border-stroke dark:border-strokedark p-2">
                <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                  <div className="flex items-center gap-2">
                    <img src={TeamLogo} alt="Product" width={20} />
                    <p className="">Real Madrid</p>
                  </div>
                  <span>3</span>
                </div>
                <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                  <div className="flex items-center gap-2">
                    <img src={TeamLogo} alt="Product" width={20} />
                    <p className="">Barcelone</p>
                  </div>
                  <span>0</span>
                </div>
              </div>
            ))}
          </div>
          <div class="w-72 m-4 text-center text-lg font-bold text-black dark:text-white  block md:hidden">
            Quarterfinals Round
          </div>
          <div class={`flex-col flex-1 w-full ${cc < 4 ? "hidden" : ""}`}>
            <div class=" h-16 m-4 bg-fourth rounded-md shadow-default border border-stroke dark:border-strokedark p-2 ">
              <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                <div className="flex items-center gap-2">
                  <img src={TeamLogo} alt="Product" width={20} />
                  <p className="">Real Madrid</p>
                </div>
                <span>3</span>
              </div>
              <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                <div className="flex items-center gap-2">
                  <img src={TeamLogo} alt="Product" width={20} />
                  <p className="">Barcelone</p>
                </div>
                <span>0</span>
              </div>
            </div>
            <div class="p-8 hidden md:block"></div>
            <div class=" h-16 m-4 bg-fourth rounded-md shadow-default border border-stroke dark:border-strokedark p-2">
              <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                <div className="flex items-center gap-2">
                  <img src={TeamLogo} alt="Product" width={20} />
                  <p className="">Real Madrid</p>
                </div>
                <span>3</span>
              </div>
              <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                <div className="flex items-center gap-2">
                  <img src={TeamLogo} alt="Product" width={20} />
                  <p className="">Barcelone</p>
                </div>
                <span>0</span>
              </div>
            </div>
            <div class="p-8 hidden md:block"></div>
            <div class=" h-16 m-4 bg-fourth rounded-md shadow-default border border-stroke dark:border-strokedark p-2">
              <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                <div className="flex items-center gap-2">
                  <img src={TeamLogo} alt="Product" width={20} />
                  <p className="">Real Madrid</p>
                </div>
                <span>3</span>
              </div>
              <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                <div className="flex items-center gap-2">
                  <img src={TeamLogo} alt="Product" width={20} />
                  <p className="">Barcelone</p>
                </div>
                <span>0</span>
              </div>
            </div>
            <div class="p-8 hidden md:block"></div>
            <div class=" h-16 m-4 bg-fourth rounded-md shadow-default border border-stroke dark:border-strokedark p-2">
              <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                <div className="flex items-center gap-2">
                  <img src={TeamLogo} alt="Product" width={20} />
                  <p className="">Real Madrid</p>
                </div>
                <span>3</span>
              </div>
              <div className="h-1/2 flex justify-between text-bodygray font-medium text-sm">
                <div className="flex items-center gap-2">
                  <img src={TeamLogo} alt="Product" width={20} />
                  <p className="">Barcelone</p>
                </div>
                <span>0</span>
              </div>
            </div>
          </div>

          <div class="w-72 m-4 text-center text-lg font-bold text-black dark:text-white block md:hidden">
            Semifinals Round
          </div>
          <div class="flex-col flex-1 w-full">
            <div class="h-16 m-4 bg-fourth"></div>
            <div class="p-28 hidden md:block"></div>
            <div class="h-16 m-4 bg-fourth"></div>
          </div>

          <div class="w-72 m-4 text-center text-lg font-bold text-black dark:text-white block md:hidden">
            Final Round
          </div>
          <div class="flex-col flex-1 w-full">
            <div class="h-16 m-4 bg-fourth"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTournamentFormat;
