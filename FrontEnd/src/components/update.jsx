import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";

import { editMatch } from "../redux/slice/matchSlice";

export const EditPopUpSelectedMatch = (props) => {
  // pop up logic --------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  // Initialize state for edited values
  const [editedTime, setEditedTime] = useState("");

  // Initialize flag to track changes
  const [isChanged, setIsChanged] = useState(false);

  // Update edited values only if the input fields are changed
  const dispatch = useDispatch();
  const handleNameChange = (e) => {
    setEditedTime(e.target.value);
    setIsChanged(true);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (isChanged) {
      dispatch(
        editMatch({
          matchid: props.matchid,
          time: editedTime || props.Mname,
          //   TeamLogo: props.Tlogo ,
        })
      );
    }
    handleClose();
  };

  return (
    <>
      <Button className="popUpButton" variant="success" onClick={handleShow}>
        Edit Team
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="popUpWindowBlackColor">
          <Modal.Title>Edit Team </Modal.Title>
        </Modal.Header>
        <Modal.Body className="popUpWindowBlackColor">
          <Form className="popUpWindowBlackColor">
            <Form.Group className="mb-3">
              <Form.Label className="popUpWindowLabelColor">
                Team Name :{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="change Academy Name"
                autoFocus
                value={editedTime || props.Mname}
                onChange={handleNameChange}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer className="popUpWindowBlackColor">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPopUpSelectedMatch;
