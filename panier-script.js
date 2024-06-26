// Récupérer le panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour afficher le contenu du panier
function displayCartItems() {
  const cartTableBody = document.getElementById("cart-tablebody");
  cartTableBody.innerHTML = ""; // Vider le contenu existant

  let subtotal = 0;

  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price} DA</td>
      <td>${item.quantity}</td>
      <td>${item.price * item.quantity} DA</td>
      <td>
        <button class="suppicn" data-id="${item.id}">
          <i class="fa fa-times"></i>
        </button>
      </td>
    `;
    cartTableBody.appendChild(row);
    subtotal += item.price * item.quantity;
  });

  const subtotalElement = document.getElementById("subtotal");
  subtotalElement.textContent = subtotal + " DA";
}

// Appel de la fonction pour afficher le contenu du panier
document.addEventListener("DOMContentLoaded", displayCartItems);

// Gérer la suppression d'articles du panier
const cartTableBody = document.getElementById("cart-tablebody");
cartTableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-times")) {
    const button = event.target.closest(".suppicn");
    const productId = button.getAttribute("data-id");
    removeFromCart(productId);
    displayCartItems(); // Mettre à jour l'affichage du panier
  }
});

// Fonction pour supprimer un article du panier
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Référence à la base de données Realtime Database
const database = firebase.database();

// Récupérer les éléments du modal
const modal = document.getElementById("confirmation-modal");
const closeBtn = document.getElementsByClassName("close")[0];

// Fonction pour afficher le modal
function showModal() {
  modal.style.display = "block";
}

// Fonction pour fermer le modal
function closeModal() {
  modal.style.display = "none";
}

// Gérer la soumission du formulaire de commande
const commandeForm = document.getElementById("commande-form");
commandeForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les données du formulaire
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const telephone = document.getElementById("telephone").value;
  const adresse = document.getElementById("adresse").value;

  // Récupérer le total depuis l'élément #subtotal
  const subtotalElement = document.getElementById("subtotal");
  const total = parseFloat(subtotalElement.textContent.replace(" DA", ""));

  // Vérifier les données avant de les envoyer
  console.log("Données de la commande :");
  console.log("Nom :", nom);
  console.log("Prénom :", prenom);
  console.log("Téléphone :", telephone);
  console.log("Adresse :", adresse);
  console.log("Articles :", cart);
  console.log("Total :", total);

  // Envoyer les données de la commande à la Realtime Database
  const commandeRef = database.ref("commandes").push({
    nom,
    prenom,
    telephone,
    adresse,
    articles: cart, // Correction ici
    total, // Correction ici
  });

  console.log("Commande envoyée avec l'ID :", commandeRef.key);

  // Afficher le modal de confirmation
  showModal();

  // Réinitialiser le panier après la commande
  cart = [];
  localStorage.removeItem("cart");
  displayCartItems(); // Mettre à jour l'affichage du panier

  // Réinitialiser le formulaire
  commandeForm.reset();
});

// Fermer le modal lorsque l'utilisateur clique sur la croix
closeBtn.onclick = closeModal;

// Fermer le modal lorsque l'utilisateur clique à l'extérieur du modal
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Menu toggle
function menutoggle() {
  const menuItems = document.getElementById("menuItems");

  if (menuItems) {
    menuItems.classList.toggle("active");
  } else {
    console.error("Élément 'menuItems' introuvable dans le document.");
  }
}
