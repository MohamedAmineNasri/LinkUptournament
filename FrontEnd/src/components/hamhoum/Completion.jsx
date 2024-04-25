
import "./yasser.css";
import { useParams } from 'react-router-dom';
import Pdf from  "./justpdf"
import QRCode from 'qrcode.react';
import axios from 'axios';
import { useState } from "react";
 function Completion() {
  const { id } = useParams();
  
   const [ticket, setticket] = useState(null);
  
  const response =  axios.get(`http://localhost:8000/match/${id}`);
  // setticket(response.data.ticketID.length)
   console.log(response)
  const centerScreen = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Set minimum height to take up the entire viewport height
  };

  return (<>
    <div style={centerScreen}>
      <h1 style={{ color: "black" }}>Thank you! 🎉</h1>
      <h2 style={{ color: "black" }}>You can download your ticket</h2>
      <QRCode value={"http://localhost:8000/match/verif/"+id+"/"+"8"} />
      <Pdf/> 
    </div>
    </>
  );
}

export default Completion;
