import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import QRCode from 'qrcode.react';

function TicketVerifier() {
  const [ticketID, setTicketID] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setTicketID(data); // Extracted ticket ID from QR code
      // Now you can send the ticket ID to your backend for verification
      // and handle the verification process accordingly
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h1>Ticket Verifier</h1>
      {ticketID ? (
        <div>
          <p>Scanned Ticket ID: {ticketID}</p>
          {/* You can display additional information about the ticket here */}
        </div>
      ) : (
        <div style={{backgroundColor : "pink"}}>
          <p>Scan QR code to verify ticket</p>
          {/* QR code scanner component */}
          <QRCode
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '10%' ,backgroundColor:"green"}}
          />
          <h1>test</h1>
        </div>
      )}
    </div>
  );
}

export default TicketVerifier;
