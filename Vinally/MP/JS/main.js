const SCModal = document.getElementById("SCCM");
const TLModal = document.getElementById("TLCM");
const TModal = document.getElementById("TCM");
const CModal = document.getElementById("CCM");
let Place = {x: 100, y: 100};
let offset = 0;
const cardWidth = 240;
const cardHeight = 144;

let topThing = 1;
let Target = null

document.addEventListener('DOMContentLoaded', () => {
    const Mainmenu = document.getElementById('RCM');;
    const SCmenu = document.getElementById('SCRCM');
    const TLmenu = document.getElementById('TLRCM');
    const Tmenu = document.getElementById('TRCM');
    const Cmenu = document.getElementById('CRCM');
    const tutorial = document.getElementById("TT")

    function hideAllMenus () {
    Mainmenu.style.display = 'none';
    SCmenu.style.display = 'none';
    TLmenu.style.display = 'none';
    Tmenu.style.display = 'none';
    Cmenu.style.display = 'none';
}

const Cbtn = document.getElementById ("CC")
const TLbtn = document.getElementById ("TL")
const SCbtn = document.getElementById ("CS")
const Tbtn = document.getElementById ("CT")
const Torialbtn = document.getElementById ("torial")

Cbtn.addEventListener("click", () => {
    CModal.classList.remove("hidden")
})
TLbtn.addEventListener("click", () => {
    TLModal.classList.remove("hidden");
    tiers = JSON.parse(JSON.stringify(normalcy));
    rendTiers();
})
SCbtn.addEventListener("click", () => {
    SCModal.classList.remove("hidden")
})
Tbtn.addEventListener("click", () => {
    TModal.classList.remove("hidden")
})
Torialbtn.addEventListener("click", () => {
    tutorial.classList.remove("hidden")
})

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    hideAllMenus();
    
    Place = {
        x: e.clientX,
        y: e.clientY
    }
    if (e.target.closest('.SC')) {
        const SC = e.target.closest(".SC")

        menu(SCmenu, e);
        Target = SC
    } else if (e.target.closest('.tierlist')) {
        const TL = e.target.closest(".tierlist")

        menu(TLmenu, e);
        Target = TL
    } else if (e.target.closest('.bracket')) {
        const T = e.target.closest(".bracket")

        menu(Tmenu, e);
        Target = T
    } else if (e.target.closest('.CDbox')) {
        const C = e.target.closest(".CDbox")

        menu(Cmenu, e);
        Target = C
    } else {
        menu(Mainmenu, e);
    }
});

function menu(menuEL, e) {
        menuEL.style.display = 'block';
        menuEL.style.top = `${e.clientY}px`;
        menuEL.style.left = `${e.clientX}px`;
}

document.addEventListener('click', () => {
        hideAllMenus();
});

[Mainmenu, SCmenu, TLmenu, Tmenu, Cmenu].forEach((menuEL) => {
    menuEL.addEventListener('click', (e) => {
    
        const action = e.target.getAttribute('data-action');

    if (!action) return;

    console.log(`Menu action: ${action}`);

    if (action === "createSC") {
        SCModal.classList.remove("hidden");
    }

    if (action === "createTL") {
        document.addEventListener
        TLModal.classList.remove("hidden");
        tiers = JSON.parse(JSON.stringify(normalcy));
        rendTiers();
    }

    if (action === "createT") {
        TModal.classList.remove("hidden");
    }

    if (action === "createC") {
        CModal.classList.remove("hidden")
    }

    if (action === "deleteTL") {
        Target.remove()
        Target = null
    }
    if (action === "deleteSC") {
        Target.remove()
        Target = null
    }
    if (action === "deleteT") {
        Target.remove()
        Target = null
    }
    if (action === "DeleteC") {
        Target.remove()
        Target = null
    }
    if (action === "tutorial") {
        tutorial.classList.remove("hidden")
    }
});
});
});

document.getElementById("closeSC").addEventListener("click", () => {
    SCModal.classList.add("hidden");
})

document.getElementById("closeTL").addEventListener("click", () => {
    TLModal.classList.add("hidden");
})
document.getElementById("closeT").addEventListener("click", () => {
    TModal.classList.add("hidden");
})
document.getElementById("closeC").addEventListener("click", () => {
    CModal.classList.add("hidden");
})
document.getElementById("closeTT").addEventListener("click", () => {
    TT.classList.add("hidden")
})

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
        card.classList.add("SC", "draggable");

        card.style.position = "absolute";
        card.style.top = Place.y - (cardHeight / 2) + (Math.random() * 25) + "px";
        card.style.left = Place.x - (cardWidth / 2) + (Math.random() * 25) + "px";

        ;

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

        document.body.appendChild(card);
    });
}

function updateCName(id, newName) {
    const C = tiers.find(t => t.id === id);
    if (tier) tier.name = newName;
}

const CreateContainer = document.getElementById("CoS")

CreateContainer.addEventListener("click", () => {
const input = document.getElementById("Cname")
const name = input.value.trim();

PlaceC(name);
CModal.classList.add("hidden");
})

function PlaceC(name) {

    const container = document.createElement("div");
    container.classList.add("CDbox", "draggable");

    const title = document.createElement("div");
    title.classList.add("CoT");
    title.textContent = name;

    const box = document.createElement("div");
    box.classList.add("Cbox")

    container.appendChild(title);
    container.appendChild(box);

    container.style.position = "absolute";
    container.style.top  = Place.y - (cardHeight / 2) + "px";
    container.style.left = Place.y - (cardHeight / 2) + "px";

    document.body.appendChild(container)
}
