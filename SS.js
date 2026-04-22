const ECR = document.querySelector(".ECR");

ECR.addEventListener( "wheel", (e) => {
  e.preventDefault();
  ECR.scrollLeft += e.deltaY * 3;
},
{ passive: false }
);

document.querySelectorAll("[PIPN]").forEach(button => {

    button.addEventListener("click", () => {

        const pipN = button.dataset.SPip;
        const pip =document.getElementById(pipN);
        pip.classList.add("show");

    });

});

document.querySelectorAll("close").forEach((button) => {

    button.addEventListener("click", () => {
      const pip = button.closest(".Pip");
      pip.classList.remove("show");
    });

});

document.querySelectorAll(".Pip").forEach((pip) => {

    pip.addEventListener("click", (e) => {
      if (e.target === pip) {
        pip.classList.remove("show");
      }

    });

});



const modal = document.getElementById("Modal");
const openModalButton = document.getElementById("OpenBtn");
const closeModalButton = document.getElementById("CloseBtn");

openModalButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

const selector = document.getElementById("ThemeSelector");
const form = document.getElementById("Settingin");

function setTheme(theme) {
    document.body.classList.remove(...themes);
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    console.log("Theme set to:", theme);
}


form.addEventListener("submit", function(e) {
    e.preventDefault();

    const theme = selector.value;

    setTheme(theme);

    console.log("Selected theme:", theme);
});
