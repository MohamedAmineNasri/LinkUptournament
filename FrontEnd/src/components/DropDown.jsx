import Dropdown from "react-bootstrap/Dropdown";
import EditPopUp from "./EditPopUp";
import AddTeamPopUpWindow from "./AddTeamPopUpWindow";

function DropDown(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Options
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ backgroundColor: "#8bc34a" }}>
        <Dropdown.Item>
          <EditPopUp id={props.id}></EditPopUp>
        </Dropdown.Item>
        <Dropdown.Item>
          <AddTeamPopUpWindow id={props.id}></AddTeamPopUpWindow>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
