import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { fetchAcademyById, editAcademy } from "../redux/slice/academySlice";
import { convertToBase64 } from "../utilities/convertFileBase64";

export const EditPopUpAcademy = (props) => {
  // Pop up logic --------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  // Fetch academyById -------------
  useEffect(() => {
    dispatch(fetchAcademyById(props.id));
  }, [dispatch, props.id]);

  // Redux state
  const { academyDataById, loading: academyByIdLoading } = useSelector(
    (state) => state.academy
  );

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
  const [editedLogo, setEditedLogo] = useState(null); // Updated to null for better handling

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

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setEditedLogo(base64);
      console.log(editedLogo);
      setIsChanged(true);
    }
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
          logo: editedLogo || academyDataById.Logo, // Use the edited logo if provided, else use the existing logo
        })
      );
    }
    handleClose();
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ width: "-webkit-fill-available" }}
      >
        Edit Academy
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="popUpWindowBlackColor">
          <Modal.Title>Edit Academy</Modal.Title>
        </Modal.Header>
        <Modal.Body className="popUpWindowBlackColor">
          <Form className="popUpWindowBlackColor">
            <Form.Group className="mb-3" controlId="nameInput">
              <Form.Label className="popUpWindowLabelColor">
                Academy Name :
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Change Academy Name"
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
                placeholder="Change Academy Location"
                autoFocus
                value={editedLocation || academyDataById.Location}
                onChange={handleLocationChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dateInput">
              <Form.Label className="popUpWindowLabelColor">
                Creation Date :
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Change date"
                autoFocus
                value={editedDate || formattedDate}
                onChange={handleDateChange}
              />
            </Form.Group>

            <Form.Label className="popUpWindowLabelColor">Logo :</Form.Label>
            <Form.Control
              type="file"
              accept=".png"
              onChange={(e) => handleLogoUpload(e)}
            />
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
