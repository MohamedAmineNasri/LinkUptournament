import React from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import download from 'downloadjs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';
import { useEffect, useState } from "react";

const PdfGenerator = ({ id }) => {
  const [ticket, setTicket] = useState(null);
  const createPdf = async (id) => {
    
    // 
    try {
      // const mail = await axios.get(`http://localhost:8000/match/paymentmail/omriyasser12@gmail.com/omri/yasser`)
      const mail = await axios.get(`http://localhost:8000/match/paymentmail/`+JSON.parse(localStorage.getItem('user')).email+"/"+JSON.parse(localStorage.getItem('user')).firstName+"/"+JSON.parse(localStorage.getItem('user')).lastName)
      // Fetch match data from the server
      const response = await axios.get(`http://localhost:8000/match/${id}`);
      const matchData = response.data;
      setTicket(response.data.ticketId.length)
      console.log(response.data);
      console.log(response.data.ticketId.length);

      // Fetch team data from the server
      const teamPromises1 = await axios.get(`http://localhost:8000/team/getTeam/${matchData.team1}`);
      const teamPromises2 = await axios.get(`http://localhost:8000/team/getTeam/${matchData.team2}`);
      const team1name = teamPromises1.data.TeamName;
      const team1logo = teamPromises1.data.TeamLogo;
      const team2name = teamPromises2.data.TeamName;
      const team2logo = teamPromises2.data.TeamLogo;

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      // Embed the Times Roman font
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      // Get the size of the page
      const { width, height } = page.getSize();

      // Draw a background color
      page.drawRectangle({
        x: 10,
        y:10,
        width: 50,
        height: 10,
        color: rgb(0.5, 0.5, 0.5), // Light gray background
      });
      

      // Draw text content on top of the background
      const fontSize = 20;
      page.drawText(`Ticket for :`, {
        x: 50,
        y: height - 100,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`${matchData.startingtime} ${matchData.date}`, {
        x: 200,
        y: height - 130,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`${matchData.tournamentName}`, {
        x: 200,
        y: height - 160,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`${team1name}  `, {
        x: 50,
        y: height - 300,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(` vs `, {
        x: 250,
        y: height - 350,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`${team2name} `, {
          x: 110*4,
        y: height - 300,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
       // Embed the team1 logo image
       const logoImage = await pdfDoc.embedPng(team1logo); // Assuming team1logo is image data

       // Draw the image onto the PDF page
       const imageDims = logoImage.scale(0.1); // Adjust the scale as needed
       page.drawImage(logoImage, {
         x: 55, // Adjust the x-coordinate as needed
         y: height - 500, // Adjust the y-coordinate as needed
         width: 100,
         height: 150,
       });
        // Embed the team1 logo image
        const logoImage2 = await pdfDoc.embedPng(team2logo); // Assuming team1logo is image data

        // Draw the image onto the PDF page
        const imageDims2 = logoImage2.scale(0.1); // Adjust the scale as needed
        page.drawImage(logoImage2, {
          x: 110*4, // Adjust the x-coordinate as needed
          y: height - 500, // Adjust the y-coordinate as needed
          width: 100,
          height: 150,
        });
        const qrCodeDataUrl = await QRCode.toDataURL(`http://localhost:8000/match/verif/${id}/${ticket}`);

      // Embed the QR code image into the PDF document
      const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
      const qrCodeDims = qrCodeImage.scale(0.5); // Adjust the scale as needed
      page.drawImage(qrCodeImage, {
        x: 10,
        y: -1,
        width: qrCodeDims.width,
        height: qrCodeDims.height,
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();

      // Trigger the browser to download the PDF document
      download(pdfBytes, "ticket.pdf", "application/pdf");
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };

  return (
    <div className=' justify-center'>
      <button id ="submit"onClick={() => createPdf(id)}>Download PDF</button>
      <p className="small">(Your browser will download the resulting file)</p>
    </div>
  );
};

const PdfGeneratorWrapper = () => {
  const { id } = useParams();
  return <PdfGenerator id={id} />;
};

export default PdfGeneratorWrapper;