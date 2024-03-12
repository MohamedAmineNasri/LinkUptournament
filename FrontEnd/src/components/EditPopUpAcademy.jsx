import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useSelector, useDispatch } from "react-redux";
import { fetchAcademyById, editAcademy } from "../redux/slice/academySlice";

export const EditPopUpAcademy = (props) => {
  // pop up logic --------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  // fetch academyById -------------
  const {
    academyDataById,
    loading: academyByIdLoading,
    error: academyByIdError,
  } = useSelector((state) => state.academy);
  useEffect(() => {
    dispatch(fetchAcademyById(props.id));
  }, [dispatch]);

  //date correct format
  let formattedDate = "";
  if (academyDataById.FoundedYear) {
    const date = new Date(academyDataById.FoundedYear);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }

  // Initialize state for edited values
  const [editedName, setEditedName] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedDate, setEditedDate] = useState("");

  // Initialize flag to track changes
  const [isChanged, setIsChanged] = useState(false);

  // Update edited values only if the input fields are changed
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
    setIsChanged(true);
  };

  const handleLocationChange = (e) => {
    setEditedLocation(e.target.value);
    setIsChanged(true);
  };

  const handleDateChange = (e) => {
    setEditedDate(e.target.value);
    setIsChanged(true);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (isChanged) {
      dispatch(
        editAcademy({
          id: props.id,
          name: editedName || academyDataById.AcademyName,
          location: editedLocation || academyDataById.Location,
          date: editedDate || academyDataById.FoundedYear,
        })
      );
    }
    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Edit Academy
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="popUpWindowBlackColor" closeButton>
          <Modal.Title>Edit Academy</Modal.Title>
        </Modal.Header>
        <Modal.Body className="popUpWindowBlackColor">
          <Form className="popUpWindowBlackColor">
            <Form.Group className="mb-3" controlId="nameInput">
              <Form.Label className="popUpWindowLabelColor">
                Academy Name :{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="change Academy Name"
                autoFocus
                value={editedName || academyDataById.AcademyName}
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label className="popUpWindowLabelColor">
                Academy Location :
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="change Academy Location"
                autoFocus
                value={editedLocation || academyDataById.Location}
                onChange={handleLocationChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="popUpWindowLabelColor">
                Creation Date :
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="change date "
                autoFocus
                value={editedDate || formattedDate}
                onChange={handleDateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="popUpWindowLabelColor">Logo :</Form.Label>
              <Form.Control type="file" placeholder="Academy Logo" autoFocus />
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

export default EditPopUpAcademy;
