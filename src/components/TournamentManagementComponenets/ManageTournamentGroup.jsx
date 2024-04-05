import React from "react";
import { Draw, Lose, Win } from "../GroupStageLogo";
import TeamLogo from "/assets/images/team_placeholder.png";

const ManageTournamentGroup = () => {
  return (
    <div className="rounded-sm border p-4  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs  text-white uppercase bg-gray-50 dark:bg-black-2 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-2 uppercase w-[3%]">
                #
              </th>
              <th scope="col" class="font-normal px-6 py-2 uppercase w-[50%] min-w-50">
                Group A
              </th>
              <th scope="col" class="font-normal px-4 py-2 uppercase w-[3%]">
                MP
              </th>
              <th scope="col" class="font-normal px-4 py-2 uppercase w-[3%]">
                W
              </th>
              <th scope="col" class="font-normal px-4 py-2 uppercase w-[3%]">
                D
              </th>
              <th scope="col" class="font-normal px-4 py-2 uppercase w-[3%]">
                L
              </th>
              <th scope="col" class="font-normal px-4 py-2 uppercase w-[3%]">
                G
              </th>
              <th scope="col" class="font-normal px-4 py-2 uppercase w-[3%]">
                GD
              </th>
              <th scope="col" class="px-4 py-2 uppercase w-[3%]">
                PTS
              </th>
              <th
                scope="col"
                class="text-center font-normal px-6 py-2 uppercase w-[12%]"
              >
                Form
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="dark:bg-fourth dark:border-gray-700 hover:bg-black dark:hover:bg-[#56626f]">
              <td class="px-4 text-white">1.</td>
              <td class="px-6 ">
                <span className="flex gap-1">
                  <img src={TeamLogo} alt="Product" width={20} />
                  Manchester Utd
                </span>
              </td>
              <td class="px-4 ">0</td>
              <td class="px-4 ">0</td>
              <td class="px-4 ">0</td>
              <td class="px-4 ">0</td>
              <td class="px-4 ">0:0</td>
              <td class="px-4 ">0</td>
              <td class="px-4 ">0</td>
              <td class="justify-center px-6 p-3 flex w-50 h-full items-center gap-1">
                <p className="">-</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTournamentGroup;
