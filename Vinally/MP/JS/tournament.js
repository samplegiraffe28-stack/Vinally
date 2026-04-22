let BracketS = {
    size: 8,
    matches: []
}

function setBracketS(size) {
    BracketS.size = size;
    BracketRend(size)
}

function findPreview() {
    let preview = document.getElementById("BrPr");

    if (!preview) {
        preview = document.createElement("div");
        preview.id = "BrPr";

        const modal = document.getElementById("TCM");
        modal.appendChild(preview);
    }

    return preview;
}

function BracketRend(size) {

    const preview = findPreview();
    preview.innerHTML = "";

    let rounds = Math.log2(size);

    for (let r = 0; r < rounds; r++) {
        let round = document.createElement("div")
        round.classList.add("round")
        round.dataset.round = r;

    let matches = size / Math.pow(2, r+1);

    for (let m=0; m < matches; m++) {
        let match = document.createElement("div")
        match.classList.add("match");
        match.dataset.match = m;
        match.dataset.round = r;

        match.innerHTML = `
        <div class="slot inT" data-round="${r}" data-match="${m}" data-slot="a"></div>
        <div class="slot inT" data-round="${r}" data-match="${m}" data-slot="b"></div>
        `;

        round.appendChild(match);
        console.log(r)
    }

    preview.appendChild(round);
}
}

function createBracket() {
    const bracket = document.createElement("div")
    bracket.classList.add("bracket", "draggable")

    bracket.dataset.size = BracketS.size;
    
    const preview = findPreview().cloneNode(true);
    preview.classList.remove("BrPr")
    bracket.appendChild(preview);

    document.body.appendChild(bracket);

    BracketLogic(bracket);

    document.getElementById("TCM").classList.add("hidden")

    console.log("Bracket added:", bracket);
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

  const nextRoundEl = match.closest(".bracket").querySelector(
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