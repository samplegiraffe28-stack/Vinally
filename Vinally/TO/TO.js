let isDragging = false;
let activeCard = null;

let offsetX = 0;
let offsetY = 0;

let mouseX = 0;
let mouseY = 0;

let zIndexTop = 1;

let BracketS = {
    size: 8,
    matches: []
}

document.addEventListener("DOMContentLoaded", () => { renderBracket(2)})

document.getElementById("sizeSelect").addEventListener("change", (e) => {
    renderBracket(Number(e.target.value));
});

function renderBracket(size) {
    const bracket = document.getElementById("bracket");
    bracket.innerHTML = "";

    let rounds = Math.log2(size);

    for (let r = 0; r < rounds; r++) {
        let round = document.createElement("div");
        round.classList.add("round");
        round.dataset.round = r;

        let matches = size / Math.pow(2, r + 1);

        for (let m = 0; m < matches; m++) {
            let match = document.createElement("div");
            match.classList.add("match");
            match.dataset.match = m;
            match.dataset.round = r;

            match.innerHTML = `
                <div class="slot inT" data-slot="a"></div>
                <div class="slot inT" data-slot="b"></div>
            `;

            round.appendChild(match);
        }

        bracket.appendChild(round);
    }

    BracketLogic(bracket);
}

function BracketLogic(bracket) {
    bracket.addEventListener("dblclick", (e) => {
        let slot = e.target.closest(".slot");
        if (!slot) return;

        let match = slot.parentElement;
        resolveMatch(match, slot)
    }); 
}

function resolveMatch(match, clickedslot) {
        let slots = match.querySelectorAll(".slot")

        let a = slots[0]
        let b = slots[1]

        if (!clickedslot.firstElementChild) return;

        if (!a.firstElementChild || !b.firstElementChild) return;

        let winnerslot = clickedslot;
        let loserslot = clickedslot === a ? b : a;

        winnerslot.classList.add("winner")
        loserslot.classList.add("loser")

        advance(match, winnerslot)
    }

function advance(match, winnerSlot) {

  const round = parseInt(match.dataset.round);
  const matchIndex = parseInt(match.dataset.match);

  const nextRound = round + 1;

  const nextMatchIndex = Math.floor(matchIndex / 2);
  const nextSlotIndex = matchIndex % 2 === 0 ? 0 : 1;

  const nextRoundEl = match.closest(".TournamentA").querySelector(
    `.round[data-round="${nextRound}"]`
  );

  if (!nextRoundEl) {
    console.log("NO NEXT ROUND");
    return;
  }

  const nextMatch = nextRoundEl.querySelectorAll(".match")[nextMatchIndex];

  if (!nextMatch) {
    console.log("NO NEXT MATCH");
    return;
  }

  const nextSlot = nextMatch.querySelectorAll(".slot")[nextSlotIndex];
  const card = winnerSlot.firstElementChild?.cloneNode(true);

  if (!nextSlot || !card) {console.log("youc=suck", {nextSlot, card}); return;}

  console.log("moving card to:", nextSlot);

  nextSlot.replaceChildren(card);
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (isDragging && activeCard) {
    activeCard.style.left = (mouseX - offsetX) + "px";
    activeCard.style.top = (mouseY - offsetY) + "px";
  }
});

document.addEventListener("mousedown", (e) => {
  const card = e.target.closest(".draggable");
  if (!card) return;

  if (e.target.closest(".slot")) return;

  isDragging = true;
  activeCard = card;

  const rect= card.getBoundingClientRect();

  zIndexTop++;
  card.style.zIndex = zIndexTop;

  document.body.appendChild(card);

  card.style.position= "absolute"
  card.style.left = rect.left + "px";
  card.style.top = rect.top + "px";


  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  e.preventDefault();
});

document.addEventListener("mouseup", (e) => {
  if (!isDragging || !activeCard) return;

  const dropzone = finddrop(e.clientX, e.clientY);

  if (dropzone) {
    dropCard(activeCard, dropzone);
  } else {
    Origin(activeCard);
  }

  isDragging = false;
  activeCard = null;
});

function dropCard(card, zone) {
  card.style.position = "";
  card.style.left = "";
  card.style.top = "";
  card.style.zIndex = "";

  card.classList.remove("inE")
  card.classList.add("inT")

  zone.appendChild(card);
}

function Origin(card) {
  const origin = document.querySelector(".empty");

  if (!origin) {return;}
    
  card.style.position = "";
  card.style.left = "";
  card.style.top = "";
  card.style.zIndex = "";

  card.classList.remove("inT")
  card.classList.add("inE")

    origin.appendChild(card);
  }
document.addEventListener("wheel", (e) => {
  const zone = e.target.closest(".slot")
  if (!zone) return;

  e.preventDefault()

  zone.scrollLeft += e.deltaY * 2

}, {passive: false})

function finddrop(x, y) {
  const zones = document.querySelectorAll(".slot");

  for (let zone of zones) {
    const rect = zone.getBoundingClientRect();

    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      return zone;
    }
  }

  return null;
}