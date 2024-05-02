
 import "./yasserr.css";
import { useParams } from 'react-router-dom';

import Pdf from  "./justpdf"
import QRCode from 'qrcode.react';
import axios from 'axios';
import { useEffect, useState } from "react"; // Changed useState to useEffect
import Header from '../landingpage/Header';
import Footer from '../landingpage/Footer';

function Completion() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => { // Use useEffect for asynchronous operations
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/match/${id}`);
        console.log(response.data.ticketId.length)
        console.log(response.data)
        setTicket(response.data.ticketId.length); // Set the ticket data when the request is successful
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [id]); // Trigger the effect whenever the `id` parameter changes

  const centerScreen = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Set minimum height to take up the entire viewport height
  };

  return (
    <>
    <Header/>
    <div style={centerScreen}>
      
      <h1 style={{ color: "black" }}>Thank you! 🎉</h1>
      <h2 style={{ color: "black" }}>You can download your ticket</h2>
      
      {ticket && (
        <><div style={{ display: "none" }}>
        {/* Generate the QR code as a data URI */}
        {ticket && <QRCode value={`http://localhost:8000/match/verif/${id}/8`} />}
      </div>
      <Pdf ticketId={id} ticketData={ticket} />
        </>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Completion;
