import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { editTeam, editTeamSameName } from "../../redux/slice/teamSlice";
import { convertToBase64 } from "../../utilities/convertFileBase64";

export const EditPopUpSelectedTeam = (props) => {
  // pop up logic --------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  // Initialize state for edited values
  const [teamName, setteamName] = useState(props.Tname);
  const [editedLogo, setEditedLogo] = useState(null);
  //validator states
  const [nameError, setNameError] = useState("");
  //validator color
  const [namefieldColor, setnamefieldColor] = useState("green");

  // Update edited values only if the input fields are changed
  const handleNameChange = (e) => {
    setteamName(e.target.value);
    if (e.target.value !== "") {
      if (!e.target.value.trim()) {
        setNameError("Academy Name is required");
        setnamefieldColor("red");
      } else if (!/^[a-zA-Z0-9\s]+$/.test(e.target.value)) {
        setNameError("Academy Name should contain only alphabetic characters");
        setnamefieldColor("red");
      } else if (e.target.value.trim().length <= 3) {
        setNameError("Academy Name should be at least 4 characters long");
        setnamefieldColor("red");
      } else {
        setNameError(null);
        setnamefieldColor("green");
      }
    } else {
      setNameError("Academy Name is required");
      setnamefieldColor("red");
    }
  };
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setEditedLogo(base64);
      console.log(editedLogo);
    }
  };

  // Handle save changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!nameError) {
      dispatch(
        editTeam({
          teamid: props.Tid,
          name: teamName || props.Tname,
          logo: editedLogo || props.Tlogo,
        })
      ).then((response) => {
        // console.log(response);
        if (response.payload === false) {
          //name exist in db
          if (teamName === props.Tname) {
            // when user update with the same name (no change but click in button)
            console.log("the name exists");
            console.log("same name");

            dispatch(
              editTeamSameName({
                //we call this update that do not check for duplicate name and do the update
                teamid: props.Tid,
                name: teamName || props.Tname,
                logo: editedLogo || props.Tlogo,
              })
            );
          } else {
            console.log("the name exists");
            setnamefieldColor("red");
            setNameError("name  :    " + teamName + "      do already exists");
          }
        }
      });
    }
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ width: "-webkit-fill-available", backgroundColor: "#8bc34a" }}
      >
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
                value={teamName || props.Tname}
                onChange={(e) => handleNameChange(e)}
                style={{ borderColor: namefieldColor }}
              />
              {nameError && (
                <strong className="text-danger">{nameError}</strong>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="popUpWindowLabelColor">Logo :</Form.Label>
              <Form.Control
                type="file"
                placeholder="Team Logo"
                autoFocus
                onChange={(e) => handleLogoUpload(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="popUpWindowBlackColor">
          <Button
            style={{ backgroundColor: "#8bc34a" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#8bc34a" }}
            variant="success"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPopUpSelectedTeam;
