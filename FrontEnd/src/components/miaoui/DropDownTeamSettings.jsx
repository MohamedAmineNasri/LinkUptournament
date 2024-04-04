import DeleteTeamPopUp from "./DeleteTeamPopUp";
import Button from "react-bootstrap/Button";
import EditPopUpSelectedTeam from "./EditPopUpSelectedTeam";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

function DropDownTeamSettings(props) {
  const navigate = useNavigate();
  return (
    <div className="m-3 textAlignRight">
      <Dropdown>
        <Dropdown.Toggle
          style={{ backgroundColor: "#8bc34a" }}
          variant="success"
        >
          Settings
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{ backgroundColor: "#8bc34a ", containerType: "inline-size" }}
        >
          {/* check players ----------------------------------------------------- */}
          <Button
            variant="success"
            style={{
              width: "-webkit-fill-available",
              backgroundColor: "#8bc34a",
            }}
            onClick={() => navigate(`/team/${props.idTeam}`)}
          >
            Check Team
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
