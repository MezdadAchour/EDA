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

// Sélectionner l'icône du panier et le tiroir du panier
const cartIcon = document.querySelector('.cart-icon');
const cartDrawer = document.querySelector('.cart-drawer');

// Fonction pour ouvrir/fermer le tiroir du panier
function toggleCartDrawer() {
  cartDrawer.classList.toggle('open');
}

// Ajouter un écouteur d'événement pour le clic sur l'icône du panier
cartIcon.addEventListener('click', toggleCartDrawer);

// Fermer le tiroir du panier si l'utilisateur clique en dehors
window.addEventListener('click', function(event) {
  if (!event.target.closest('.cart-icon, .cart-drawer')) {
    cartDrawer.classList.remove('open');
  }
});