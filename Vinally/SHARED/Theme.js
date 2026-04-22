const themes = ["light", "dark", "lapiz", "velvet"];

function setTheme(theme) {
  document.body.classList.remove(...themes);
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  setTheme(savedTheme);
}