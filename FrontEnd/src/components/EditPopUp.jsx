import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useSelector, useDispatch } from "react-redux";
import { fetchAcademy, editAcademy } from "../redux/slice/academySlice";

export const EditPopUp = () => {
  // pop up logic --------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fetch academy -------------
  const dispatch = useDispatch();
  const { academyData, loading, error } = useSelector((state) => state.academy);

  useEffect(() => {
    dispatch(fetchAcademy());
  }, [dispatch]);
  //date correct format
  const date = new Date(academyData.FoundedYear);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  //edit academy states -------------
  const [editedName, setEditedName] = useState(academyData.AcademyName);
  const [editedLocation, setEditedLocation] = useState(academyData.Location);
  const [editedDate, setEditedDate] = useState(formattedDate);

  const handleSaveChanges = () => {
    dispatch(
      editAcademy({
        name: editedName,
        location: editedLocation,
        date: editedDate,
      })
    );
    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Edit Academy
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#222831" }} closeButton>
          <Modal.Title>Edit Academy</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222831" }}>
          <Form style={{ color: "black" }}>
            <Form.Group className="mb-3" controlId="nameInput">
              <Form.Label style={{ color: "white" }}>
                Academy Name :{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="change Academy Name"
                autoFocus
                value={editedName || academyData.AcademyName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>
                Academy Location :
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="change Academy Location"
                autoFocus
                value={editedLocation || academyData.Location}
                onChange={(e) => setEditedLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "white" }}>
                Creation Date :
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="change date "
                autoFocus
                value={editedDate || formattedDate}
                onChange={(e) => setEditedDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "white" }}>Logo :</Form.Label>
              <Form.Control type="file" placeholder="Academy Logo" autoFocus />
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

export default EditPopUp;
