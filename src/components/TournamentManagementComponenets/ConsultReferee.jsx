import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomCard from "../CustomCard";

const ConsultReferee = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex  items-center justify-center relative">
        <h4
          className="text-base font-semibold text-black dark:text-bodygray absolute left-6 *:hover:text-primary cursor-pointer"
          onClick={() => {
            navigate("/manage/participant/referee");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
          <span className="uppercase">Go Back</span>
        </h4>

        <h4 className="text-xl uppercase font-semibold text-black dark:text-white ">
          Consulting <span className="text-primary">Referee Details</span>
        </h4>
      </div>

      <div className="p-4 pt-0">
        <div className="flex rounded-md border border-strokedark bg-[#2d3b4c] p-10 ">
          {true ? (
            <div>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={5}>
                  {[0, 1, 2, 3, 4, 5].map((item) => {
                    return (
                      <Grid item xs={8} md={4} lg={3}>
                        <CustomCard />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </div>
          ) : (
            <div className="my-5 text-graydark dark:text-bodygray font-medium text-center h-75 flex justify-center items-center">
              <span className="text-primary font-black">Oops!</span>&nbsp; There
              are no players available for consultation at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ConsultReferee;
