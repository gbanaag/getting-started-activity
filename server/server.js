import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3001;

// Allow express to parse JSON bodies
app.use(express.json());

// Authentication route
app.post("/api/token", async (req, res) => {
    try {
        // Exchange the code for an access_token
        const response = await fetch(`https://discord.com/api/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.VITE_DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: "authorization_code",
                code: req.body.code,
            }),
        });

        // Check if response is successful
        if (!response.ok) {
            throw new Error("Failed to exchange code for access token");
        }

        // Retrieve the access_token from the response
        const { access_token } = await response.json();

        // Return the access_token to the client
        res.json({ access_token });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Other routes can be defined here

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
