async function searchYouTube(query) {

    const API_KEY = "AIzaSyDgTeDdsuHVbDR-L0v8GmFCwpkjkRjPesI";

    query = query.trim();

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${encodeURIComponent(query)}&key=${API_KEY}`;

    const respone = await fetch(url);

    const data = await respone.json();

    if (!data.items) {
        return [];
    }

    const youtubeResults = data.items.map(item => ({

            title: item.snippet?.title || "No Title",
            artist: item.snippet?.channelTitle || "Unknown Artist",
            thumbnail: item.snippet?.thumbnails?.medium?.url || null,
            videoId: item.id?.videoId || "",
        }
    ));

    console.log("YouTube Search Results:", youtubeResults);
    return youtubeResults;

};

async function searchSpotify(query) {
    const resp = await fetch(`http://localhost:3000/spotify-search?q=${encodeURIComponent(query)}`);
    const data = await resp.json();
    console.log(data);
    if (!data.tracks) return [];

    const spotifyResults = data.tracks.items.map(track => ({
        title: track.name,
        artist: track.artists.map(a => a.name).join(", "),
        thumbnail: track.album.images[1]?.url || "",
        videoId: track.id
    }));

    return spotifyResults;
};
