import DeleteTeamPopUp from "./DeleteTeamPopUp";
import Button from "react-bootstrap/Button";
import EditPopUpSelectedTeam from "./EditPopUpSelectedTeam";
import Dropdown from "react-bootstrap/Dropdown";

function DropDownTeamSettings(props) {
  return (
    <div className="m-3 textAlignRight">
      <Dropdown>
        <Dropdown.Toggle variant="success">Settings</Dropdown.Toggle>
        <Dropdown.Menu
          style={{ backgroundColor: "#8bc34a", containerType: "inline-size" }}
        >
          {/* add players ----------------------------------------------------- */}
          <Button variant="success" style={{ width: "-webkit-fill-available" }}>
            Add Players
          </Button>
          {/* check players ----------------------------------------------------- */}
          <Button variant="success" style={{ width: "-webkit-fill-available" }}>
            Check Players
          </Button>
          {/* Edit Team ----------------------------------------------------- */}
          <EditPopUpSelectedTeam
            Tid={props.idTeam}
            Tname={props.teamname}
            Tlogo={props.teamlogo}
          ></EditPopUpSelectedTeam>
          {/* Delete Team ----------------------------------------------------- */}
          <DeleteTeamPopUp teamid={props.idTeam}></DeleteTeamPopUp>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDownTeamSettings;
