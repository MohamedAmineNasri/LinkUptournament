import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import TeamLogo from "/assets/images/team_placeholder.png";
import { PieChart } from "@mui/x-charts/PieChart";
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

const ConsultTeam = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex  items-center justify-center relative">
        <h4
          className="text-base font-semibold text-black dark:text-bodygray absolute left-6 *:hover:text-primary cursor-pointer"
          onClick={() => {
            navigate("/manage/participant/team");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
          <span className="uppercase">Go Back</span>
        </h4>

        <h4 className="text-xl uppercase font-semibold text-black dark:text-white ">
          Consulting <span className="text-primary">Team Details</span>
        </h4>
      </div>
      <div className="flex justify-center items-center p-10">
        <img src={TeamLogo} alt="Product" width={150} />
        <h2 className="text-lg font-semibold text-black dark:text-bodygray">
          Real Madrid
        </h2>
      </div>
      <div className="flex items-center justify-center flex-col xl:flex-row p-4 gap-4">
        <div className="w-full xl:w-1/2 ">
          <div className="rounded-md border border-strokedark bg-[#2d3b4c] px-4 pt-8 pb-4 h-125">
            <Root>
              <span className="text-bodygray flex items-center justify-center">
                50
              </span>
              <WhiteDivider className="text-bodygray">
                <TextWrapper>Total matches played</TextWrapper>
              </WhiteDivider>
              <span className="text-bodygray flex items-center justify-center">
                40
              </span>
              <WhiteDivider className="text-bodygray">
                <TextWrapper>Total matches Win</TextWrapper>
              </WhiteDivider>
              <span className="text-bodygray flex items-center justify-center">
                5
              </span>
              <WhiteDivider className="text-bodygray">
                <TextWrapper>Total matches drawn</TextWrapper>
              </WhiteDivider>
              <span className="text-bodygray flex items-center justify-center">
                5
              </span>
              <WhiteDivider className="text-bodygray">
                <TextWrapper>Total matches lost</TextWrapper>
              </WhiteDivider>
              <span className="text-bodygray flex items-center justify-center">
                5
              </span>
              <WhiteDivider className="text-bodygray">
                <TextWrapper>Total goals scored</TextWrapper>
              </WhiteDivider>
              <span className="text-bodygray flex items-center justify-center">
                32
              </span>
              <WhiteDivider className="text-bodygray">
                <TextWrapper>Total goals received</TextWrapper>
              </WhiteDivider>
            </Root>
          </div>
        </div>
        <div className="w-full xl:w-1/2 ">
          <div className="rounded-md border border-strokedark bg-[#2d3b4c] h-125 flex justify-center items-center ">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 40, label: "Total Matches Win" },
                    { id: 1, value: 5, label: "Total Matches Drawn" },
                    { id: 2, value: 5, label: "Total Matches Lost" },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={480}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <div className="flex rounded-md border border-strokedark bg-[#2d3b4c] xl:p-10">
          {true ? (
            <div>
              <div className="uppercase my-5 text-graydark dark:text-bodygray font-medium text-lg text-center mb-10">
                Team{" "}
                <span className="uppercase text-primary font-bold">
                  Squad Consult
                </span>
              </div>
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

export default ConsultTeam;
