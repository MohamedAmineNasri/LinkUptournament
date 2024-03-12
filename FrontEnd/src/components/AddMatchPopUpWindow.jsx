import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { addnewMatch } from "../redux/slice/matchSlice";
import { useDispatch } from "react-redux";

export const AddMatchPopUpWindow = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //add logic
  const [Time, setTime] = useState("");
  const [Type, setType] = useState("");


  const dispatch = useDispatch();
  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch(
        addnewMatch({
         
        startingTime: Time,
        matchType:Type,
       
      })
    );
    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Match
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#222831" }} closeButton>
          <Modal.Title>Add Match</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222831" }}>
          <Form style={{ color: "black" }}>
            
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>starting Time :</Form.Label>
              <Form.Control
                type="text"
                placeholder="starting Time"
                autoFocus
                value={Time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>match Type :</Form.Label>
              <Form.Control
                type="text"
                placeholder="match Type"
                autoFocus
                value={Type}
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#222831" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMatchPopUpWindow;