import Card from "react-bootstrap/Card";

function TeamCard() {
  return (
    <Card style={{ width: "20rem", backgroundColor: "#222222" }}>
      <Card.Img
        variant="top"
        src="/public/assets/images/logo_1.png"
        alt="Logo"
      />
      <Card.Body>
        <Card.Title>Real Madrid U12</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Subtitle>Total wins : </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "10px" }}>
          Total loses :{" "}
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "10px" }}>
          Total draw :{" "}
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "10px" }}>
          Total matches :{" "}
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "10px" }}>
          Total Goals_scored :{" "}
        </Card.Subtitle>
        <Card.Subtitle style={{ marginTop: "10px" }}>
          Total Goals_received :{" "}
        </Card.Subtitle>
      </Card.Body>
      <Card.Body>
        <Card.Link href="#">Add Players</Card.Link>
        <Card.Link href="#">Check Players</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default TeamCard;
