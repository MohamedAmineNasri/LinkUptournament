import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomCard from "../CustomCard";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
const WhiteDivider = styled(Divider)(({ theme }) => ({
  "&::before, &::after": {
    borderColor: "white",
  },
}));
const TextWrapper = styled("span")({
  width: 200, // Set the width to 250px
  display: "inline-block",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: 500,
});

const ConsultPlayer = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-sm border p-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-2 md:px-2 xl:px-3.5 flex  items-center justify-center relative">
        <h4
          className="text-base font-semibold text-black dark:text-bodygray absolute left-6 *:hover:text-primary cursor-pointer"
          onClick={() => {
            navigate("/manage/participant/player");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
          <span className="uppercase">Go Back</span>
        </h4>

        <h4 className="text-xl uppercase font-semibold text-black dark:text-white ">
          Consulting <span className="text-primary">Player Details</span>
        </h4>
      </div>
      <div className="flex justify-center items-center gap-5 flex-col md:flex-row md:items-stretch">
        <div className="">
          <Card sx={{ maxWidth: 340, background: "transparent" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/assets/images/avatar_placeholder.jpg"
                alt="green iguana"
              />
              <CardContent className="bg-white dark:bg-[#2d3b4c]">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="text-black dark:text-white"
                >
                  Eduardo Camavinga
                </Typography>
                <Typography
                  variant="body2"
                  className="text-black dark:text-bodygray"
                >
                  <span className="text-center block uppercase mb-1">
                    shots on goal
                  </span>
                  <div className="flex justify-center items-center gap-2">
                    <p className="w-[8%]">15</p>
                    <div class="h-3 relative w-[90%] bg-white rounded-full overflow-hidden ">
                      <div class=" w-full h-full bg-gray-200 absolute "></div>
                      <div
                        class=" h-full bg-[#258046] absolute"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <p className="w-[8%]">15</p>
                  </div>
                  <span className="text-center block uppercase my-1">
                    corners
                  </span>
                  <div className="flex justify-center items-center gap-2">
                    <p className="w-[8%]">6</p>
                    <div class="h-3 relative w-[90%] bg-white rounded-full overflow-hidden ">
                      <div class=" w-full h-full bg-gray-200 absolute "></div>
                      <div
                        class=" h-full bg-[#31a85c] absolute"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <p className="w-[8%]">7</p>
                  </div>
                  <span className="text-center block uppercase my-1">
                    penalties
                  </span>
                  <div className="flex justify-center items-center gap-2">
                    <p className="w-[8%]">5</p>
                    <div class="h-3 relative w-[90%] bg-white rounded-full overflow-hidden ">
                      <div class=" w-full h-full bg-gray-200 absolute "></div>
                      <div
                        class=" h-full bg-[#43c873] absolute"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <p className="w-[8%]">15</p>
                  </div>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="w-full p-4 rounded-md border border-strokedark bg-[#2d3b4c] ">
          <div class="divide-y divide-dashed">
            <div className="flex py-5 ">
              <span className="flex-1 text-white font-bold">Team</span>
              <span className="flex-1 text-bodygray">Real Madrid</span>
            </div>
            <div className="flex py-5">
              <span className="flex-1 text-white font-bold">Number</span>
              <span className="flex-1 text-bodygray">10</span>
            </div>
            <div className="flex py-5">
              <span className="flex-1 text-white font-bold">Position</span>
              <span className="flex-1 text-bodygray">Second Striker</span>
            </div>
            <div className="flex py-5">
              <span className="flex-1 text-white font-bold">Skills</span>
              <span className="flex-1 text-bodygray">Dribblage, Shoot...</span>
            </div>
            <div className="flex py-5">
              <span className="flex-1 text-white font-bold">
                Academic Membership
              </span>
              <span className="flex-1 text-bodygray">ZTA5OVGQw</span>
            </div>
            <div className="flex py-5">
              <span className="flex-1 text-white font-bold">Status</span>
              <span className="flex-1 font-bold ">
                <Chip label="verified" color="success" variant="outlined" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultPlayer;
