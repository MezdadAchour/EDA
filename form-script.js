// Fonctions pour la gestion du panier
const addToCartBtnElem = document.getElementById("add-to-cart");
const addToCartBtn = addToCartBtnElem ? addToCartBtnElem : null;

const cartItems = document.getElementById("cart-items");
const cartTableBody = document.getElementById("cart-tablebody");
const subtotalElem = document.getElementById("subtotal");
const cartCountElem = document.querySelector(".cart-count");
const cartIcon = document.querySelector(".cart-icon");
const cartDrawer = document.querySelector(".cart-drawer");

// Initialisation du panier
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  renderCartTable();
  renderFloatingCart();
  updateSubtotal();
  updateFloatingSubtotal();
  updateCartCount();
  saveCartToLocalStorage();
}

function renderCartTable() {
  let tableHTML = "";

  cart.forEach((item, index) => {
    tableHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price} DA</td>
        <td>${item.qty}</td>
        <td>${item.price * item.qty} DA</td>
        <td><button class="remove-item" data-index="${index}"><i class="fa fa-trash"></i></button></td>
      </tr>
    `;
  });

  cartTableBody.innerHTML = tableHTML;
}

function renderFloatingCart() {
  const cartTableBody = document.querySelector(".cart-drawer .table tbody");
  let tableHTML = "";

  cart.forEach((item) => {
    tableHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price} DA</td>
        <td>${item.qty}</td>
        <td>${item.price * item.qty} DA</td>
      </tr>
    `;
  });

  cartTableBody.innerHTML = tableHTML;
}

function updateSubtotal() {
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  subtotalElem.textContent = total.toFixed(2);
}

function updateFloatingSubtotal() {
  const subtotalElem = document.querySelector(".cart-drawer #subtotal");
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  subtotalElem.textContent = total.toFixed(2);
}

function updateCartCount() {
  cartCountElem.textContent = cart.length;
  renderCartItems();
}

function renderCartItems() {
  let itemsHTML = "";
  if (cart.length > 0) {
    itemsHTML = `Dans le panier (${cart.length}) : ${cart
      .map((item) => `${item.name} x ${item.qty}`)
      .join(", ")}`;
  } else {
    itemsHTML = "Panier vide";
  }
  cartItems.innerHTML = itemsHTML;
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Gérer l'ajout d'un élément au panier
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const qtyInput = document.getElementById("qty");
    if (qtyInput) {
      let qty = parseInt(qtyInput.value);
      if (isNaN(qty)) {
        qty = 1;
      }
      const itemData = {
        id: addToCartBtn.dataset.id,
        name: addToCartBtn.dataset.name,
        price: parseFloat(addToCartBtn.dataset.price),
        qty,
      };

      const existingItemIndex = cart.findIndex(
        (item) => item.id === itemData.id
      );
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].qty += qty;
      } else {
        cart.push(itemData);
      }

      updateCart();
      renderFloatingCart();
    }
  });

  // Gérer la suppression d'un élément du panier
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
      renderFloatingCart();
    }
  });

  // Mise à jour initiale du panier
  updateCart();
  renderFloatingCart();

  // Gestion du panier
  cartIcon.addEventListener("click", () => {
    cartDrawer.classList.toggle("open");
  });
}

const commandeForm = document.getElementById("commande-form");

if (commandeForm) {
  commandeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validation des données du formulaire
    const nom = formData.get("nom").trim();
    const prenom = formData.get("prenom").trim();
    const telephone = formData.get("telephone").trim();
    const adresse = formData.get("adresse").trim();

    if (!nom || !prenom || !telephone || !adresse) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const commande = {
      nom,
      prenom,
      telephone,
      adresse,
      panier: cart.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
    };

    // Enregistrer la commande dans Firebase
    const commandeRef = firebase.database().ref("commandes").push();
    const commandeId = commandeRef.key;
    commandeRef.set(commande);

    // Réinitialiser le formulaire et le panier
    e.target.reset();
    cart = [];
    updateCart();
    renderFloatingCart();
    alert(`Votre commande (${commandeId}) a été envoyée avec succès !`);
  });
}