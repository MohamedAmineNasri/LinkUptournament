import Dropdown from "react-bootstrap/Dropdown";
import EditPopUp from "./EditPopUp";

function DropDown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="warning" id="dropdown-basic">
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
          <EditPopUp></EditPopUp>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Delete Academy</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
