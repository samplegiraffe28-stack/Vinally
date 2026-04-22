
let isDragging = false;
let activeElement = null;

let offsetX = 0;
let offsetY = 0;

let mouseX = 0;
let mouseY = 0;

let startX = 0;
let startY = 0;

let TopThing = 1;

document.addEventListener("mousemove", (e) => {
  if (!startX && !startY) return;

   if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
        isDragging = true;
    }

  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("mousedown", (e) => {
  const el = e.target.closest(".draggable");
  if (!el) return;
  if (e.target.closest(".slot")) return;
  if (e.target.closest("input, textarea, button")) return;

  isDragging = false;
  activeElement = el;

  el.style.pointerEvents = "none";

  el.classList.add("dragging")

    const rect = el.getBoundingClientRect();

    document.body.appendChild(el)
    el.style.position = "absolute"

if (el.classList.contains("SC") || el.classList.contains("inTL")) {
  el.classList.remove("inTL");
}

  TopThing++;
    el.style.zIndex = TopThing;

 startX = e.clientX
 startY = e.clientY

 offsetX = e.clientX - rect.left;
 offsetY = e.clientY - rect.top;

 e.preventDefault();
  
});

document.addEventListener("mouseup", (e) => {
  if (!activeElement) return;

  activeElement.style.pointerEvents = "";

  const slot = findslots(e.clientX, e.clientY)
  const dropzone = finddrop(e.clientX, e.clientY)
  const spot = findspots(e.clientX, e.clientY)
  const card = activeElement

if (slot && card) {
  AddtoTournament(slot, card)
}
else if (spot && card && activeElement.classList.contains("SC")) {
  AddtoC(spot, card);
  }

  setTimeout(() => 0);

  

  if (dropzone && activeElement && activeElement.classList.contains("SC")) {
    Addtolist(activeElement, dropzone, e.clientX)
  }

  activeElement?.classList.remove("dragging")

  isDragging = false;
  activeElement = null;
});

function update() {
  if (isDragging && activeElement) {
    activeElement.style.left = (mouseX - offsetX) + "px";
    activeElement.style.top = (mouseY - offsetY) + "px";
  }

  requestAnimationFrame(update);
}

update();

function finddrop (x,y) {
    const zones = document.querySelectorAll(".tierI")

    for (let zone of zones) {
        const rect = zone.getBoundingClientRect();

        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {
            return zone
        }
    }

    return null;
}

function findslots (x,y) {
  const zones = document.querySelectorAll(".slot")

    for (let zone of zones) {
        const rect = zone.getBoundingClientRect();

        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {
            return zone
        }
    }

    return null;
}

function findspots (x,y) {
  const spots = document.querySelectorAll(".Cbox")

  for (let spot of spots) {
    const rect = spot.getBoundingClientRect();

    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      return spot
    }
  }

  return null;
}

function Addtolist(card, zone, mouseX) {

  card.style.position = "relative";
  card.style.left = "0px";
  card.style.top = "0px";

  card.classList.add("inTL");

  const cards = [...zone.children];

  let inserted = false

  for (let other of cards) {
    const rect = other.getBoundingClientRect();
    const midpoint = rect.top + rect.height /2;
    
    if (mouseX < midpoint) {
      zone.insertBefore(card, other);
      inserted = true;
      break;
    }
  }
if (!inserted) {
  zone.appendChild(card);
}
}

document.addEventListener("wheel", (e) => {
  const zone = e.target.closest(".tierI")
  if (!zone) return;

  e.preventDefault()

  zone.scrollLeft += e.deltaY * 2

}, {passive: false})

function AddtoTournament (slot, card) {
  if (!slot || !card) return;

  slot.innerHTML = "";
  slot.appendChild(card);

  card.style.position = "relative";
  card.style.left = "";
  card.style.top = "";

  card.classList.add("inT")
}

function AddtoC (spot, card) {
  if (!spot || !card) return;

  console.log ("ithappenin")

  spot.appendChild(card);

  card.style.position = "relative";
  card.style.left = "";
  card.style.top = "";
  card.classList.add("inC")
}