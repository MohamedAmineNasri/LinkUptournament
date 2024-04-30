import { useState } from "react";
import { Button } from "@material-tailwind/react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteMatch } from "../../redux/slice/matchSlice";

//i called this component in match card , propos is  the match id fetched from db as matchCard compoenet
export const DeleteMatchPopUp = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // delete logic
  const dispatch = useDispatch();
  const handledeleteChanges = () => {
    dispatch(deleteMatch(props.matchid));
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button variant="danger" size='lg' onClick={handleShow} className="bg-red-500 text-white">
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#222831" }}>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222831" }}>
          Are you sure you want to delete this match ? {props.matchid}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#222831" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handledeleteChanges}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteMatchPopUp;