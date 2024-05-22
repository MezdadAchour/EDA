// Récupérer le panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonction pour afficher le contenu du panier
function displayCartItems() {
  const cartTableBody = document.getElementById('cart-tablebody');
  cartTableBody.innerHTML = ''; // Vider le contenu existant

  let subtotal = 0;

  cart.forEach(item => {
    const row = document.createElement('tr');
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

  const subtotalElement = document.getElementById('subtotal');
  subtotalElement.textContent = subtotal + ' DA';
}

// Appel de la fonction pour afficher le contenu du panier
document.addEventListener('DOMContentLoaded', displayCartItems);

// Gérer la suppression d'articles du panier
const cartTableBody = document.getElementById('cart-tablebody');
cartTableBody.addEventListener('click', function(event) {
  if (event.target.classList.contains('suppicn')) {
    const productId = event.target.getAttribute('data-id');
    removeFromCart(productId);
    displayCartItems(); // Mettre à jour l'affichage du panier
  }
});

// Fonction pour supprimer un article du panier
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Référence à la base de données Realtime Database
const database = firebase.database();

// Gérer la soumission du formulaire de commande
const commandeForm = document.getElementById('commande-form');
commandeForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les données du formulaire
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const telephone = document.getElementById('telephone').value;
  const adresse = document.getElementById('adresse').value;

  // Envoyer les données de la commande à la Realtime Database
  const commandeRef = database.ref('commandes').push({
    nom,
    prenom,
    telephone,
    adresse,
    articles: cart
  });

  console.log('Commande envoyée avec l\'ID :', commandeRef.key);

  // Réinitialiser le panier après la commande
  cart = [];
  localStorage.removeItem('cart');
  displayCartItems(); // Mettre à jour l'affichage du panier

  // Réinitialiser le formulaire
  commandeForm.reset();
});