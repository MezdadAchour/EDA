// aparition.js
window.addEventListener("load", function () {
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

// cart.js

function addToCart(product) {
  const item = cartItems.find((item) => item.id === product.id);
  if (item) {
    item.quantity++;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  updateCart();
}

function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  let total = 0;

  cartItems.forEach((item) => {
    const { id, name, price, quantity } = item;
    const itemTotal = price * quantity;
    total += itemTotal;

    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
          <img src="./assets/images/product-${id}.jpg" alt="${name}">
          <div class="item-info">
            <h4>${name}</h4>
            <p>Prix : ${price.toFixed(2)} €</p>
            <p>Quantité : <input type="number" value="${quantity}" min="1" onchange="updateQuantity(${id}, this.value)"></p>
            <p>Sous-total : ${itemTotal.toFixed(2)} €</p>
            <button onclick="removeFromCart(${id})">Supprimer</button>
          </div>
        `;

    cartItemsElement.appendChild(cartItemElement);
  });

  const totalElement = document.getElementById("cart-total");
  totalElement.textContent = `Total : ${total.toFixed(2)} €`;
}

function updateQuantity(productId, newQuantity) {
  const item = cartItems.find((item) => item.id === productId);
  if (item) {
    item.quantity = parseInt(newQuantity);
    updateCart();
  }
}

// panier.js
const cartIcon = document.querySelector(".cart-icon");
const cartDrawer = document.querySelector(".cart-drawer");
const closeCartBtn = document.querySelector(".close-cart");
const cartItems = document.querySelector(".cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartCount = document.querySelector(".cart-count");

let cart = [];
let totalPrice = 0;

// Fonction pour ajouter un élément au panier
function addToCart(item) {
  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCart();
}

// Fonction pour mettre à jour le panier
function updateCart() {
  cartItems.innerHTML = "";
  totalPrice = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemElement.appendChild(itemImage);

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("cart-item-details");

    const itemName = document.createElement("p");
    itemName.textContent = item.name;
    itemDetails.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `${item.price} DA x ${item.quantity}`;
    itemDetails.appendChild(itemPrice);

    itemElement.appendChild(itemDetails);
    cartItems.appendChild(itemElement);

    totalPrice += item.price * item.quantity;
  });

  cartTotalPrice.textContent = `${totalPrice} DA`;
  cartCount.textContent = cart.length;
}

// Fonction pour ouvrir le tiroir du panier
function openCartDrawer() {
  cartDrawer.classList.add("open");
}

// Fonction pour fermer le tiroir du panier
function closeCartDrawer() {
  cartDrawer.classList.remove("open");
}

// Événements
cartIcon.addEventListener("click", openCartDrawer);
closeCartBtn.addEventListener("click", closeCartDrawer);

// Exemple d'ajout d'un élément au panier
addToCart({
  id: 1,
  name: "EMU-pro 8",
  price: 25000,
  image: "./assets/images/piece/emu1.png",
});

// toggleMenu.js
function menutoggle() {
  const menuItems = document.getElementById("menuItems");

  if (menuItems) {
    if (menuItems.style.maxHeight === "0px") {
      menuItems.style.maxHeight = "200px";
    } else {
      menuItems.style.maxHeight = "0px";
    }
  } else {
    console.error("Élément 'menuItems' introuvable dans le document.");
  }
}
