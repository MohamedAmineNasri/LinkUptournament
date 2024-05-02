import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addPlayer,
  addPlayerMi,
} from "../../store/playerReducers/addPlayerSlice";
import { soccerPositions } from "../data/playersPositions";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import "./PlayerForm.css";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import DefaultLayout from "../Dashboard/src/layout/DefaultLayout";

const AddPlayerForm = () => {
  const navigate = useNavigate();

  const { idTeam } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    legal_guardian: "",
    academic_membership: "",
    position: "",
    skills: [],
    team: idTeam,
  });
  const [skillsSize, setSkillsSize] = useState(1);
  useState(() => {
    console.log(soccerPositions);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
    setSkillsSize(Object.keys(formData.skills).length + 1);
  };

  const handleSkillInputChange = (e, index) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      skills: newSkills,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addPlayerMi(formData));
    navigate(`/team/${idTeam}`);
  };

  return (
    <div>
      <DefaultLayout>
        <div className="row " style={{ height: "100vh", margin: 0 }}>
          <div className="col-lg-5 text-center player-bg"></div>
          <div
            className="col-lg-5 mx-auto text-center"
            style={{
              width: "50vw",
              paddingTop: "9%",
            }}
          >
            <form onSubmit={handleSubmit} className="player-form">
              <h2 className="text-white">PLAYER</h2>

              <Form.Group controlId="p name">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Player Name"
                />
              </Form.Group>
              <Form.Group controlId="ph numb">
                <Form.Control
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              </Form.Group>
              <Form.Group controlId="legal_guardian">
                <Form.Control
                  type="text"
                  name="legal_guardian"
                  value={formData.legal_guardian}
                  onChange={handleInputChange}
                  placeholder="Enter legal guardian"
                />
              </Form.Group>
              <Form.Group controlId="academic_membership">
                <Form.Control
                  type="text"
                  name="academic_membership"
                  value={formData.academic_membership}
                  onChange={handleInputChange}
                  placeholder="Enter academic membership"
                />
              </Form.Group>
              <Form.Group controlId="position">
                <Form.Control
                  as="select"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                >
                  <option value="">Select Position</option>
                  {Object.entries(soccerPositions).map(([key, value]) => (
                    <option key={key} value={key} style={{ padding: "30px" }}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="skills">
                {formData.skills.map((skill, index) => (
                  <div key={index}>
                    <Form.Control
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillInputChange(e, index)}
                      placeholder={`Enter skill ${index + 1}`}
                    />
                  </div>
                ))}
              </Form.Group>
              <div className="row justify-content-center gap">
                <Button
                  variant="secondary"
                  disabled={skillsSize == 3}
                  onClick={handleAddSkill}
                >
                  Add Skill
                </Button>
                <Button variant="success" type="submit">
                  Add Player
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default AddPlayerForm;
