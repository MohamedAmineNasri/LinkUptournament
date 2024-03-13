const Users = require("../Models/Users");
const bcrypt = require("bcrypt");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const apiKey = '';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKeyAuth = defaultClient.authentications['api-key'];
apiKeyAuth.apiKey = apiKey;

const sendinblueApi = new SibApiV3Sdk.TransactionalEmailsApi();

const handleNewUser = async (req, res) => {
    const { firstName, lastName, birthday, phoneNumber, email, password, accountImage, roles } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const duplicateUser = await Users.findOne({ email });
        if (duplicateUser) {
            return res.status(409).json({ message: "Email Is Already Registered" }); // Conflict
        }        

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            birthday,
            phoneNumber,
            email,
            password: hashedPwd,
            accountImage,
            roles,
        };

        const createdUser = await Users.create(newUser);

        await sendWelcomeEmail(email, firstName, lastName);

        res.status(201).json({ success: `New user ${email} created!` });
    } catch (err) {
        console.error("Error creating new user:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

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
            <img src="https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/315750420_560650722734070_1942812906744875399_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CuFXCdhPuG8AX-2ZyoB&_nc_oc=AQmavrjhUd20WAWbsB5qukZm_s7fdpCTBfVCGVHEPa__8HF7VOs6XdH6Z-YM9boSJXQ&_nc_ht=scontent.ftun14-1.fna&oh=00_AfC3o5bhnx3k6YKyVx_ERwaeoMYU9gVopVgFTaMAORBCgw&oe=65F6C9A1" alt="Football Image">
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

module.exports = { handleNewUser };
