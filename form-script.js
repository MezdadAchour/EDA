// Récupérer le panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour ajouter un produit au panier
function addToCart(product) {
  // Vérifier si le produit existe déjà dans le panier
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // Si le produit existe, mettre à jour la quantité
    existingProduct.quantity += parseInt(
      document.getElementById("qty").value,
      10
    );
  } else {
    // Sinon, ajouter le produit au panier
    product.quantity = parseInt(document.getElementById("qty").value, 10);
    cart.push(product);
  }

  // Mettre à jour le localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mettre à jour le compteur du panier
  updateCartCount();
  // Mettre à jour le contenu du tiroir du panier
  updateCartDrawer();
}

// Fonction pour mettre à jour le contenu du tiroir du panier
function updateCartDrawer() {
  const cartTableBody = document.getElementById("cart-tablebody");
  cartTableBody.innerHTML = ""; // Vider le contenu existant

  let subtotal = 0;

  // Récupérer le panier depuis le localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price} DA</td>
      <td>${item.quantity}</td>
      <td>${item.price * item.quantity} DA</td>
    `;
    cartTableBody.appendChild(row);
    subtotal += item.price * item.quantity;
  });

  const subtotalElement = document.getElementById("subtotal");
  if (subtotalElement) {
    subtotalElement.textContent = subtotal + " DA";
  }

  // Supprimer les lignes en trop
  const rowsToRemove = Array.from(cartTableBody.children).slice(cart.length);
  rowsToRemove.forEach((row) => row.remove());
}

// Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalQuantity;
}

// Ajouter un écouteur d'événement pour le bouton "Ajouter au panier"
const addToCartButton = document.getElementById("add-to-cart");
if (addToCartButton) {
  addToCartButton.addEventListener("click", () => {
    const productId = addToCartButton.getAttribute("data-id");
    const productName = addToCartButton.getAttribute("data-name");
    const productPrice = addToCartButton.getAttribute("data-price");
    const product = { id: productId, name: productName, price: productPrice };
    addToCart(product);
  });
}

// Appeler la fonction updateCartCount() lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", updateCartCount);

// Appeler la fonction pour afficher le contenu initial du panier
document.addEventListener("DOMContentLoaded", updateCartDrawer);

function displayCartItems() {
  const cartTableBody = document.getElementById("cart-tablebody");
  cartTableBody.innerHTML = ""; // Vider le contenu existant

  let subtotal = 0;

  // Récupérer le panier depuis le localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
if (cartTableBody) {
  cartTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("suppicn")) {
      const productId = event.target.getAttribute("data-id");
      removeFromCart(productId);
      displayCartItems(); // Mettre à jour l'affichage du panier
    }
  });
}

// Fonction pour supprimer un article du panier
function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
