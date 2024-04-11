import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useSelector, useDispatch } from "react-redux";
import { fetchMatchById, editMatch } from "../../redux/slice/matchSlice";

export const EditPopUpmatch = (props) => {
  // pop up logic --------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  // fetch academyById -------------
  const {
    matchDataById,
    loading: matchByIdLoading,
    error: matchByIdError,
  } = useSelector((state) => state.match);
  useEffect(() => {
    dispatch(fetchMatchById(props.matchid));
  }, [dispatch]);

  //date correct format
  

  // Initialize state for edited values
  const [editedTime, setEditedTime] = useState("");
  const [editedType, setEditedType] = useState("");
  
  // Initialize flag to track changes
  const [isChanged, setIsChanged] = useState(false);

  // Update edited values only if the input fields are changed
  const handleTimeChange = (e) => {
    setEditedTime(e.target.value);
    setIsChanged(true);
  };

  const handleTypeChange = (e) => {
    setEditedType(e.target.value);
    setIsChanged(true);
  };

  

  // Handle save changes
  const handleSaveChanges = () => {
    if (isChanged) {
      dispatch(
        editMatch({
          id: props.id,
          startingtime: editedTime || props.time,
          matchtype: editedType || props.type,
          
        })
      );
    }
    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Edit match
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#222831" }} closeButton>
          <Modal.Title>Edit match</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222831" }}>
          <Form style={{ color: "black" }}>
            <Form.Group className="mb-3" controlId="nameInput">
              <Form.Label style={{ color: "white" }}>
                time :{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="change match time"
                autoFocus
                value={editedTime ||props.time}
                onChange={handleTimeChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>
                match type :
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="change match type"
                autoFocus
                value={editedType || props.type}
                onChange={handleTypeChange}
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

export default EditPopUpmatch;