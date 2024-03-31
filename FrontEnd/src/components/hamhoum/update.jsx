import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";

import { editMatch } from "../../redux/slice/matchSlice";

export const EditPopUpSelectedMatch = (props) => {
  // pop up logic --------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Initialize state for edited values
  const [editedTime, setEditedTime] = useState(null);
  const [editedDate, setEditedDate] = useState(null);
  const [editedType, setEditedType] = useState(null);
  const [editedLoc, setEditedLoc] = useState(null);

  // Initialize flag to track changes
  const [isChanged, setIsChanged] = useState(false);

  // Update edited values only if the input fields are changed
  const dispatch = useDispatch();
  const handleTimeChange = (e) => {
    setEditedTime(e.target.value);
    setIsChanged(true);
  };
  const handleDateChange = (e) => {
    setEditedDate(e.target.value);
    setIsChanged(true);
  };
  const handleTypeChange = (e) => {
    setEditedType(e.target.value);
    setIsChanged(true);
  };
  const handleLocChange = (e) => {
    setEditedLoc(e.target.value);
    setIsChanged(true);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (isChanged) {
      dispatch(
        editMatch({
          matchid: props.matchid,
          startingtime: editedTime || props.time,
          date: editedDate || props.date,
          matchtype: editedType || props.type,
          location: editedLoc || props.location,
        })
      );
    }
    window.location.reload();
    handleClose();
  };

  return (
    <>
      <Button  variant="success" onClick={handleShow}>
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
                match time :{" "}
              </Form.Label>
              <Form.Control
                type="time"
                placeholder="change Academy Name"
                autoFocus
                value={editedTime || props.time}
                onChange={(e) => handleTimeChange(e)}
              />
              <Form.Label className="popUpWindowLabelColor">
                Date :{" "}
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="change Academy Name"
                autoFocus
                value={editedDate || props.date}
                onChange={(e) => handleDateChange(e)}
              />
              <Form.Label className="popUpWindowLabelColor">
                match type :{" "}
              </Form.Label>
              <Form.Control
                type="type"
                placeholder="change Academy Name"
                autoFocus
                value={editedType || props.type}
                onChange={(e) => handleTypeChange(e)}
              />
              <Form.Label className="popUpWindowLabelColor">
                location :{" "}
              </Form.Label>
              <Form.Control
                type="type"
                placeholder="change Academy Name"
                autoFocus
                value={editedLoc || props.location}
                onChange={(e) => handleLocChange(e)}
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
