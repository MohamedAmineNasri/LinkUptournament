import Dropdown from "react-bootstrap/Dropdown";
import EditPopUpAcademy from "./EditPopUpAcademy";
import AddTeamPopUpWindow from "./AddTeamPopUpWindow";

function DropDownAcademy(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Options
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ backgroundColor: "#8bc34a" }}>
        <Dropdown.Item>
          <EditPopUpAcademy id={props.id}></EditPopUpAcademy>
        </Dropdown.Item>
        <Dropdown.Item>
          <AddTeamPopUpWindow id={props.id}></AddTeamPopUpWindow>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownAcademy;
