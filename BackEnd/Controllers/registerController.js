const Users = require("../Models/Users");
const bcrypt = require("bcrypt");
const SibApiV3Sdk = require("sib-api-v3-sdk");

// Set your SendinBlue API key
const apiKey = '';
// Configure API key authorization: api-key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKeyAuth = defaultClient.authentications['api-key'];
apiKeyAuth.apiKey = "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";

// Create an instance of the SendinBlue API
const sendinblueApi = new SibApiV3Sdk.TransactionalEmailsApi();

const handleNewUser = async (req, res) => {
    const { firstName, lastName, birthday, phoneNumber, email, password, accountImage, roles, bio  } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Check for duplicate email in the database
        const duplicateUser = await Users.findOne({ email });
        if (duplicateUser) {
            return res.status(409).json({ message: "Email Is Already Registered" }); // Conflict
        }        

        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Store the new user
        const newUser = {
            firstName,
            lastName,
            birthday,
            phoneNumber,
            email,
            password: hashedPwd,
            accountImage,
            roles,
            bio,
        };

        const createdUser = await Users.create(newUser);

        // Send welcome email to the user
        await sendWelcomeEmail(email, firstName, lastName);

        res.status(201).json({ success: `New user ${email} created!` });
    } catch (err) {
        console.error("Error creating new user:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to send welcome email
const sendWelcomeEmail = async (email, firstName, lastName) => {
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
            <h1>Welcome to LinkUptournament!</h1>
            <p>Dear <span class="highlight">${firstName} ${lastName}</span>,</p>
            <p>We're thrilled to welcome you to LinkUptournament, your gateway to the exciting world of football tournaments!</p>
            <img src="https://imgs.search.brave.com/RNhCKYPRo3vyrxWkc9naCD0GHLT_edhH6ZbalII4bNg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTA0/Mzc4MzYvcGhvdG8v/aXRhbGlhbi1mb290/YmFsbC1mYW5zLWNo/ZWVyaW5nLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz16c0s0/dl9kRFhUT2t0cXhG/VkhDdUR2YjFwXzZ5/eWdsQmtZWFBTRDA1/ajBVPQ" alt="Football Image">
            <p>With LinkUptournament, you'll discover a vibrant community of football enthusiasts and opportunities to connect, compete, and enjoy the beautiful game.</p>
            <p>Whether you're a player, coach, supporter, or involved in any other role, we're here to make your tournament experience seamless and enjoyable.</p>
            <p>Get ready to embark on a journey filled with excitement, camaraderie, and unforgettable moments!</p>
            <p>Best regards,</p>
            <p>The LinkUptournament Team</p>
        </div>
    </body>
    </html>
    `;
    sendSmtpEmail.sender = {
        name: "LinkUptournament",
        email: "linkUptournament@gmail.com",
    };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.replyTo = {
        email: "linkUptournament@gmail.com",
        name: "LinkUptournament",
    };

    try {
        await sendinblueApi.sendTransacEmail(sendSmtpEmail);
        console.log("Welcome email sent to:", email);
    } catch (error) {
        console.error("Error sending welcome email to", email, ":", error);
    }
};
const sendPaymentEmail = async (email, firstName, lastName) => {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Payment Confirmation";
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
            <h1>Thank you for buying ticket !</h1>
            <p>Dear <span class="highlight">${firstName} ${lastName}</span>,</p>
            <p>We're thrilled to welcome you to LinkUptournament, your gateway to the exciting world of football tournaments!</p>
            <img src="https://imgs.search.brave.com/RNhCKYPRo3vyrxWkc9naCD0GHLT_edhH6ZbalII4bNg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTA0/Mzc4MzYvcGhvdG8v/aXRhbGlhbi1mb290/YmFsbC1mYW5zLWNo/ZWVyaW5nLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz16c0s0/dl9kRFhUT2t0cXhG/VkhDdUR2YjFwXzZ5/eWdsQmtZWFBTRDA1/ajBVPQ" alt="Football Image">
            <p>With LinkUptournament, you'll discover a vibrant community of football enthusiasts and opportunities to connect, compete, and enjoy the beautiful game.</p>
            <p>Whether you're a player, coach, supporter, or involved in any other role, we're here to make your tournament experience seamless and enjoyable.</p>
            <p>Get ready to embark on a journey filled with excitement, camaraderie, and unforgettable moments!</p>
            <p>Best regards,</p>
            <p>The LinkUptournament Team</p>
        </div>
    </body>
    </html>
    `;
    sendSmtpEmail.sender = {
        name: "LinkUptournament",
        email: "linkUptournament@gmail.com",
    };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.replyTo = {
        email: "linkUptournament@gmail.com",
        name: "LinkUptournament",
    };

    try {
        await sendinblueApi.sendTransacEmail(sendSmtpEmail);
        console.log("Welcome email sent to:", email);
    } catch (error) {
        console.error("Error sending welcome email to", email, ":", error);
    }
    
};
const handlePaymentConfirmation = async (req, res) => {
    const { email, firstName, lastName } = req.params;

    try {
       

        // Send payment confirmation email
        await sendPaymentEmail(email, firstName, lastName);

        res.status(200).json({ message: "Payment confirmed. Confirmation email sent." });
    } catch (error) {
        console.error("Error handling payment confirmation:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { handleNewUser ,handlePaymentConfirmation};
