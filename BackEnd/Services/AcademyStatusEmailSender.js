const SibApiV3Sdk = require("sib-api-v3-sdk");

// Function to send welcome email
 const sendAcademyStatusEmail = async (email, firstName, lastName, status) => {

// Set your SendinBlue API key
const apiKey = "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"
// Configure API key authorization: api-key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKeyAuth = defaultClient.authentications['api-key'];
apiKeyAuth.apiKey = apiKey;

// Create an instance of the SendinBlue API
const sendinblueApi = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Welcome to LinkUptournament";
    sendSmtpEmail.htmlContent = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 10px;
                padding: 40px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
                line-height: 1.5;
            }
            .highlight {
                color: #007bff;
                font-weight: bold;
            }
            img {
                max-width: 100%;
                height: auto;
                display: block;
                margin: 20px auto;
                border-radius: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>LinkUptournament!</h1>
            <p>Dear <span class="highlight">${firstName} ${lastName}</span>,</p>
            <img src=https://cap.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fcap.2F2022.2F04.2F07.2F0521d01d-c6bf-4789-9a2e-d79371be13d9.2Ejpeg/1200x630/quality/80/football-un-club-historique-francais-rachete-par-un-fonds-dinvestissement-americain-1433334.jpg" alt="Football Image">
            ${status === 'Approved' ? `
            <p>Congratulations! Your documentation verifying ownership of the football academy has been meticulously reviewed and approved.</p>
            <p>You are now officially cleared to participate in football tournaments hosted on our platform, LinkUpTournament.</p>
            <p>We're excited to see your academy's talent shine on the field. Welcome aboard!</p>
            ` : `
            <p>We regret to inform you that after careful analysis, your documentation has been deemed insufficient and, unfortunately, rejected.</p>
            <p>We encourage you to review the requirements and resubmit the necessary documents for further consideration.</p>
            <p>We understand this may be disappointing, but we aim to maintain the integrity of our platform. Thank you for your understanding.</p>
            `}
            <p>Best regards,</p>
            <p>The LinkUptournament Team</p>
        </div>
    </body>
    </html>
    `;
    sendSmtpEmail.sender = {
        name: "LinkUpTournement",
        email: "medyasuo@gmail.com",
    };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.replyTo = {
        email: "medyasuo@gmail.com",
        name: "LinkUpTournement",
    };

    try {
        await sendinblueApi.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
        console.error("Error sending welcome email to", email, ":", error);
    }
};

module.exports = { sendAcademyStatusEmail };
