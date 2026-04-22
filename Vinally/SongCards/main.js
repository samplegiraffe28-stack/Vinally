const youtubeDeck = createDeck("youtube", "youtubeStack");
const spotifyDeck = createDeck("spotify", "spotifyStack");

const SearchInput = document.getElementById("searchInput");
const SearchButton = document.getElementById("searchButton");

enableDeckScroll(youtubeDeck);
enableDeckScroll(spotifyDeck);

SearchButton.addEventListener("click", startsearch);

SearchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        startsearch();
    }
});

async function startsearch() {

    const query = SearchInput.value.trim();

    if (query === "") return;

    const youtubeResults = await searchYouTube(query);
    const spotifyResults = await searchSpotify(query);

    populateDeck(youtubeDeck, youtubeResults);
    populateDeck(spotifyDeck, spotifyResults);

    updateDeckDisplay(youtubeDeck);
    updateDeckDisplay(spotifyDeck);

}

const SubmitButton = document.getElementById("SubmitSong");
let selectedSongs = [];

SubmitButton.addEventListener("click", () => {
  
console.log("SubmitButton:", SubmitButton);
    
    SongCardPlacement(selectedSongs);
        SCModal.classList.add("hidden");
                selectedSongs = [];
    document.getElementById("selected").innerHTML =`<p id="PHS">Search for a song and add it to your collection</p>`;

});

function SongCardPlacement(dataArray) {

    console.log("SongCardPlacement running:", dataArray);

    dataArray.forEach(song => {

        const card = document.createElement("div");
        card.classList.add("SC", "draggable", "inE");

        card.innerHTML = `
            <div class="incard">
                ${song.thumbnail ? `<img src="${song.thumbnail}" class="thumbnail">` : ""}
                <div class="cardtext">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
            </div>
        `;

        console.log("Appending card:", card);

        const container = document.getElementById("empty")

        container.appendChild(card);
    });
}


const SCModal = document.getElementById("SCCM");
const open = document.getElementById("openSC");
const close = document.getElementById("closeSC");

open.addEventListener("click", () => {
     SCModal.classList.remove("hidden");
});
close.addEventListener("click", () => {
    SCModal.classList.add("hidden")
})

const Tutorial = document.getElementById("tutorial")
const TT = document.getElementById("TT")

TT.addEventListener("click", () => {
    Tutorial.classList.remove("hidden");
});
closeTT.addEventListener("click", () => {
    Tutorial.classList.add("hidden");
});