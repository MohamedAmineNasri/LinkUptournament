import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteTeam } from "../../redux/slice/teamSlice";
import { Typography, Box, Stack } from "@mui/material";

//i called this component in team card , propos is  the team id fetched from db as TeamCard compoenet
export const DeleteTeamNew = (props) => {
  // delete logic
  const dispatch = useDispatch();
  const handledeleteChanges = () => {
    dispatch(deleteTeam(props.teamid));
    window.location.reload();
  };

  return (
    <>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Are you sure you want to delete this team ? {props.Tname}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            style={{ backgroundColor: "rgb(255 26 75)" }}
            variant="contained"
            color="error" // Consistent color for "Delete" button
            onClick={handledeleteChanges}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default DeleteTeamNew;
