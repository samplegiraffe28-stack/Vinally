let isDragging = false;
let activeCard = null;

let offsetX = 0;
let offsetY = 0;

let mouseX = 0;
let mouseY = 0;

let zIndexTop = 1;

let tierlist = {
    id:1,
    tiers: []
};

document.addEventListener("DOMContentLoaded", starttier)

function starttier() {
    if (tierlist.tiers.length === 0) {
        tierlist.tiers = [
            { id: 1, name: "S"},
            { id: 2, name: "A"},
            { id: 3, name: "B"},
            { id: 4, name: "C"},
            { id: 5, name: "D"}
        ];
    }

    renderTierlist()
}

document.getElementById("buttonA").addEventListener("click", () => {
  addTier();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("closebtn")) {
    const Row = e.target.closest(".tier");
    if (!Row) return;

    const id = Number(Row.dataset.id);

    tierlist.tiers = tierlist.tiers.filter(t => t.id !== id);

    rerenderTierlist();
  }
});

function renderTierlist() {
  const container = document.getElementById("tierlistA");

  const tl = document.createElement("div");
  tl.classList.add("tierlist");

  const tiersContainer = document.createElement("div");
  tiersContainer.classList.add("tiers");

  tierlist.tiers.forEach(tier => {
    const row = createTierRow(tierlist, tier);
    tiersContainer.appendChild(row);
  });

  tl.appendChild(tiersContainer);

  container.appendChild(tl);
}

function createTierRow(tierlist, tier) {
  const row = document.createElement("div");
  row.classList.add("tier");
  row.dataset.id = tier.id

  const input = document.createElement("input");
  input.classList.add("TLN");
  input.placeholder = "Tier Name";
  input.value = tier.name || "";

  input.addEventListener("input", (e) => {
  });

  const drop = document.createElement("div");
  drop.classList.add("tierI");

  const del = document.createElement("button");
  del.classList.add("closebtn")
  del.innerHTML = "&times;";
  

  row.appendChild(input);
  row.appendChild(drop);
  row.appendChild(del);

  return row;
}

function addTier() {
  tierlist.tiers.push({
    id: Date.now(),
    name: ""
  });

  rerenderTierlist();
}

function rerenderTierlist() {
  const old = document.querySelector(".tierlist")
  if (old) old.remove();
  
  renderTierlist();
}

function finddrop(x, y) {
  const zones = document.querySelectorAll(".tierI");

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
function Addtolist(card, zone) {
  zone.appendChild(card);
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

  isDragging = true;
  activeCard = card;

  const rect= card.getBoundingClientRect();

  zIndexTop++;
  card.style.zIndex = zIndexTop;

  document.body.appendChild(card);

    card.classList.add("dragging")

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

  activeCard.classList.remove("dragging")

  isDragging = false;
  activeCard = null;
});

function dropCard(card, zone) {
  const cards = [...zone.querySelectorAll(".draggable:not(.dragging)")];

  let inserted = false;

  for (let other of cards) {
    if (other === card) continue;

    const rect = other.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;

    if (mouseX < midpoint) {
      zone.insertBefore(card, other);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    zone.appendChild(card);
  }

  card.style.position = "relative";
  card.style.left = "";
  card.style.top = "";
  card.style.zIndex = "";

  card.classList.remove("inE");
  card.classList.add("inTL");
}

function Origin(card) {
  const origin = document.querySelector(".empty");

  if (!origin) {return;}
    
  card.style.position = "";
  card.style.left = "";
  card.style.top = "";
  card.style.zIndex = "";

  card.classList.remove("inTL")
  card.classList.add("inE")

    origin.appendChild(card);
  }
document.addEventListener("wheel", (e) => {
  const zone = e.target.closest(".tierI")
  if (!zone) return;

  e.preventDefault()

  zone.scrollLeft += e.deltaY * 2

}, {passive: false})