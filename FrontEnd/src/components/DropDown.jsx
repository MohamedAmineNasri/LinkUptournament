import Dropdown from "react-bootstrap/Dropdown";
import EditPopUp from "./EditPopUp";
import AddTeamPopUpWindow from "./AddTeamPopUpWindow";

function DropDown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ backgroundColor: "#8bc34a" }}>
        <Dropdown.Item href="#/action-1">
          <EditPopUp></EditPopUp>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          <AddTeamPopUpWindow></AddTeamPopUpWindow>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
