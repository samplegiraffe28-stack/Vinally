let isDragging = false;
let activeCard = null;

let offsetX = 0;
let offsetY = 0;

let mouseX = 0;
let mouseY = 0;

let zIndexTop = 1;

const container = document.getElementById("empty")

const scrollZ = 80;
const scrollS = 10;

document.addEventListener("mousemove", (e) => {
 mouseX = e.pageX;
 mouseY = e.pageY;

  if (isDragging && activeCard) {
    activeCard.style.left = (mouseX - offsetX) + "px";
    activeCard.style.top = (mouseY - offsetY) + "px";
  }

  if(e.clientY > window.innerHeight - scrollZ) {
    window.scrollBy(0, scrollS)
  }

  if(e.clientY < scrollZ) {
    window.scrollBy(0, -scrollS)
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

  if(dropzone) {
    insertCard(activeCard, dropzone, e)
  }
});

function insertCard(card, zone, e) {
  const cards = [...zone.querySelectorAll(".draggable")]
    .filter(c => c !== card);

  let inserted = false;

  for (let other of cards) {
    const rect = other.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;

    if (e.clientY < midpoint) {
      zone.insertBefore(card, other);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    zone.appendChild(card);
  }

  updateRanks(zone);

  card.style.position = "relative";
  card.style.left = "";
  card.style.top = "";
  card.style.zIndex = "";

  card.classList.add("inE");

  isDragging = false;
  activeElement = null;
}

function updateRanks(zone) {
  const cards = [...zone.querySelectorAll(".draggable")];

  cards.forEach((card, index) => {
    let label = card.querySelector(".rank");

    if (!label) {
      label = document.createElement("div");
      label.classList.add("rank");
      card.appendChild(label);
    }

    label.textContent = index + 1;
  });
}

function dropCard(card, container) {
  card.style.position = "relative";
  card.style.left = "";
  card.style.top = "";
  card.style.zIndex = "";

  card.classList.add("inE")

  container.appendChild(card);
}

function finddrop(x, y) {

    const rect = container.getBoundingClientRect();

    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      return container;
    }

  return null;
}

