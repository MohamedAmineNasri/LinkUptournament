import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { addTeam } from "../redux/slice/teamSlice";
import { useDispatch } from "react-redux";

export const AddTeamPopUpWindow = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //add logic
  const [Name, setName] = useState("");
  const [Logo, setLogo] = useState("");

  const dispatch = useDispatch();
  const handleSaveChanges = () => {
    dispatch(
      addTeam({
        name: Name,
        logo: Logo,
      })
    );
    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Team
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#222831" }} closeButton>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222831" }}>
          <Form style={{ color: "black" }}>
            <Form.Group className="mb-3" controlId="nameInput">
              <Form.Label style={{ color: "white" }}>Team Name : </Form.Label>
              <Form.Control
                type="text"
                placeholder="Team name"
                autoFocus
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>Team Logo :</Form.Label>
              <Form.Control
                type="file"
                placeholder="Team Logo"
                autoFocus
                value={Logo}
                onChange={(e) => setLogo(e.target.value)}
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

export default AddTeamPopUpWindow;
