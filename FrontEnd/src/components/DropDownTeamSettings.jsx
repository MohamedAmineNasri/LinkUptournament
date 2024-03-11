import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DeleteTeamPopUp from "./DeleteTeamPopUp";

function DropDownTeamSettings(props) {
  return (
    <div className="mb-4" style={{ textAlignLast: "right" }}>
      <DropdownButton size="lg" title="Settings">
        <Dropdown.Item eventKey="3">Add Players</Dropdown.Item>
        <Dropdown.Item eventKey="2">Check Players</Dropdown.Item>
        <DeleteTeamPopUp teamid={props.idTeam}></DeleteTeamPopUp>
      </DropdownButton>
    </div>
  );
}

export default DropDownTeamSettings;
