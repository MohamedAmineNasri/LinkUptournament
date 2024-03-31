import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deletetour } from "../../redux/slice/matchSlice";

//i called this component in match card , propos is  the match id fetched from db as matchCard compoenet
export const DeleteMatchPopUp = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // delete logic
  const dispatch = useDispatch();
  const handledeleteChanges = () => {
    dispatch(deletetour(props.matchid));
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#222831" }}>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222831" }}>
          Are you sure you want to delete this tournement ? {props.matchid}
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