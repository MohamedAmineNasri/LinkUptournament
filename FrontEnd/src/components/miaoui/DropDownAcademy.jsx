import Dropdown from "react-bootstrap/Dropdown";
import EditPopUpAcademy from "./EditPopUpAcademy";
import AddTeamPopUpWindow from "./AddTeamPopUpWindow";

function DropDownAcademy(props) {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          style={{ backgroundColor: "#8bc34a" }}
          variant="success"
        >
          Options
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ backgroundColor: "#8bc34a" }}>
          <div>
            <EditPopUpAcademy
              id={props.id}
              academyname={props.academyname}
            ></EditPopUpAcademy>
          </div>
          <AddTeamPopUpWindow
            id={props.id}
            aLogo={props.academyLogo}
          ></AddTeamPopUpWindow>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDownAcademy;
