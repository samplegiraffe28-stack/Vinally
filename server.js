import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const SPOTIFY_CLIENT_ID = "e33147e056a14fb6b1067b92974f487a";
const SPOTIFY_CLIENT_SECRET = "de1efd0548f14896a03d44ef5dfaae7c";

async function getSpotifyToken() {
    const resp = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64")
        },
        body: "grant_type=client_credentials"
    });
    const data = await resp.json();
    return data.access_token;
}

app.get("/spotify-search", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.send({ error: "Missing query" });
    
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=3`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));