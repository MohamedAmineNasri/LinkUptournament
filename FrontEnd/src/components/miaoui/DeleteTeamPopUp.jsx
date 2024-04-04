import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteTeam } from "../../redux/slice/teamSlice";

//i called this component in team card , propos is  the team id fetched from db as TeamCard compoenet
export const DeleteTeamPopUp = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // delete logic
  const dispatch = useDispatch();
  const handledeleteChanges = () => {
    dispatch(deleteTeam(props.teamid));
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ width: "-webkit-fill-available", backgroundColor: "#8bc34a" }}
      >
        Delete Team
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="popUpWindowBlackColor">
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="popUpWindowBlackColor">
          Are you sure you want to delete this team ? {props.teamid}
        </Modal.Body>
        <Modal.Footer className="popUpWindowBlackColor">
          <Button
            style={{ backgroundColor: "#8bc34a" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: "rgb(255 26 75)" }}
            variant="primary"
            onClick={handledeleteChanges}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTeamPopUp;
