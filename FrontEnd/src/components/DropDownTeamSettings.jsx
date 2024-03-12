import DropdownButton from "react-bootstrap/DropdownButton";
import DeleteTeamPopUp from "./DeleteTeamPopUp";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditPopUpSelectedTeam from "./EditPopUpSelectedTeam";

function DropDownTeamSettings(props) {
  return (
    <div className="m-3" style={{ textAlignLast: "right" }}>
      <DropdownButton
        as={ButtonGroup}
        variant="success"
        size="lg"
        title="Settings"
      >
        {/* add players ----------------------------------------------------- */}
        <Button
          variant="danger"
          style={{
            width: "-webkit-fill-available",
            textAlignLast: "center",
            border: "none",
            color: "black",
            background: "white",
          }}
        >
          Add Players
        </Button>
        {/* check players ----------------------------------------------------- */}
        <Button
          variant="danger"
          style={{
            width: "-webkit-fill-available",
            textAlignLast: "center",
            border: "none",
            color: "black",
            background: "white",
          }}
        >
          Check Players
        </Button>
        <EditPopUpSelectedTeam
          Tid={props.idTeam}
          Tname={props.teamname}
          Tlogo={props.teamlogo}
        ></EditPopUpSelectedTeam>
        {/* Delete Team ----------------------------------------------------- */}
        <DeleteTeamPopUp teamid={props.idTeam}></DeleteTeamPopUp>
      </DropdownButton>
    </div>
  );
}

export default DropDownTeamSettings;
