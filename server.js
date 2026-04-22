import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getSpotifyToken() {
    try {
        const resp = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization":
                    "Basic " +
                    Buffer.from(
                        SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
                    ).toString("base64"),
            },
            body: "grant_type=client_credentials",
        });

        const data = await resp.json();

        if (!data.access_token) {
            throw new Error("Failed to get Spotify token");
        }

        return data.access_token;
    } catch (err) {
        console.error("Token Error:", err);
        throw err;
    }
}

app.get("/spotify-search", async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: "Missing query" });
        }

        const token = await getSpotifyToken();

        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                query
            )}&type=track&limit=3`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error("Search Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/", (req, res) => {
    res.send("Spotify API server is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
