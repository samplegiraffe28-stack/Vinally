
function populateDeck(deck, results) {

    deck.results = results;
    
    deck.container.innerHTML = "";

    results.forEach((song, index) => {
        console.log("Processing song:", song);

        const card = document.createElement("div");
        card.classList.add("card");

            card.addEventListener("click", function(event) {

        event.stopPropagation();

        addSongToCollection(song);
        
      
    });

        card.innerHTML = `<div class="incard">
            ${song.thumbnail ? `<img src="${song.thumbnail}" class="thumbnail">` : ''}
            <div class="cardtext">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            </div>
            </div>
        `;
        CardLogic(card, song);

        deck.container.appendChild(card);
    }); 
 
}

function CardLogic(card, song) {

    card.addEventListener("click", () => {

        const exists = selectedSongs.find(s => s.videoId === song.videoId);

        if (exists) {
            selectedSongs = selectedSongs.filter(s => s.videoId !== song.videoId);
            card.classList.remove("selected");
        } else {
            selectedSongs.push(song);
            card.classList.add("selected");
        }

        console.log("Selected Songs:", selectedSongs);
    });
}

function addSongToCollection(song) {

    const area = document.getElementById("selected");
    const placeholder = document.getElementById("PHS");

    if(placeholder){
        placeholder.remove();
    }

    const item = document.createElement("div");

    item.classList.add("selectedC");

    item.innerHTML =`<div class="incard">
            ${song.thumbnail ? `<img src="${song.thumbnail}" class="thumbnail">` : ''}
            <div class="cardtext">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            </div>
            </div>
        `;

    area.appendChild(item);

}