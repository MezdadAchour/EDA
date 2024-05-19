// Apparition des catégories
window.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".col-3");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  categories.forEach(function (category) {
    observer.observe(category);
  });
});

// Menu toggle
function menutoggle() {
  const menuItems = document.getElementById("menuItems");

  if (menuItems) {
    menuItems.classList.toggle("active");
  } else {
    console.error("Élément 'menuItems' introuvable dans le document.");
  }
}