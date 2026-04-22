let tiers = []
const normalcy = [
    {id: 1, name: "S"},
    {id: 2, name: "A"},
    {id: 3, name: "B"},
    {id: 4, name: "C"},
    {id: 5, name: "D"}
];

document.getElementById("addT").addEventListener("click", () => {
    addTier()
});

function addTier(name = "New Tier") {
    const tier = {
        id: Date.now(),
        name: name
    }
    tiers.push(tier);
    rendTiers()
}

function rendTiers() {
    const container =document.getElementById("tiers")
    container.innerHTML = ""

    tiers.forEach(tier => {
        const tierEL = document.createElement("div");
        tierEL.classList.add("tierR");

        tierEL.innerHTML = `
            <input type="text" id="TLN" placeholder="Tier Name" value="${tier.name}" onchange="updateTierName(${tier.id}, this.value)"/>
            <div class="tierP">
            </div>
            <button onclick="removeTier(${tier.id})">&times;</button>
        `;
        container.appendChild(tierEL);
    });
}
 
function updateTierName(id, newName) {
    const tier = tiers.find(t => t.id === id);
    if (tier) tier.name = newName;
}

function removeTier(id) {
    tiers = tiers.filter(t => t.id !== id)
    rendTiers();
}
document.addEventListener("DOMContentLoaded", () => {
const SubmitTL = document.getElementById("SubmitTL")

    SubmitTL.addEventListener("click", () => {
     PlaceTL(tiers);
     document.getElementById("TLCM").classList.add("hidden")
    });
});

function PlaceTL(tiersdata) {
    
    const list = document.createElement("div");
    list.classList.add("tierlist", "draggable");

    tiersdata.forEach(tier => {
        const row = document.createElement("div");
        list.classList.add("tier");

        row.innerHTML = `
        <div class ="Trow">
        <div class ="TLN">${tier.name}</div>
        <div class ="tierI"></div>    
        </div>
        `;

        list.appendChild(row)
    });

    list.style.position = "absolute";
    list.style.top  = Place.y - (cardHeight / 2) + "px";
    list.style.left = Place.y - (cardHeight / 2) + "px";

    document.body.appendChild(list)
}

const ECR = document.querySelector(".tierI");

