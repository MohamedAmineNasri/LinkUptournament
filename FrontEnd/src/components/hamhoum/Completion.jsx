
import "./yasser.css";
import { useParams } from 'react-router-dom';
import Pdf from  "./justpdf"
function Completion(props) {
  const { id } = useParams();
  console.log(id)
  const centerScreen = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Set minimum height to take up the entire viewport height
  };

  return (
    <div style={centerScreen}>
      <h1 style={{ color: "black" }}>Thank you! 🎉</h1>
      <h2 style={{ color: "black" }}>You can download your ticket</h2>
      <Pdf/> {/* Render Pdf component */}
    </div>
  );
}

export default Completion;
