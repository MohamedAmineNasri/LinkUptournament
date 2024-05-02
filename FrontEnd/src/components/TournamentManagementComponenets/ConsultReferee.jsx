import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
const ConsultReferee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const referee = location.state;

  return (
    <div className="rounded-sm border p-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-2 md:px-2 xl:px-3.5 flex  items-center justify-center relative">
        <h4
          className="text-base font-semibold dark:text-white text-black dark:text-bodygray absolute left-6 *:hover:text-primary cursor-pointer"
          onClick={() => {
            navigate("/manage/participant/referee");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
          <span className="uppercase ">Go Back</span>
        </h4>

        <h4 className="text-xl uppercase font-semibold text-black  dark:text-white ">
          Consulting <span className="text-primary">Referee Details</span>
        </h4>
      </div>
      <div className="flex justify-center items-center gap-5 flex-col md:flex-row md:items-stretch">
        <div className="bg-slate-50 dark:bg-transparent border border-primary rounded-md">
          <Card
            sx={{ maxWidth: 340, height: "100%", background: "transparent" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={
                  referee.avatar
                    ? referee.avatar
                    : "/assets/images/avatar_placeholder.jpg"
                }
                alt="green iguana"
              />
              <CardContent className="mt-4">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="text-black text-center uppercase dark:text-white"
                >
                  {referee.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="w-full p-4 rounded-md border border-primary dark:bg-[#2d3b4c] bg-slate-50">
          <div class="divide-y divide-dashed">
            <div className="flex py-5 text-black dark:text-white">
              <span className="flex-1 font-bold">Country</span>
              <span className="flex-1 text-bodygray">{referee.country}</span>
            </div>
            <div className="flex py-5 text-black dark:text-white">
              <span className="flex-1  font-bold">Location</span>
              <span className="flex-1 text-bodygray">{referee.location}</span>
            </div>
            <div className="flex py-5 text-black dark:text-white">
              <span className="flex-1 font-bold">Availability</span>
              <span className="flex-1 text-bodygray">
                {referee.availability}
              </span>
            </div>
            <div className="flex py-5 text-black dark:text-white">
              <span className="flex-1  font-bold">Role</span>
              <span className="flex-1 text-bodygray">{referee.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConsultReferee;
